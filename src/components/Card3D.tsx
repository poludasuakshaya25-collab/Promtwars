import React, { useRef, useState, MouseEvent } from 'react';

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  glowColor?: 'gold' | 'red' | 'both';
  intensity?: number;
  onClick?: () => void;
}

export const Card3D: React.FC<Card3DProps> = ({
  children,
  className = '',
  style = {},
  glowColor = 'gold',
  intensity = 15,
  onClick
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState<number>(0);
  const [rotateY, setRotateY] = useState<number>(0);
  const [glarePosition, setGlarePosition] = useState<{ x: number; y: number; opacity: number }>({
    x: 50,
    y: 50,
    opacity: 0
  });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const rY = ((mouseX - width / 2) / (width / 2)) * intensity;
    const rX = -((mouseY - height / 2) / (height / 2)) * intensity;

    setRotateX(rX);
    setRotateY(rY);
    setGlarePosition({
      x: (mouseX / width) * 100,
      y: (mouseY / height) * 100,
      opacity: 0.25
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePosition((prev) => ({ ...prev, opacity: 0 }));
  };

  const borderGlow =
    glowColor === 'red'
      ? '0 0 24px rgba(225, 29, 72, 0.35)'
      : glowColor === 'both'
      ? '0 0 20px rgba(245, 158, 11, 0.3), 0 0 30px rgba(225, 29, 72, 0.25)'
      : '0 0 24px rgba(245, 158, 11, 0.3)';

  return (
    <div
      ref={cardRef}
      className={`card card-3d ${className}`}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${rotateX !== 0 ? 8 : 0}px)`,
        boxShadow: rotateX !== 0 ? `0 20px 40px -10px rgba(0,0,0,0.85), ${borderGlow}` : undefined,
        cursor: onClick ? 'pointer' : 'default',
        overflow: 'hidden',
        ...style
      }}
    >
      {/* 3D dynamic specular sheen */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          borderRadius: 'inherit',
          background: `radial-gradient(circle 240px at ${glarePosition.x}% ${glarePosition.y}%, ${
            glowColor === 'red'
              ? 'rgba(251, 113, 133, 0.2)'
              : 'rgba(254, 240, 138, 0.2)'
          }, transparent 70%)`,
          opacity: glarePosition.opacity,
          transition: 'opacity 0.25s ease'
        }}
      />
      <div className="card-3d-content">{children}</div>
    </div>
  );
};
