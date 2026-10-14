import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  AlertTriangle, 
  Clock, 
  ShieldAlert, 
  CheckCircle2, 
  UserCheck, 
  ArrowRight, 
  RotateCcw, 
  FileText,
  Filter,
  Check,
  Building,
  BellRing
} from 'lucide-react';
import { OverdueAlert } from '../types';

export const EscalationEngineView: React.FC = () => {
  const { overdueAlerts, resolveAlert, addToast, updateStageStatus } = useApp();

  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'acknowledged' | 'resolved'>('active');
  const [resolvingAlert, setResolvingAlert] = useState<OverdueAlert | null>(null);
  const [delayReason, setDelayReason] = useState<string>('Automated IHC autostainer control recalibration required 24h run. Manual slide review verified.');
  const [actionNotes, setActionNotes] = useState<string>('Chief Pathologist signed off final report digitally; treating oncologist notified via SMS/EHR.');

  const filteredAlerts = overdueAlerts.filter(a => {
    if (filterStatus === 'all') return true;
    return a.status === filterStatus;
  });

  const activeCount = overdueAlerts.filter(a => a.status === 'active').length;
  const criticalCount = overdueAlerts.filter(a => a.urgency === 'critical').length;

  const handleOpenResolve = (alert: OverdueAlert) => {
    setResolvingAlert(alert);
  };

  const handleConfirmResolve = () => {
    if (resolvingAlert) {
      resolveAlert(resolvingAlert.id, delayReason, actionNotes);
      setResolvingAlert(null);
    }
  };

  const handleAcknowledge = (alertId: string) => {
    addToast(`Alert ${alertId} acknowledged. Escalation paused for 4 hours while care coordinator follows up.`, 'info');
  };

  return (
    <div>
      {/* Escalation Engine Header */}
      <div className="card" style={{ marginBottom: '24px', background: 'linear-gradient(135deg, #101726 0%, #450a0a 100%)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="badge badge-danger">Real-Time SLA Watchdog</span>
              <span style={{ fontSize: '0.78rem', color: '#fecdd3' }}>
                Automated Care Continuum Delay Prevention
              </span>
            </div>
            <h2 style={{ fontSize: '1.5rem', marginTop: '6px' }}>
              Delay Prevention & Smart Escalation Engine
            </h2>
            <p style={{ color: '#ffe4e6', fontSize: '0.88rem', maxWidth: '820px', marginTop: '4px' }}>
              Monitors pending clinical and diagnostic milestones against evidence-based Service Level Agreements (SLAs). Identifies overdue tasks, dispatches multi-tier notifications, alerts department heads, and logs delay reasons to eliminate fragmentation.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{
              background: 'rgba(0, 0, 0, 0.4)',
              padding: '12px 18px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(244, 63, 94, 0.4)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '0.72rem', color: '#fecdd3', textTransform: 'uppercase' }}>Active SLA Breaches</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--rose-danger)' }}>
                {activeCount} Tasks
              </div>
              <div style={{ fontSize: '0.68rem', color: '#ffe4e6' }}>{criticalCount} Critical (Level 2+)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        {(['active', 'acknowledged', 'resolved', 'all'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className="btn btn-sm"
            style={{
              background: filterStatus === status ? 'var(--teal-glow)' : 'var(--bg-card)',
              color: filterStatus === status ? 'var(--teal-light)' : 'var(--text-secondary)',
              border: filterStatus === status ? '1px solid var(--teal-primary)' : '1px solid var(--border-subtle)',
              textTransform: 'capitalize'
            }}
          >
            {status} Alerts ({overdueAlerts.filter(a => status === 'all' || a.status === status).length})
          </button>
        ))}
      </div>

      {/* Alerts Stream */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
        {filteredAlerts.map((alert) => {
          const isCritical = alert.urgency === 'critical';
          const isResolved = alert.status === 'resolved';

          return (
            <div
              key={alert.id}
              className="card card-interactive"
              style={{
                borderLeft: isResolved ? '4px solid var(--emerald-success)' : isCritical ? '4px solid var(--rose-danger)' : '4px solid var(--amber-warning)',
                background: isResolved ? 'var(--bg-card)' : isCritical ? 'rgba(38, 16, 24, 0.92)' : 'rgba(38, 28, 16, 0.85)',
                padding: '20px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                <div style={{ flex: 1, minWidth: '320px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <span className={`badge ${isCritical ? 'badge-danger' : 'badge-amber'}`}>
                      {alert.urgency.toUpperCase()} SLA BREACH
                    </span>
                    <span className="badge badge-purple">
                      {alert.escalationLevel.toUpperCase()}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Alert ID: {alert.id} • Stage {alert.stageId}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.15rem', color: '#fff', marginTop: '6px' }}>
                    {alert.taskTitle}
                  </h3>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '6px', fontSize: '0.8rem', color: 'var(--text-secondary)', flexWrap: 'wrap' }}>
                    <span>👤 <strong>Patient:</strong> {alert.patientName}</span>
                    <span>🏥 <strong>Pathway:</strong> {alert.cancerPathway.toUpperCase()}</span>
                    <span>👨‍⚕️ <strong>Assigned:</strong> {alert.responsiblePerson} ({alert.responsibleRole})</span>
                  </div>

                  {/* Overdue Duration Pill */}
                  <div style={{
                    marginTop: '12px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px 12px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(0, 0, 0, 0.4)',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '0.8rem'
                  }}>
                    <Clock size={14} style={{ color: 'var(--rose-danger)' }} />
                    <span style={{ color: '#fecdd3' }}>
                      Current Delay: <strong style={{ color: '#fff' }}>{alert.delayHours} Hours</strong> (Allowed SLA: {alert.slaMaxHours} Hours)
                    </span>
                  </div>

                  {/* Escalation Hierarchy Callout */}
                  <div style={{ marginTop: '10px', fontSize: '0.78rem', color: '#fed7aa' }}>
                    📢 <strong>Escalated To:</strong> {alert.escalatedTo}
                  </div>

                  {/* Logged Delay Reason & Corrective Action (If any) */}
                  {alert.loggedReason && (
                    <div style={{ marginTop: '12px', padding: '10px 14px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', fontSize: '0.78rem' }}>
                      <div style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Justified Delay Reason Logged:</div>
                      <div style={{ color: '#e2e8f0', marginTop: '2px' }}>{alert.loggedReason}</div>
                      {alert.actionTaken && (
                        <div style={{ color: 'var(--emerald-success)', marginTop: '4px' }}>
                          ✓ Corrective Action: {alert.actionTaken}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '160px' }}>
                  {alert.status === 'active' && (
                    <>
                      <button
                        onClick={() => handleOpenResolve(alert)}
                        className="btn btn-sm btn-primary"
                        style={{ padding: '8px 14px' }}
                      >
                        <CheckCircle2 size={14} />
                        <span>Log Reason & Expedite</span>
                      </button>

                      <button
                        onClick={() => handleAcknowledge(alert.id)}
                        className="btn btn-sm btn-secondary"
                        style={{ padding: '8px 14px' }}
                      >
                        <span>Acknowledge SLA</span>
                      </button>
                    </>
                  )}

                  {alert.status === 'resolved' && (
                    <span className="badge badge-emerald" style={{ padding: '8px 12px', justifyContent: 'center' }}>
                      ✓ Corrective Action Completed
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Configurable SLA Targets Reference Matrix */}
      <div className="card">
        <h4 style={{ fontSize: '1.1rem', marginBottom: '14px', color: '#fff' }}>
          Configured Clinical Service Level Agreements (SLAs) & Escalation Matrix
        </h4>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', color: '#cbd5e1' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)', textAlign: 'left', color: 'var(--text-muted)' }}>
                <th style={{ padding: '10px 12px' }}>Care Pathway Milestone</th>
                <th style={{ padding: '10px 12px' }}>Target SLA</th>
                <th style={{ padding: '10px 12px' }}>Tier 1 Escalation (Care Team)</th>
                <th style={{ padding: '10px 12px' }}>Tier 2 Escalation (Dept Head)</th>
                <th style={{ padding: '10px 12px' }}>Tier 3 Escalation (Medical Director)</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '10px 12px', color: '#fff', fontWeight: 600 }}>AI SaMD Screening to Clinical Review</td>
                <td style={{ padding: '10px 12px' }}>24 Hours</td>
                <td style={{ padding: '10px 12px' }}>At 24 Hours</td>
                <td style={{ padding: '10px 12px' }}>At 48 Hours</td>
                <td style={{ padding: '10px 12px' }}>At 72 Hours</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '10px 12px', color: '#fff', fontWeight: 600 }}>Urgent Core Needle Biopsy Scheduling</td>
                <td style={{ padding: '10px 12px' }}>24 Hours</td>
                <td style={{ padding: '10px 12px' }}>At 24 Hours</td>
                <td style={{ padding: '10px 12px' }}>At 36 Hours</td>
                <td style={{ padding: '10px 12px' }}>At 48 Hours</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '10px 12px', color: '#fff', fontWeight: 600 }}>Biopsy Histopathology & IHC Sign-Off</td>
                <td style={{ padding: '10px 12px', color: '#fb7185', fontWeight: 700 }}>48 Hours</td>
                <td style={{ padding: '10px 12px' }}>At 48 Hours</td>
                <td style={{ padding: '10px 12px', color: '#fb7185' }}>At 50 Hours (Triggered!)</td>
                <td style={{ padding: '10px 12px' }}>At 72 Hours</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '10px 12px', color: '#fff', fontWeight: 600 }}>Multidisciplinary Tumor Board Staging Review</td>
                <td style={{ padding: '10px 12px' }}>72 Hours</td>
                <td style={{ padding: '10px 12px' }}>At 72 Hours</td>
                <td style={{ padding: '10px 12px' }}>At 96 Hours</td>
                <td style={{ padding: '10px 12px' }}>At 120 Hours</td>
              </tr>
              <tr>
                <td style={{ padding: '10px 12px', color: '#fff', fontWeight: 600 }}>Treatment Initiation post Confirmation</td>
                <td style={{ padding: '10px 12px' }}>96 Hours</td>
                <td style={{ padding: '10px 12px' }}>At 96 Hours</td>
                <td style={{ padding: '10px 12px' }}>At 120 Hours</td>
                <td style={{ padding: '10px 12px' }}>At 168 Hours</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Resolve / Delay Reason Logging Modal */}
      {resolvingAlert && (
        <div className="modal-overlay" onClick={() => setResolvingAlert(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '26px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '14px', marginBottom: '16px' }}>
              <div>
                <span className="badge badge-danger">SLA Corrective Action</span>
                <h3 style={{ fontSize: '1.25rem', marginTop: '4px' }}>Resolve Task Delay: {resolvingAlert.id}</h3>
              </div>
              <button
                onClick={() => setResolvingAlert(null)}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '1.2rem', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.85rem' }}>
              <div>
                <strong style={{ color: 'var(--text-muted)' }}>Overdue Task:</strong>
                <p style={{ color: '#fff', marginTop: '2px' }}>{resolvingAlert.taskTitle}</p>
                <span style={{ fontSize: '0.75rem', color: '#fb7185' }}>
                  Recorded Delay: {resolvingAlert.delayHours} Hours overdue against {resolvingAlert.slaMaxHours}h SLA.
                </span>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                  Recorded Reason for Delay:
                </label>
                <textarea
                  value={delayReason}
                  onChange={(e) => setDelayReason(e.target.value)}
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-card-subtle)',
                    border: '1px solid var(--border-subtle)',
                    color: '#fff',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.85rem'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                  Corrective Action Executed:
                </label>
                <input
                  type="text"
                  value={actionNotes}
                  onChange={(e) => setActionNotes(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-card-subtle)',
                    border: '1px solid var(--border-subtle)',
                    color: '#fff',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.85rem'
                  }}
                />
              </div>

              <div style={{ padding: '12px', background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.25)', borderRadius: 'var(--radius-md)', fontSize: '0.75rem', color: '#a7f3d0' }}>
                ✓ Submitting will resolve the SLA alert, update Journey Stage 9 to Completed, unlock Stage 10 (Clinical Confirmation), and append an audit record to the patient journey.
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setResolvingAlert(null)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmResolve}
                  className="btn btn-primary"
                >
                  <CheckCircle2 size={15} />
                  <span>Execute Corrective Action & Clear Alert</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
