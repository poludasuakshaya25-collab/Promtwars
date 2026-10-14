import React, { useRef, useEffect, useState } from 'react';
import { Sparkles, RotateCw, ZoomIn, Info, ShieldCheck, Crosshair } from 'lucide-react';

interface ReceptorNode {
  id: string;
  label: string;
  status: string;
  score: string;
  therapy: string;
  color: string;
  x: number;
  y: number;
  z: number;
}

export const BioMatrix3DCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedNode, setSelectedNode] = useState<ReceptorNode | null>(null);
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [rotX, setRotX] = useState<number>(0.25);
  const [rotY, setRotY] = useState<number>(0.4);
  const isDraggingRef = useRef<boolean>(false);
  const lastMousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const receptorNodes: ReceptorNode[] = [
    {
      id: 'her2',
      label: 'HER2 Receptors',
      status: 'Overexpressed (IHC 3+)',
      score: 'Positive',
      therapy: 'Targeted: Trastuzumab (Herceptin) + Pertuzumab',
      color: '#fbbf24', // Gold
      x: 0,
      y: 95,
      z: 30
    },
    {
      id: 'er',
      label: 'Estrogen Receptor (ER)',
      status: 'Nuclear Staining 85%',
      score: 'Strong Positive',
      therapy: 'Endocrine: Tamoxifen / Aromatase Inhibitors',
      color: '#e11d48', // Crimson Red
      x: 80,
      y: -30,
      z: 50
    },
    {
      id: 'pr',
      label: 'Progesterone Receptor (PR)',
      status: 'Nuclear Staining 65%',
      score: 'Positive',
      therapy: 'Endocrine: Aromatase Inhibitors',
      color: '#f59e0b', // Amber Gold
      x: -85,
      y: -25,
      z: 40
    },
    {
      id: 'ki67',
      label: 'Ki-67 Proliferation',
      status: 'Labeling Index 35%',
      score: 'High Proliferation',
      therapy: 'Neoadjuvant Chemotherapy Indicated',
      color: '#f43f5e', // Ruby Red
      x: 35,
      y: -75,
      z: -70
    },
    {
      id: 'tp53',
      label: 'TP53 Guardian Gene',
      status: 'Wild-Type Sequence',
      score: 'Intact Signaling',
      therapy: 'Standard DNA-Damage Response Maintained',
      color: '#fde047', // Bright Gold
      x: -55,
      y: 60,
      z: -60
    }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let angle = rotY;
    let pitch = rotX;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (isRotating && !isDraggingRef.current) {
        angle += 0.008;
      }

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const fov = 340;
      const cameraDistance = 380;

      // Draw background 3D depth grid
      ctx.save();
      const numRings = 4;
      for (let r = 1; r <= numRings; r++) {
        const radius = (r / numRings) * 125;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.strokeStyle = r === numRings ? 'rgba(245, 158, 11, 0.18)' : 'rgba(225, 29, 72, 0.08)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 6]);
        ctx.stroke();
      }
      ctx.restore();

      // Transform 3D coordinates
      const cosY = Math.cos(angle);
      const sinY = Math.sin(angle);
      const cosX = Math.cos(pitch);
      const sinX = Math.sin(pitch);

      interface ProjectedPoint {
        x2d: number;
        y2d: number;
        z3d: number;
        scale: number;
        node: ReceptorNode;
      }

      const projectedNodes: ProjectedPoint[] = receptorNodes.map((node) => {
        // Rotate around Y axis
        const x1 = node.x * cosY - node.z * sinY;
        const z1 = node.z * cosY + node.x * sinY;

        // Rotate around X axis
        const y2 = node.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + node.y * sinX;

        const scale = fov / (cameraDistance + z2);
        const x2d = cx + x1 * scale;
        const y2d = cy + y2 * scale;

        return { x2d, y2d, z3d: z2, scale, node };
      });

      // Sort by depth (painter's algorithm)
      projectedNodes.sort((a, b) => a.z3d - b.z3d);

      // Draw 3D connecting energy filaments between nodes
      ctx.save();
      for (let i = 0; i < projectedNodes.length; i++) {
        for (let j = i + 1; j < projectedNodes.length; j++) {
          const p1 = projectedNodes[i];
          const p2 = projectedNodes[j];
          const grad = ctx.createLinearGradient(p1.x2d, p1.y2d, p2.x2d, p2.y2d);
          grad.addColorStop(0, `${p1.node.color}44`);
          grad.addColorStop(1, `${p2.node.color}44`);
          ctx.beginPath();
          ctx.moveTo(p1.x2d, p1.y2d);
          ctx.lineTo(p2.x2d, p2.y2d);
          ctx.strokeStyle = grad;
          ctx.lineWidth = Math.max(1, 1.8 * ((p1.scale + p2.scale) / 2));
          ctx.stroke();
        }
      }
      ctx.restore();

      // Draw Center Core Biomarker Nucleus in 3D
      ctx.save();
      const coreGrad = ctx.createRadialGradient(cx, cy, 2, cx, cy, 38);
      coreGrad.addColorStop(0, '#fef08a');
      coreGrad.addColorStop(0.3, '#f59e0b');
      coreGrad.addColorStop(0.7, '#be123c');
      coreGrad.addColorStop(1, 'rgba(159, 18, 57, 0)');
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, 38, 0, Math.PI * 2);
      ctx.fill();

      // Center label
      ctx.font = 'bold 9px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#fff';
      ctx.textAlign = 'center';
      ctx.fillText('BIOMARKER', cx, cy - 3);
      ctx.fillStyle = '#fde68a';
      ctx.fillText('MATRIX', cx, cy + 9);
      ctx.restore();

      // Draw each 3D node
      projectedNodes.forEach(({ x2d, y2d, scale, node }) => {
        const radius = Math.max(8, 14 * scale);
        const isHovered = selectedNode?.id === node.id;

        ctx.save();
        // Node outer glow
        ctx.shadowColor = node.color;
        ctx.shadowBlur = isHovered ? 28 : 16;

        // Radial glow
        const nodeGrad = ctx.createRadialGradient(
          x2d - radius * 0.3,
          y2d - radius * 0.3,
          radius * 0.1,
          x2d,
          y2d,
          radius
        );
        nodeGrad.addColorStop(0, '#ffffff');
        nodeGrad.addColorStop(0.4, node.color);
        nodeGrad.addColorStop(1, '#780a1c');

        ctx.beginPath();
        ctx.arc(x2d, y2d, radius, 0, Math.PI * 2);
        ctx.fillStyle = nodeGrad;
        ctx.fill();

        ctx.strokeStyle = isHovered ? '#ffffff' : 'rgba(254, 240, 138, 0.7)';
        ctx.lineWidth = isHovered ? 2.5 : 1.2;
        ctx.stroke();

        // Node Label
        ctx.font = `${isHovered ? 'bold 11px' : '600 10px'} "Plus Jakarta Sans", sans-serif`;
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
        ctx.shadowBlur = 4;
        ctx.fillText(node.label, x2d, y2d + radius + 14);

        // Status pill
        ctx.font = '500 8.5px "Plus Jakarta Sans", sans-serif';
        ctx.fillStyle = node.color;
        ctx.fillText(node.score, x2d, y2d + radius + 25);
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [rotX, rotY, isRotating, selectedNode]);

  // Interactive mouse dragging for 3D rotation
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDraggingRef.current = true;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastMousePosRef.current.x;
    const dy = e.clientY - lastMousePosRef.current.y;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };

    setRotY((prev) => prev + dx * 0.01);
    setRotX((prev) => Math.max(-1.2, Math.min(1.2, prev + dy * 0.01)));
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const fov = 340;
    const cameraDistance = 380;
    const cosY = Math.cos(rotY);
    const sinY = Math.sin(rotY);
    const cosX = Math.cos(rotX);
    const sinX = Math.sin(rotX);

    for (const node of receptorNodes) {
      const x1 = node.x * cosY - node.z * sinY;
      const z1 = node.z * cosY + node.x * sinY;
      const y2 = node.y * cosX - z1 * sinX;
      const z2 = z1 * cosX + node.y * sinX;
      const scale = fov / (cameraDistance + z2);
      const x2d = cx + x1 * scale;
      const y2d = cy + y2 * scale;
      const dist = Math.hypot(mouseX - x2d, mouseY - y2d);

      if (dist < 20) {
        setSelectedNode(node);
        return;
      }
    }
  };

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, rgba(20, 10, 16, 0.95) 0%, rgba(35, 12, 22, 0.95) 100%)',
        border: '1px solid var(--border-accent)',
        borderRadius: 'var(--radius-xl)',
        padding: '20px',
        boxShadow: 'var(--shadow-3d)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Header with 3D status */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #be123c, #f59e0b)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              boxShadow: '0 0 12px rgba(245, 158, 11, 0.4)'
            }}
          >
            <Sparkles size={18} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 style={{ fontSize: '1.05rem', color: '#fff', margin: 0 }}>
                3D Genomic & Molecular Bio-Matrix
              </h3>
              <span className="badge badge-gold" style={{ fontSize: '0.65rem' }}>
                Interactive 3D
              </span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>
              Rotate 3D cellular receptors • Targeted oncology alignment
            </p>
          </div>
        </div>

        {/* 3D Controls */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setIsRotating(!isRotating)}
            className="btn btn-sm btn-secondary"
            title="Toggle 3D Auto-Rotation"
            style={{ padding: '6px 10px', fontSize: '0.75rem' }}
          >
            <RotateCw size={13} style={{ transform: isRotating ? 'none' : 'rotate(45deg)' }} />
            <span>{isRotating ? 'Rotate ON' : 'Paused'}</span>
          </button>
          <button
            onClick={() => {
              setRotX(0.25);
              setRotY(0.4);
              setSelectedNode(null);
            }}
            className="btn btn-sm btn-outline"
            style={{ padding: '6px 10px', fontSize: '0.75rem' }}
          >
            <Crosshair size={13} />
            <span>Reset View</span>
          </button>
        </div>
      </div>

      {/* 3D Canvas Viewport */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'radial-gradient(circle at 50% 50%, rgba(225, 29, 72, 0.12) 0%, rgba(10, 5, 8, 0.8) 75%)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid rgba(245, 158, 11, 0.15)',
          overflow: 'hidden',
          cursor: isDraggingRef.current ? 'grabbing' : 'grab'
        }}
      >
        <canvas
          ref={canvasRef}
          width={580}
          height={320}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onClick={handleCanvasClick}
          style={{ width: '100%', maxWidth: '580px', height: '320px', display: 'block' }}
        />

        {/* Hint banner */}
        <div
          style={{
            position: 'absolute',
            bottom: '10px',
            left: '12px',
            fontSize: '0.72rem',
            color: 'var(--gold-light)',
            background: 'rgba(10, 5, 8, 0.75)',
            backdropFilter: 'blur(6px)',
            padding: '3px 10px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid rgba(245, 158, 11, 0.25)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <span>🖱️ Click & drag to rotate 3D sphere • Click any node to inspect</span>
        </div>
      </div>

      {/* Selected Node 3D Telemetry Overlay */}
      <div
        style={{
          marginTop: '14px',
          padding: '12px 16px',
          background: selectedNode
            ? 'linear-gradient(135deg, rgba(225, 29, 72, 0.18), rgba(245, 158, 11, 0.15))'
            : 'rgba(20, 10, 16, 0.6)',
          border: selectedNode ? '1px solid rgba(245, 158, 11, 0.4)' : '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '10px'
        }}
      >
        {selectedNode ? (
          <>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: selectedNode.color,
                    boxShadow: `0 0 10px ${selectedNode.color}`
                  }}
                />
                <strong style={{ color: '#fff', fontSize: '0.9rem' }}>{selectedNode.label}</strong>
                <span className="badge badge-gold" style={{ fontSize: '0.65rem' }}>
                  {selectedNode.status}
                </span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '4px' }}>
                🎯 <strong style={{ color: 'var(--gold-light)' }}>Clinical Match:</strong> {selectedNode.therapy}
              </p>
            </div>
            <button
              onClick={() => setSelectedNode(null)}
              className="btn btn-sm btn-secondary"
              style={{ padding: '4px 10px', fontSize: '0.72rem' }}
            >
              Clear
            </button>
          </>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '0.82rem' }}>
            <Info size={15} style={{ color: 'var(--gold-light)' }} />
            <span>
              <strong>Histopathology Profile:</strong> HER2-Positive / ER-Positive Invasive Ductal Carcinoma. 5 targeted markers identified for precision therapy.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
