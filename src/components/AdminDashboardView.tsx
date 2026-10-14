import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldAlert, 
  Activity, 
  Users, 
  Building2, 
  Clock, 
  TrendingUp, 
  CheckCircle2, 
  AlertTriangle, 
  Lock, 
  FileText,
  BarChart3,
  Server,
  Sparkles
} from 'lucide-react';
import { Card3D } from './Card3D';

export const AdminDashboardView: React.FC = () => {
  const { overdueAlerts, facilities, doctors, pathways, addToast } = useApp();

  const [activeTab, setActiveTab] = useState<'kpis' | 'verifications' | 'audit'>('kpis');

  const metrics = [
    { label: 'Screening to Clinician Review', meanHours: '5.4h', target: '24h', compliance: '98.2%', status: 'optimal' },
    { label: 'Referral to Specialist Consult', meanHours: '26.8h', target: '48h', compliance: '94.6%', status: 'optimal' },
    { label: 'Biopsy Execution to Histology Sign-off', meanHours: '49.1h', target: '48h', compliance: '88.4%', status: 'warning' },
    { label: 'Confirmation to Tumor Board Review', meanHours: '61.5h', target: '72h', compliance: '95.1%', status: 'optimal' },
    { label: 'Treatment Planning to First Infusion', meanHours: '86.2h', target: '96h', compliance: '92.8%', status: 'optimal' }
  ];

  const pendingVerifications = [
    { id: 'V-102', name: 'Dr. Vikram Malhotra', role: 'Medical Oncologist (DM)', institution: 'Max Super Speciality Hospital, Delhi', documents: 'NMC Reg #188291, Degree Certificates', status: 'Pending Review' },
    { id: 'V-103', name: 'HCG Cancer Center Molecular Lab', role: 'NABL Diagnostic Lab', institution: 'Bengaluru, Karnataka', documents: 'NABL Certificate #MC-2918, AERB Approval', status: 'Pending Review' }
  ];

  const auditLogs = [
    { timestamp: '2026-10-14 11:32:04 IST', user: 'Dr. Ananya Sen', event: 'EHR Access', patient: 'Priya Sharma (PT-8842)', purpose: 'Clinical Review & Biopsy Order', ip: '14.139.122.45' },
    { timestamp: '2026-10-14 10:45:12 IST', user: 'SLA Engine', event: 'Alert Triggered', patient: 'Priya Sharma (PT-8842)', purpose: 'Level 2 Escalation: Overdue Biopsy Report (51h)', ip: 'Internal SaMD' },
    { timestamp: '2026-10-14 09:18:22 IST', user: 'Priya Sharma', event: 'Consent Created', patient: 'Priya Sharma (PT-8842)', purpose: 'ABDM Health Exchange Consent', ip: '157.48.22.18' }
  ];

  const handleApproveProvider = (id: string, name: string) => {
    addToast(`Provider "${name}" verified on AI CancerConnect national registry.`, 'success');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Admin Command Header with 3D Depth */}
      <Card3D
        glowColor="both"
        intensity={6}
        style={{
          background: 'linear-gradient(135deg, rgba(35, 12, 22, 0.95) 0%, rgba(20, 10, 16, 0.95) 100%)',
          border: '1px solid rgba(245, 158, 11, 0.35)',
          padding: '24px',
          boxShadow: 'var(--shadow-3d)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="badge badge-gold">Platform Governance & Security</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--gold-light)' }}>
                ABDM National Health Stack Compliance
              </span>
            </div>
            <h2 style={{ fontSize: '1.5rem', marginTop: '6px', color: '#fff' }}>
              Operational Intelligence & SLA Oversight
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', maxWidth: '800px', marginTop: '4px' }}>
              Real-time monitoring of care continuum bottlenecks, SLA breach rates across 8 cancer pathways, and cryptographic access audit logs.
            </p>
          </div>

          <div style={{
            background: 'rgba(15, 7, 12, 0.8)',
            padding: '14px 20px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(245, 158, 11, 0.25)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>System Health</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#34d399' }}>
              99.98%
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--gold-light)' }}>All 8 AI Models Active</div>
          </div>
        </div>
      </Card3D>

      {/* Admin Tab Switcher with 3D Effects */}
      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={() => setActiveTab('kpis')}
          className="btn-3d"
          style={{
            padding: '10px 18px',
            borderRadius: 'var(--radius-md)',
            border: activeTab === 'kpis' ? '1px solid #fbbf24' : '1px solid var(--border-subtle)',
            background: activeTab === 'kpis' ? 'linear-gradient(135deg, #be123c, #b45309)' : 'rgba(15, 7, 12, 0.8)',
            color: activeTab === 'kpis' ? '#fff' : 'var(--text-secondary)',
            fontWeight: 700,
            fontSize: '0.82rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <BarChart3 size={15} />
          <span>Care Continuum KPIs & Turnaround</span>
        </button>

        <button
          onClick={() => setActiveTab('verifications')}
          className="btn-3d"
          style={{
            padding: '10px 18px',
            borderRadius: 'var(--radius-md)',
            border: activeTab === 'verifications' ? '1px solid #fbbf24' : '1px solid var(--border-subtle)',
            background: activeTab === 'verifications' ? 'linear-gradient(135deg, #be123c, #b45309)' : 'rgba(15, 7, 12, 0.8)',
            color: activeTab === 'verifications' ? '#fff' : 'var(--text-secondary)',
            fontWeight: 700,
            fontSize: '0.82rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <CheckCircle2 size={15} />
          <span>Provider Verification Queue (2)</span>
        </button>

        <button
          onClick={() => setActiveTab('audit')}
          className="btn-3d"
          style={{
            padding: '10px 18px',
            borderRadius: 'var(--radius-md)',
            border: activeTab === 'audit' ? '1px solid #fbbf24' : '1px solid var(--border-subtle)',
            background: activeTab === 'audit' ? 'linear-gradient(135deg, #be123c, #b45309)' : 'rgba(15, 7, 12, 0.8)',
            color: activeTab === 'audit' ? '#fff' : 'var(--text-secondary)',
            fontWeight: 700,
            fontSize: '0.82rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Lock size={15} />
          <span>Audit Log & Access Ledger</span>
        </button>
      </div>

      {/* Tab 1: KPIs & Bottlenecks */}
      {activeTab === 'kpis' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Milestone Turnaround Times Table */}
          <Card3D glowColor="gold" intensity={6} style={{ padding: '24px' }}>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '14px', color: '#fff' }}>
              Care Pathway Turnaround Intervals & SLA Compliance
            </h4>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', color: '#e2d5dc' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(245, 158, 11, 0.2)', textAlign: 'left', color: 'var(--gold-light)' }}>
                    <th style={{ padding: '10px 12px' }}>Care Pathway Milestone</th>
                    <th style={{ padding: '10px 12px' }}>Mean Interval</th>
                    <th style={{ padding: '10px 12px' }}>Standard Target</th>
                    <th style={{ padding: '10px 12px' }}>SLA Compliance</th>
                    <th style={{ padding: '10px 12px' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {metrics.map((m, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td style={{ padding: '10px 12px', color: '#fff', fontWeight: 600 }}>{m.label}</td>
                      <td style={{ padding: '10px 12px', color: 'var(--gold-light)', fontWeight: 700 }}>{m.meanHours}</td>
                      <td style={{ padding: '10px 12px' }}>{m.target}</td>
                      <td style={{ padding: '10px 12px' }}>{m.compliance}</td>
                      <td style={{ padding: '10px 12px' }}>
                        <span className={`badge ${m.status === 'optimal' ? 'badge-emerald' : 'badge-red'}`}>
                          {m.status.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card3D>

          {/* Regional Disparities & Pathway Distribution */}
          <div className="grid-2">
            <Card3D glowColor="red" intensity={8} style={{ padding: '20px' }}>
              <h4 style={{ fontSize: '1rem', color: '#fff', marginBottom: '10px' }}>
                Screening Volume by Cancer Pathway
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.8rem' }}>
                {[
                  { name: 'Breast Cancer', count: '14,280 screenings', pct: 88, color: '#e11d48' },
                  { name: 'Oral Cavity Cancer', count: '12,940 screenings', pct: 78, color: '#f59e0b' },
                  { name: 'Cervical Cancer', count: '11,450 screenings', pct: 72, color: '#fb7185' },
                  { name: 'Lung Cancer', count: '8,320 screenings', pct: 54, color: '#fbbf24' },
                  { name: 'Colorectal & Stomach', count: '6,110 screenings', pct: 40, color: '#d97706' }
                ].map((item, idx) => (
                  <div key={idx}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                      <span style={{ color: '#fff', fontWeight: 600 }}>{item.name}</span>
                      <span style={{ color: 'var(--text-muted)' }}>{item.count}</span>
                    </div>
                    <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ width: `${item.pct}%`, height: '100%', background: item.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </Card3D>

            <Card3D glowColor="gold" intensity={8} style={{ padding: '20px' }}>
              <h4 style={{ fontSize: '1rem', color: '#fff', marginBottom: '10px' }}>
                National Access & Scheme Insights
              </h4>
              <div style={{ fontSize: '0.82rem', color: '#ded1d8', lineHeight: 1.6 }}>
                <p>
                  • <strong>Specialist Triage:</strong> Average time to in-person oncology review across network centers is <strong>24.6 hours</strong> with verified 48h biopsy SLA.
                </p>
                <p style={{ marginTop: '8px' }}>
                  • <strong>Delay Prevention Engine:</strong> Auto-escalations resolved <strong>94.2%</strong> of lab turnarounds within target thresholds without patient drop-off.
                </p>
                <p style={{ marginTop: '8px' }}>
                  • <strong>PM-JAY Utilization:</strong> <strong>64%</strong> of patients utilized Ayushman Bharat packages for cashless diagnostics, surgical workup, or targeted infusions.
                </p>
              </div>
            </Card3D>
          </div>
        </div>
      )}

      {/* Tab 2: Provider Verification Queue */}
      {activeTab === 'verifications' && (
        <Card3D glowColor="gold" intensity={6} style={{ padding: '24px' }}>
          <h4 style={{ fontSize: '1.1rem', marginBottom: '14px', color: '#fff' }}>
            Healthcare Provider Credentialing & ABDM Verification
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {pendingVerifications.map((v) => (
              <div
                key={v.id}
                style={{
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(15, 7, 12, 0.7)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h5 style={{ fontSize: '0.95rem', color: '#fff', margin: 0 }}>{v.name}</h5>
                    <span className="badge badge-gold">{v.role}</span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    Affiliation: {v.institution}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Credentials: {v.documents}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => handleApproveProvider(v.id, v.name)}
                    className="btn btn-sm btn-primary btn-3d"
                  >
                    <CheckCircle2 size={14} />
                    <span>Approve Provider</span>
                  </button>
                  <button
                    onClick={() => addToast(`Requisitioned additional info for ${v.name}`, 'info')}
                    className="btn btn-sm btn-secondary btn-3d"
                  >
                    <span>Request Details</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card3D>
      )}

      {/* Tab 3: Audit Ledger */}
      {activeTab === 'audit' && (
        <Card3D glowColor="red" intensity={6} style={{ padding: '24px' }}>
          <h4 style={{ fontSize: '1.1rem', marginBottom: '14px', color: '#fff' }}>
            Cryptographic Access Ledger & Patient Consent Audit Trail
          </h4>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem', color: '#ded1d8' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(245, 158, 11, 0.2)', textAlign: 'left', color: 'var(--gold-light)' }}>
                  <th style={{ padding: '10px 12px' }}>Timestamp</th>
                  <th style={{ padding: '10px 12px' }}>Actor</th>
                  <th style={{ padding: '10px 12px' }}>Event</th>
                  <th style={{ padding: '10px 12px' }}>Target Patient</th>
                  <th style={{ padding: '10px 12px' }}>Clinical Purpose</th>
                  <th style={{ padding: '10px 12px' }}>Source IP</th>
                </tr>
              </thead>
              <tbody>
                {auditLogs.map((log, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '10px 12px', color: 'var(--text-muted)' }}>{log.timestamp}</td>
                    <td style={{ padding: '10px 12px', color: '#fff', fontWeight: 600 }}>{log.user}</td>
                    <td style={{ padding: '10px 12px' }}>
                      <span className="badge badge-gold" style={{ fontSize: '0.65rem' }}>{log.event}</span>
                    </td>
                    <td style={{ padding: '10px 12px', color: 'var(--gold-light)' }}>{log.patient}</td>
                    <td style={{ padding: '10px 12px' }}>{log.purpose}</td>
                    <td style={{ padding: '10px 12px', fontFamily: 'var(--font-mono)', fontSize: '0.72rem' }}>{log.ip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card3D>
      )}
    </div>
  );
};
