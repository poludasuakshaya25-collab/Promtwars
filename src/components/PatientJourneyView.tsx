import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  FileText, 
  UserCheck, 
  ChevronRight, 
  ArrowRight,
  Filter,
  Calendar,
  ShieldAlert,
  Building,
  ExternalLink
} from 'lucide-react';
import { JourneyStage, StageStatus, EscalationLevel } from '../types';

export const PatientJourneyView: React.FC = () => {
  const { 
    journeyStages, 
    updateStageStatus, 
    patient, 
    activePathway,
    userRole,
    setActiveTab
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStageModal, setSelectedStageModal] = useState<JourneyStage | null>(null);

  const categories = [
    { id: 'all', label: 'All 19 Stages' },
    { id: 'Screening & AI', label: 'Screening & AI (1-3)' },
    { id: 'Clinical Evaluation', label: 'Clinical Review (4, 5, 10)' },
    { id: 'Diagnostic Workup', label: 'Diagnostics & Pathology (6-9, 11)' },
    { id: 'Multidisciplinary Planning', label: 'Tumor Board & Plan (12-13)' },
    { id: 'Active Treatment', label: 'Treatment & Pharmacy (14-17)' },
    { id: 'Survivorship & Follow-Up', label: 'Survivorship (18-19)' }
  ];

  const filteredStages = selectedCategory === 'all' 
    ? journeyStages 
    : journeyStages.filter(s => s.category === selectedCategory);

  const completedCount = journeyStages.filter(s => s.status === 'completed').length;
  const overdueCount = journeyStages.filter(s => s.delayHours > 0 && s.status !== 'completed').length;
  const activeStage = journeyStages.find(s => s.status !== 'completed' && s.status !== 'not_started') || journeyStages[8];

  const getStatusBadge = (status: StageStatus, delayHours: number) => {
    if (status === 'completed') {
      return <span className="badge badge-emerald"><CheckCircle2 size={12} /> Completed</span>;
    }
    if (delayHours > 0) {
      return <span className="badge badge-danger"><AlertTriangle size={12} /> Overdue ({delayHours}h)</span>;
    }
    switch (status) {
      case 'in_progress':
        return <span className="badge badge-blue"><Clock size={12} /> In Progress</span>;
      case 'waiting_report':
        return <span className="badge badge-amber"><Clock size={12} /> Waiting for Report</span>;
      case 'waiting_appointment':
        return <span className="badge badge-blue"><Calendar size={12} /> Waiting Appointment</span>;
      case 'waiting_test':
        return <span className="badge badge-blue"><Clock size={12} /> Waiting for Test</span>;
      case 'awaiting_review':
        return <span className="badge badge-purple"><UserCheck size={12} /> Awaiting Clinician Review</span>;
      case 'treatment_planning':
        return <span className="badge badge-purple"><Clock size={12} /> Treatment Planning</span>;
      default:
        return <span className="badge" style={{ background: '#1e293b', color: '#94a3b8' }}>Not Started</span>;
    }
  };

  const getStepNumberBadge = (stage: JourneyStage) => {
    if (stage.status === 'completed') {
      return (
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: 'var(--emerald-success)',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 700,
          fontSize: '0.85rem'
        }}>
          <CheckCircle2 size={18} />
        </div>
      );
    }
    if (stage.delayHours > 0) {
      return (
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: 'var(--rose-danger)',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 800,
          fontSize: '0.85rem',
          boxShadow: 'var(--shadow-danger-glow)',
          animation: 'pulse-ring 1.8s infinite'
        }}>
          {stage.id}
        </div>
      );
    }
    if (stage.status !== 'not_started') {
      return (
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: 'var(--teal-primary)',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 700,
          fontSize: '0.85rem',
          boxShadow: 'var(--shadow-glow)'
        }}>
          {stage.id}
        </div>
      );
    }
    return (
      <div style={{
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        background: '#1e293b',
        color: 'var(--text-muted)',
        border: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 600,
        fontSize: '0.85rem'
      }}>
        {stage.id}
      </div>
    );
  };

  return (
    <div>
      {/* Top Journey Overview Banner */}
      <div className="card" style={{ marginBottom: '24px', background: 'linear-gradient(135deg, #101726 0%, #172554 100%)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className="badge badge-teal">Longitudinal Care Plan</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                ABDM Patient ID: {patient.abdmAyushmanHealthId}
              </span>
            </div>
            <h2 style={{ fontSize: '1.6rem', marginTop: '6px' }}>
              Connected Patient Journey: {patient.name}
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '750px', marginTop: '4px' }}>
              19-stage integrated pathway for <strong style={{ color: 'var(--teal-light)' }}>{activePathway.name}</strong>.
              Real-time synchronization across screening, diagnosis, specialist referral, multidisciplinary tumor board, medicine access, and surveillance.
            </p>
          </div>

          {/* Quick Metrics */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{
              background: 'rgba(0, 0, 0, 0.3)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '12px 18px',
              minWidth: '120px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Progress</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--teal-light)' }}>
                {completedCount} / 19
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                {Math.round((completedCount / 19) * 100)}% Completed
              </div>
            </div>

            <div style={{
              background: overdueCount > 0 ? 'rgba(244, 63, 94, 0.1)' : 'rgba(0, 0, 0, 0.3)',
              border: overdueCount > 0 ? '1px solid rgba(244, 63, 94, 0.4)' : '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '12px 18px',
              minWidth: '130px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '0.75rem', color: overdueCount > 0 ? '#fb7185' : 'var(--text-muted)' }}>
                SLA Delays
              </div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: overdueCount > 0 ? 'var(--rose-danger)' : 'var(--emerald-success)' }}>
                {overdueCount} Stage Overdue
              </div>
              {overdueCount > 0 && (
                <button
                  onClick={() => setActiveTab('escalations')}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#fb7185',
                    fontSize: '0.7rem',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    marginTop: '2px'
                  }}
                >
                  View Escalation Desk ➔
                </button>
              )}
            </div>

            <div style={{
              background: 'rgba(0, 0, 0, 0.3)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '12px 18px',
              minWidth: '160px'
            }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Current Actionable Step</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '2px' }}>
                Stage {activeStage.id}: {activeStage.stageName.split(':')[0]}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--teal-light)', marginTop: '4px' }}>
                {activeStage.responsibleParty.split('/')[0]}
              </div>
            </div>
          </div>
        </div>

        {/* Linear Progress Bar */}
        <div style={{
          width: '100%',
          height: '8px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '4px',
          marginTop: '20px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${(completedCount / 19) * 100}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #14b8a6 0%, #38bdf8 50%, #818cf8 100%)',
            transition: 'width 0.4s ease'
          }} />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        overflowX: 'auto',
        paddingBottom: '12px',
        marginBottom: '20px'
      }}>
        <Filter size={15} style={{ color: 'var(--text-muted)', marginRight: '4px', flexShrink: 0 }} />
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCategory(c.id)}
            className="btn btn-sm"
            style={{
              background: selectedCategory === c.id ? 'var(--teal-glow)' : 'var(--bg-card)',
              color: selectedCategory === c.id ? 'var(--teal-light)' : 'var(--text-secondary)',
              border: selectedCategory === c.id ? '1px solid rgba(20, 184, 166, 0.4)' : '1px solid var(--border-subtle)',
              whiteSpace: 'nowrap'
            }}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* 19-Stage Timeline Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {filteredStages.map((stage) => {
          const isOverdue = stage.delayHours > 0 && stage.status !== 'completed';
          return (
            <div
              key={stage.id}
              className="card card-interactive"
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px',
                padding: '18px 20px',
                borderLeft: isOverdue ? '4px solid var(--rose-danger)' : stage.status === 'completed' ? '4px solid var(--emerald-success)' : '4px solid var(--border-subtle)',
                background: isOverdue ? 'rgba(38, 16, 24, 0.85)' : 'var(--bg-card)'
              }}
            >
              {/* Step Circle Indicator */}
              <div style={{ flexShrink: 0, marginTop: '2px' }}>
                {getStepNumberBadge(stage)}
              </div>

              {/* Stage Body */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <h4 style={{ fontSize: '1rem', color: '#fff', margin: 0 }}>
                      Stage {stage.id}: {stage.stageName}
                    </h4>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.04)', padding: '2px 8px', borderRadius: '4px' }}>
                      {stage.category}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {getStatusBadge(stage.status, stage.delayHours)}
                    <button
                      onClick={() => setSelectedStageModal(stage)}
                      className="btn btn-sm btn-secondary"
                      style={{ padding: '4px 10px', fontSize: '0.72rem' }}
                    >
                      <span>Stage Details</span>
                      <ChevronRight size={13} />
                    </button>
                  </div>
                </div>

                {/* Responsible Person & Timing Details */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '24px',
                  flexWrap: 'wrap',
                  marginTop: '8px',
                  fontSize: '0.78rem',
                  color: 'var(--text-secondary)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <UserCheck size={14} style={{ color: 'var(--teal-light)' }} />
                    <span><strong>Responsible:</strong> {stage.responsibleParty}</span>
                  </div>

                  {stage.dueDate && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Calendar size={14} style={{ color: 'var(--blue-light)' }} />
                      <span><strong>Target Due:</strong> {stage.dueDate}</span>
                    </div>
                  )}

                  {stage.completedDate && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--emerald-success)' }}>
                      <CheckCircle2 size={14} />
                      <span><strong>Completed:</strong> {stage.completedDate}</span>
                    </div>
                  )}

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Clock size={14} style={{ color: 'var(--text-muted)' }} />
                    <span><strong>SLA Target:</strong> {stage.slaTargetHours} Hours</span>
                  </div>
                </div>

                {/* Pending Action Box */}
                <div style={{
                  marginTop: '12px',
                  padding: '10px 14px',
                  background: isOverdue ? 'rgba(244, 63, 94, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                  border: isOverdue ? '1px solid rgba(244, 63, 94, 0.3)' : '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '12px',
                  flexWrap: 'wrap'
                }}>
                  <div>
                    <div style={{ fontSize: '0.72rem', fontWeight: 700, color: isOverdue ? '#fb7185' : 'var(--text-muted)', textTransform: 'uppercase' }}>
                      {isOverdue ? '⚠️ Overdue Action & Alert' : 'Pending Action / Status'}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: isOverdue ? '#fff' : 'var(--text-main)', marginTop: '2px' }}>
                      {stage.pendingAction}
                    </div>
                  </div>

                  {/* Next Step Guidance */}
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                      Recommended Next Step
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--teal-light)', fontWeight: 600 }}>
                      {stage.nextRecommendedStep}
                    </div>
                  </div>
                </div>

                {/* Related Documents Tags */}
                {stage.relatedDocuments && stage.relatedDocuments.length > 0 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '10px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Linked Records:</span>
                    {stage.relatedDocuments.map((doc, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontSize: '0.72rem',
                          background: 'rgba(255, 255, 255, 0.04)',
                          border: '1px solid var(--border-subtle)',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          color: '#e2e8f0',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <FileText size={11} style={{ color: 'var(--teal-light)' }} />
                        {doc}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Stage Detail / Action Modal */}
      {selectedStageModal && (
        <div className="modal-overlay" onClick={() => setSelectedStageModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '16px', marginBottom: '20px' }}>
              <div>
                <span className="badge badge-teal">Stage {selectedStageModal.id} of 19</span>
                <h3 style={{ fontSize: '1.25rem', marginTop: '4px' }}>{selectedStageModal.stageName}</h3>
              </div>
              <button
                onClick={() => setSelectedStageModal(null)}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '1.2rem', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.85rem' }}>
              <div>
                <strong style={{ color: 'var(--text-muted)' }}>Category:</strong> {selectedStageModal.category}
              </div>
              <div>
                <strong style={{ color: 'var(--text-muted)' }}>Responsible Entity:</strong> {selectedStageModal.responsibleParty}
              </div>
              <div>
                <strong style={{ color: 'var(--text-muted)' }}>SLA Maximum Target:</strong> {selectedStageModal.slaTargetHours} Hours
              </div>
              <div>
                <strong style={{ color: 'var(--text-muted)' }}>Recorded Delay:</strong> {selectedStageModal.delayHours} Hours
              </div>
              <div>
                <strong style={{ color: 'var(--text-muted)' }}>Pending Clinical/Admin Action:</strong>
                <p style={{ marginTop: '4px', padding: '10px', background: 'var(--bg-card-subtle)', borderRadius: '6px' }}>
                  {selectedStageModal.pendingAction}
                </p>
              </div>

              {selectedStageModal.escalationNotes && (
                <div style={{ padding: '12px', background: 'rgba(244, 63, 94, 0.1)', border: '1px solid rgba(244, 63, 94, 0.3)', borderRadius: '6px' }}>
                  <div style={{ color: '#fb7185', fontWeight: 700, fontSize: '0.78rem' }}>
                    ESCALATION ENGINE LOG ({selectedStageModal.escalationLevel.toUpperCase()}):
                  </div>
                  <div style={{ color: '#fecdd3', marginTop: '4px' }}>
                    {selectedStageModal.escalationNotes}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '18px', marginTop: '10px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                {selectedStageModal.status !== 'completed' && (
                  <button
                    onClick={() => {
                      updateStageStatus(selectedStageModal.id, 'completed', 'Manually marked as completed by authorized clinician.');
                      setSelectedStageModal(null);
                    }}
                    className="btn btn-sm btn-primary"
                  >
                    <CheckCircle2 size={14} />
                    <span>Mark Stage as Completed</span>
                  </button>
                )}

                {selectedStageModal.id === 9 && selectedStageModal.delayHours > 0 && (
                  <button
                    onClick={() => {
                      setSelectedStageModal(null);
                      setActiveTab('escalations');
                    }}
                    className="btn btn-sm btn-danger"
                  >
                    <ShieldAlert size={14} />
                    <span>Open Escalation Desk</span>
                  </button>
                )}

                <button
                  onClick={() => setSelectedStageModal(null)}
                  className="btn btn-sm btn-secondary"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
