import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Globe, 
  MapPin, 
  Plane, 
  ShieldCheck, 
  FileText, 
  Clock, 
  DollarSign, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle,
  Send,
  HelpCircle
} from 'lucide-react';
import { InternationalCenter } from '../types';

export const InternationalDiscoveryView: React.FC = () => {
  const { internationalCenters, patient, addToast } = useApp();
  const [selectedCenter, setSelectedCenter] = useState<InternationalCenter | null>(null);
  const [teleSecondOpinionOpen, setTeleSecondOpinionOpen] = useState<boolean>(false);
  const [recordsConsentGiven, setRecordsConsentGiven] = useState<boolean>(false);
  const [inquiryNotes, setInquiryNotes] = useState<string>(
    'Patient Priya Sharma (Age 48, Hyderabad, India): Infiltrating Ductal Carcinoma, seeking international tele-second opinion regarding adjuvant targeted therapy / immunotherapy clinical trial eligibility.'
  );

  const handleOpenTeleOpinion = (center: InternationalCenter) => {
    setSelectedCenter(center);
    setTeleSecondOpinionOpen(true);
    setRecordsConsentGiven(false);
  };

  const handleSendInquiry = () => {
    if (!recordsConsentGiven) {
      addToast('Patient consent for cross-border record transmission is required.', 'warning');
      return;
    }
    addToast(`Cross-Border Second Opinion dossier dispatched to ${selectedCenter?.name}. International Patient Liaison assigned. Case #INTL-2026-${Math.floor(1000 + Math.random() * 9000)}`, 'success');
    setTeleSecondOpinionOpen(false);
  };

  return (
    <div>
      {/* International Overview Banner */}
      <div className="card" style={{ marginBottom: '24px', background: 'linear-gradient(135deg, #101726 0%, #312e81 100%)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="badge badge-purple">Global Oncology Discovery</span>
              <span style={{ fontSize: '0.78rem', color: '#c7d2fe' }}>
                Accredited International Cancer Institutes
              </span>
            </div>
            <h2 style={{ fontSize: '1.5rem', marginTop: '6px' }}>
              International Treatment Options & Remote Second Opinions
            </h2>
            <p style={{ color: '#e0e7ff', fontSize: '0.88rem', maxWidth: '800px', marginTop: '4px' }}>
              Explore advanced oncological modalities not widely available locally (CAR-T Cell Therapy, MR-Linac Adaptive Radiation, Phase I/II Clinical Trials, and Specialized Genomic Profiling). Tele-second opinions and medical travel coordination.
            </p>
          </div>

          <div style={{
            background: 'rgba(0, 0, 0, 0.35)',
            padding: '12px 18px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(139, 92, 246, 0.4)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.72rem', color: '#c7d2fe', textTransform: 'uppercase' }}>Available Centers</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#a78bfa' }}>
              {internationalCenters.length} Global Institutes
            </div>
            <div style={{ fontSize: '0.68rem', color: '#e0e7ff' }}>USA • Singapore • France • South Korea</div>
          </div>
        </div>

        {/* Responsible Stewardship Disclaimer */}
        <div style={{
          marginTop: '16px',
          padding: '10px 14px',
          background: 'rgba(0, 0, 0, 0.25)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: 'var(--radius-md)',
          fontSize: '0.76rem',
          color: '#cbd5e1',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <AlertTriangle size={15} style={{ color: '#fbbf24', flexShrink: 0 }} />
          <span>
            <strong>Clinical Responsibility Notice:</strong> Treatment abroad is not automatically superior. Recommendations are based on specialized clinical appropriateness, rare sub-types, patient preference, and local treating team consensus.
          </span>
        </div>
      </div>

      {/* Centers Comparison Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '20px', marginBottom: '24px' }}>
        {internationalCenters.map((center) => (
          <div
            key={center.id}
            className="card card-interactive"
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          >
            <div>
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span className="badge badge-purple">{center.country}</span>
                    {center.hipaaGdrpCompliant && (
                      <span className="badge badge-emerald">HIPAA / GDPR Verified</span>
                    )}
                  </div>
                  <h3 style={{ fontSize: '1.2rem', color: '#fff', marginTop: '6px', lineHeight: 1.3 }}>
                    {center.name}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '3px' }}>
                    <MapPin size={12} style={{ color: 'var(--teal-light)' }} />
                    <span>{center.city}, {center.country}</span>
                  </div>
                </div>

                <div style={{
                  textAlign: 'right',
                  padding: '6px 10px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(99, 102, 241, 0.15)',
                  border: '1px solid rgba(99, 102, 241, 0.3)',
                  flexShrink: 0
                }}>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Tele-Opinion Fee</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--blue-light)' }}>
                    ${center.estConsultationUSD} USD
                  </div>
                </div>
              </div>

              {/* Key Highlights */}
              <p style={{ fontSize: '0.82rem', color: '#cbd5e1', marginTop: '12px', lineHeight: 1.5 }}>
                {center.keyHighlights}
              </p>

              {/* Advanced Technologies */}
              <div style={{ marginTop: '14px' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Advanced Technologies & Specialized Modalities:
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {center.advancedTechnologies.map((tech, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontSize: '0.72rem',
                        background: 'rgba(139, 92, 246, 0.12)',
                        border: '1px solid rgba(139, 92, 246, 0.3)',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        color: '#d8b4fe'
                      }}
                    >
                      ★ {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Clinical Metrics & Travel Logistics */}
              <div style={{
                marginTop: '16px',
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '8px',
                padding: '12px',
                background: 'var(--bg-card-subtle)',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.76rem'
              }}>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Estimated Treatment: </span>
                  <div style={{ fontWeight: 700, color: '#fff', marginTop: '1px' }}>{center.estTreatmentRangeUSD}</div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Average Wait Time: </span>
                  <div style={{ fontWeight: 700, color: 'var(--teal-light)', marginTop: '1px' }}>{center.averageWaitWeeks} Weeks</div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Active Clinical Trials: </span>
                  <div style={{ fontWeight: 700, color: 'var(--blue-light)', marginTop: '1px' }}>{center.clinicalTrialsActive}+ Protocols</div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Medical Visa Letter: </span>
                  <div style={{ fontWeight: 700, color: center.visaAssistanceOffered ? 'var(--emerald-success)' : 'var(--text-muted)', marginTop: '1px' }}>
                    {center.visaAssistanceOffered ? '✓ Fast-Track Support' : 'Self-Arranged'}
                  </div>
                </div>
              </div>

              {/* Language Support */}
              <div style={{ marginTop: '10px', fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                🗣️ <strong>Supported Languages:</strong> {center.languageSupport.join(', ')}
              </div>
            </div>

            {/* Action Trigger */}
            <div style={{ marginTop: '18px', borderTop: '1px solid var(--border-subtle)', paddingTop: '14px', display: 'flex', gap: '10px' }}>
              <button
                onClick={() => handleOpenTeleOpinion(center)}
                className="btn btn-primary"
                style={{ flex: 1, padding: '10px', fontSize: '0.82rem' }}
              >
                <Sparkles size={14} />
                <span>Request Remote Second Opinion</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Tele-Second Opinion Booking Modal */}
      {teleSecondOpinionOpen && selectedCenter && (
        <div className="modal-overlay" onClick={() => setTeleSecondOpinionOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '26px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '14px', marginBottom: '16px' }}>
              <div>
                <span className="badge badge-purple">Cross-Border Teleconsultation Dossier</span>
                <h3 style={{ fontSize: '1.25rem', marginTop: '4px' }}>{selectedCenter.name}</h3>
              </div>
              <button
                onClick={() => setTeleSecondOpinionOpen(false)}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '1.2rem', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.85rem' }}>
              <div>
                <strong style={{ color: 'var(--text-muted)' }}>Patient Identification:</strong>
                <p style={{ marginTop: '2px', color: '#fff' }}>
                  {patient.name} ({patient.age}y, {patient.city}) • Primary Diagnosis: Left Breast Lesion (BI-RADS 4C / IDC)
                </p>
              </div>

              <div>
                <strong style={{ color: 'var(--text-muted)' }}>Teleconsultation Fee:</strong>
                <span style={{ marginLeft: '6px', color: 'var(--teal-light)', fontWeight: 700 }}>
                  ${selectedCenter.estConsultationUSD} USD
                </span>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                  Clinical Inquiry Summary:
                </label>
                <textarea
                  value={inquiryNotes}
                  onChange={(e) => setInquiryNotes(e.target.value)}
                  rows={4}
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

              {/* Patient Consent Gate */}
              <div style={{ padding: '14px', background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.3)', borderRadius: 'var(--radius-md)' }}>
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={recordsConsentGiven}
                    onChange={(e) => setRecordsConsentGiven(e.target.checked)}
                    style={{ marginTop: '3px', accentColor: 'var(--teal-primary)', width: '16px', height: '16px' }}
                  />
                  <div style={{ fontSize: '0.78rem', color: '#e0e7ff', lineHeight: 1.5 }}>
                    <strong>Mandatory Cross-Border Data Sharing Consent:</strong> I voluntarily authorize AI CancerConnect to securely transmit my encrypted medical records (imaging, histopathology biopsy reports, clinical notes) to the international board at {selectedCenter.name} in compliance with applicable health data regulations.
                  </div>
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setTeleSecondOpinionOpen(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSendInquiry}
                  className="btn btn-primary"
                >
                  <Send size={15} />
                  <span>Transmit Dossier & Request Tele-Review</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
