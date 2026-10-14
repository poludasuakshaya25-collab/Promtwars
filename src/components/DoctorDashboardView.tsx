import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Stethoscope, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Clock, 
  User, 
  Send, 
  Calendar,
  Building,
  ShieldCheck,
  Share2,
  Edit3,
  Sparkles
} from 'lucide-react';
import { Card3D } from './Card3D';

export const DoctorDashboardView: React.FC = () => {
  const { 
    patient, 
    aiResult, 
    confirmDoctorReview, 
    updateStageStatus, 
    facilities, 
    setActiveTab, 
    addToast 
  } = useApp();

  const [clinicalNotes, setClinicalNotes] = useState<string>(
    'Clinical exam: 2.2 cm firm mass in Left Upper Outer Quadrant. Correlates with AI BI-RADS 4C architectural distortion. USG-guided core needle biopsy + full IHC panel ordered.'
  );
  const [selectedDecision, setSelectedDecision] = useState<'confirmed' | 'inconclusive' | 'ruled_out'>('confirmed');
  const [isSubmittingReview, setIsSubmittingReview] = useState<boolean>(false);

  const [testToOrder, setTestToOrder] = useState<string>('Ultrasound-Guided Core Needle Biopsy (Left Breast) + IHC');
  const [targetFacility, setTargetFacility] = useState<string>(facilities[0]?.name || 'Basavatarakam Cancer Hospital');
  const [urgencyOrder, setUrgencyOrder] = useState<string>('Urgent (Within 48h)');

  const handleReviewSubmit = () => {
    setIsSubmittingReview(true);
    setTimeout(() => {
      confirmDoctorReview(selectedDecision, clinicalNotes);
      setIsSubmittingReview(false);
    }, 500);
  };

  const handleOrderTest = () => {
    addToast(`Investigation Requisition Issued: "${testToOrder}" routed to ${targetFacility}. Ref #ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`, 'success');
    updateStageStatus(6, 'completed', `Diagnostic Requisition issued: ${testToOrder}`);
    updateStageStatus(7, 'in_progress', `Scheduling appointment at ${targetFacility}`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Clinician Identity Card with 3D Depth */}
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '54px',
              height: '54px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #be123c 0%, #b45309 50%, #f59e0b 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              boxShadow: '0 0 20px rgba(245, 158, 11, 0.4)',
              border: '1px solid rgba(254, 240, 138, 0.5)'
            }}>
              <Stethoscope size={28} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2 style={{ fontSize: '1.4rem', color: '#fff', margin: 0 }}>
                  Dr. Ananya Sen, MS, MCh (Surgical Oncology)
                </h2>
                <span className="badge badge-gold">Verified Clinician</span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '3px' }}>
                Senior Breast Onco-Surgeon • Basavatarakam Cancer Hospital & Research Institute
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => setActiveTab('escalations')}
              className="btn btn-sm btn-danger btn-3d"
            >
              <AlertTriangle size={14} />
              <span>Overdue Tasks (1 SLA Alert)</span>
            </button>
            <button
              onClick={() => setActiveTab('journey')}
              className="btn btn-sm btn-secondary btn-3d"
            >
              <Clock size={14} />
              <span>Patient Journey</span>
            </button>
          </div>
        </div>
      </Card3D>

      {/* Main Grid: Pending Clinical Review vs. Investigation Orders */}
      <div className="grid-2">
        {/* Left Column: AI Assessment Review & Sign-Off */}
        <Card3D glowColor="red" intensity={8} style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="badge badge-red">AI Triage Review</span>
              <h4 style={{ fontSize: '1.1rem', color: '#fff' }}>Patient: {patient.name} ({patient.age}y)</h4>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--gold-light)' }}>
              ABDM: {patient.abdmAyushmanHealthId}
            </span>
          </div>

          {/* AI Callout */}
          <div style={{
            padding: '14px',
            background: 'rgba(15, 7, 12, 0.8)',
            border: '1px solid rgba(245, 158, 11, 0.2)',
            borderRadius: 'var(--radius-md)',
            marginBottom: '18px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Algorithm: {aiResult?.modelUsed || 'BreastCAD-DeepNet'} ({aiResult?.modelVersion || 'v4.2'})
              </span>
              <span className="badge badge-red">
                Score: {aiResult?.riskScore || 78}/100 • Suspicious (BI-RADS 4C)
              </span>
            </div>
            <p style={{ fontSize: '0.82rem', color: '#e8dbe1', lineHeight: 1.5 }}>
              <strong>AI Findings:</strong> Focal architectural distortion (22 x 18 mm) in left upper outer quadrant with pleomorphic microcalcifications. Confidence: 88.4%.
            </p>
          </div>

          {/* Decision Buttons with 3D Bevel */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '0.76rem', color: 'var(--gold-light)', display: 'block', marginBottom: '8px', textTransform: 'uppercase', fontWeight: 700 }}>
              Clinician Assessment & Decision:
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              <button
                type="button"
                onClick={() => setSelectedDecision('confirmed')}
                className="btn-3d"
                style={{
                  padding: '10px 6px',
                  borderRadius: 'var(--radius-md)',
                  background: selectedDecision === 'confirmed' ? 'linear-gradient(135deg, #be123c, #9f1239)' : 'rgba(15, 7, 12, 0.8)',
                  border: selectedDecision === 'confirmed' ? '1px solid #fb7185' : '1px solid var(--border-subtle)',
                  color: selectedDecision === 'confirmed' ? '#fff' : 'var(--text-secondary)',
                  fontWeight: 700,
                  fontSize: '0.78rem',
                  cursor: 'pointer'
                }}
              >
                ✓ Confirm Suspicion
              </button>

              <button
                type="button"
                onClick={() => setSelectedDecision('inconclusive')}
                className="btn-3d"
                style={{
                  padding: '10px 6px',
                  borderRadius: 'var(--radius-md)',
                  background: selectedDecision === 'inconclusive' ? 'linear-gradient(135deg, #b45309, #d97706)' : 'rgba(15, 7, 12, 0.8)',
                  border: selectedDecision === 'inconclusive' ? '1px solid #fbbf24' : '1px solid var(--border-subtle)',
                  color: selectedDecision === 'inconclusive' ? '#fff' : 'var(--text-secondary)',
                  fontWeight: 700,
                  fontSize: '0.78rem',
                  cursor: 'pointer'
                }}
              >
                ? Inconclusive
              </button>

              <button
                type="button"
                onClick={() => setSelectedDecision('ruled_out')}
                className="btn-3d"
                style={{
                  padding: '10px 6px',
                  borderRadius: 'var(--radius-md)',
                  background: selectedDecision === 'ruled_out' ? '#1e293b' : 'rgba(15, 7, 12, 0.8)',
                  border: selectedDecision === 'ruled_out' ? '1px solid #64748b' : '1px solid var(--border-subtle)',
                  color: selectedDecision === 'ruled_out' ? '#fff' : 'var(--text-secondary)',
                  fontWeight: 700,
                  fontSize: '0.78rem',
                  cursor: 'pointer'
                }}
              >
                ✕ Rule Out (Benign)
              </button>
            </div>
          </div>

          {/* Notes */}
          <div style={{ marginBottom: '18px' }}>
            <label style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px', textTransform: 'uppercase', fontWeight: 600 }}>
              Physical Examination & Clinical Notes:
            </label>
            <textarea
              value={clinicalNotes}
              onChange={(e) => setClinicalNotes(e.target.value)}
              rows={4}
              className="form-input"
              style={{ resize: 'vertical' }}
            />
          </div>

          {/* Submit */}
          <button
            onClick={handleReviewSubmit}
            disabled={isSubmittingReview}
            className="btn btn-primary btn-3d"
            style={{ width: '100%', padding: '12px' }}
          >
            <CheckCircle2 size={16} />
            <span>{isSubmittingReview ? 'Signing Decision...' : 'Sign & Submit Clinical Confirmation'}</span>
          </button>
        </Card3D>

        {/* Right Column: Diagnostic Requisitions */}
        <Card3D glowColor="gold" intensity={8} style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h4 style={{ fontSize: '1.1rem', color: '#fff' }}>
              Diagnostic Requisition & Facility Order
            </h4>
            <span className="badge badge-gold">Order Entry</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', display: 'block', marginBottom: '6px', fontWeight: 600 }}>
                Investigation Procedure:
              </label>
              <select
                value={testToOrder}
                onChange={(e) => setTestToOrder(e.target.value)}
                className="form-input"
              >
                <option value="Ultrasound-Guided Core Needle Biopsy (Left Breast) + IHC">
                  Ultrasound-Guided Core Needle Biopsy (Left Breast) + IHC (ER, PR, HER2, Ki-67)
                </option>
                <option value="Whole-Body 18F-FDG PET-CT Scan for Staging">
                  Whole-Body 18F-FDG PET-CT Scan for Staging
                </option>
                <option value="Bilateral Contrast-Enhanced Breast MRI">
                  Bilateral Contrast-Enhanced Breast MRI (3.0 Tesla)
                </option>
                <option value="BRCA1 & BRCA2 Next-Generation Sequencing Panel">
                  BRCA1 & BRCA2 Next-Generation Sequencing Germline Panel
                </option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', display: 'block', marginBottom: '6px', fontWeight: 600 }}>
                Target Medical Facility / Laboratory:
              </label>
              <select
                value={targetFacility}
                onChange={(e) => setTargetFacility(e.target.value)}
                className="form-input"
              >
                {facilities.map((fac) => (
                  <option key={fac.id} value={fac.name}>
                    {fac.name} ({fac.city}) - {fac.liveSlotStatus}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', display: 'block', marginBottom: '6px', fontWeight: 600 }}>
                Clinical Urgency & Target SLA:
              </label>
              <div style={{ display: 'flex', gap: '10px' }}>
                {['Urgent (Within 48h)', 'Semi-Urgent (Within 5 Days)', 'Routine (Within 14 Days)'].map((urg) => (
                  <button
                    key={urg}
                    type="button"
                    onClick={() => setUrgencyOrder(urg)}
                    className="btn-3d"
                    style={{
                      flex: 1,
                      padding: '8px 4px',
                      borderRadius: 'var(--radius-sm)',
                      background: urgencyOrder === urg ? 'linear-gradient(135deg, #b45309, #f59e0b)' : 'rgba(15, 7, 12, 0.8)',
                      border: urgencyOrder === urg ? '1px solid #fef08a' : '1px solid var(--border-subtle)',
                      color: urgencyOrder === urg ? '#fff' : 'var(--text-secondary)',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    {urg}
                  </button>
                ))}
              </div>
            </div>

            <div style={{
              padding: '12px',
              background: 'rgba(225, 29, 72, 0.12)',
              border: '1px solid rgba(225, 29, 72, 0.3)',
              borderRadius: 'var(--radius-md)'
            }}>
              <div style={{ fontSize: '0.76rem', color: '#fb7185', fontWeight: 700 }}>
                Delay Prevention SLA:
              </div>
              <div style={{ fontSize: '0.73rem', color: '#e2d4db', marginTop: '2px' }}>
                Biopsy scheduling and histopathology report delivery are tracked under 48h SLA with auto-escalation.
              </div>
            </div>

            <button
              onClick={handleOrderTest}
              className="btn btn-primary btn-3d"
              style={{ marginTop: '8px', padding: '12px' }}
            >
              <Send size={15} />
              <span>Dispatch Investigation Order</span>
            </button>
          </div>
        </Card3D>
      </div>

      {/* Multidisciplinary Tumor Board (MDT) Summary */}
      <Card3D glowColor="gold" intensity={6} style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div>
            <span className="badge badge-gold">MDT Board Consensus</span>
            <h4 style={{ fontSize: '1.15rem', marginTop: '4px', color: '#fff' }}>
              Multidisciplinary Breast Tumor Board Summary (Case #PT-8842)
            </h4>
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--gold-light)' }}>
            Quorum Met: Surgical, Medical, Radiation, Pathology
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          <div style={{ padding: '14px', background: 'rgba(15, 7, 12, 0.7)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.75rem', color: '#fb7185', fontWeight: 700, textTransform: 'uppercase' }}>
              1. Surgical Oncology Opinion
            </div>
            <p style={{ fontSize: '0.8rem', color: '#e8dce2', marginTop: '4px' }}>
              Left Breast Infiltrating Ductal Carcinoma (cT2 cN1 cM0, Stage IIB). Candidate for Neoadjuvant Chemotherapy followed by Breast Conservation Surgery.
            </p>
          </div>

          <div style={{ padding: '14px', background: 'rgba(15, 7, 12, 0.7)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--gold-light)', fontWeight: 700, textTransform: 'uppercase' }}>
              2. Medical Oncology Regimen
            </div>
            <p style={{ fontSize: '0.8rem', color: '#e8dce2', marginTop: '4px' }}>
              AC regimen x 4 cycles, followed by Paclitaxel weekly x 12. Add Trastuzumab (Herceptin) 8mg/kg loading then 6mg/kg q3w for 1 full year for HER2 3+.
            </p>
          </div>

          <div style={{ padding: '14px', background: 'rgba(15, 7, 12, 0.7)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.75rem', color: '#fef08a', fontWeight: 700, textTransform: 'uppercase' }}>
              3. Radiation Therapy Plan
            </div>
            <p style={{ fontSize: '0.8rem', color: '#e8dce2', marginTop: '4px' }}>
              Adjuvant Whole Breast Hypofractionated Radiotherapy (40.05 Gy in 15 fractions over 3 weeks) with tumor bed sequential boost following surgery.
            </p>
          </div>
        </div>
      </Card3D>
    </div>
  );
};
