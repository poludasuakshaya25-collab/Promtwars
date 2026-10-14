import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  HeartPulse, 
  Clock, 
  Calendar, 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Pill, 
  Building2, 
  Phone,
  ShieldCheck,
  User,
  Download,
  Stethoscope,
  Activity,
  Layers,
  ChevronRight
} from 'lucide-react';
import { Card3D } from './Card3D';
import { BioMatrix3DCanvas } from './BioMatrix3DCanvas';

export const PatientDashboardView: React.FC = () => {
  const { 
    patient, 
    journeyStages, 
    aiResult, 
    activePathway, 
    setActiveTab, 
    overdueAlerts,
    addToast,
    requestMedicineRefill
  } = useApp();

  const [activeDeckTab, setActiveDeckTab] = useState<'pathology' | 'schedule' | 'prescriptions'>('pathology');

  const completedStages = journeyStages.filter(s => s.status === 'completed').length;
  const currentStage = journeyStages.find(s => s.status !== 'completed' && s.status !== 'not_started') || journeyStages[8];
  const activeAlert = overdueAlerts.find(a => a.patientId === patient.id && a.status === 'active');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Patient Welcome Hero with Red & Gold Depth */}
      <Card3D
        glowColor="both"
        intensity={6}
        style={{
          background: 'linear-gradient(135deg, rgba(28, 12, 20, 0.95) 0%, rgba(45, 18, 25, 0.95) 100%)',
          border: '1px solid rgba(245, 158, 11, 0.35)',
          padding: '24px',
          boxShadow: 'var(--shadow-3d)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className="badge badge-gold">Patient Care Portal</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--gold-light)' }}>
                ABDM ID: <strong>{patient.abdmAyushmanHealthId}</strong>
              </span>
              <span className="badge badge-red">Verified Active</span>
            </div>

            <h2 style={{ fontSize: '1.75rem', marginTop: '8px', color: '#fff' }}>
              Welcome back, <span className="gradient-text-gold">{patient.name}</span>
            </h2>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '780px', marginTop: '6px' }}>
              Active Pathway: <strong style={{ color: '#fff' }}>{activePathway.name}</strong> • Synchronized care coordination across diagnostic labs, specialist oncologists, and health schemes.
            </p>
          </div>

          {/* Quick Navigator Desk */}
          <div
            style={{
              background: 'rgba(15, 7, 12, 0.8)',
              border: '1px solid rgba(245, 158, 11, 0.25)',
              borderRadius: 'var(--radius-md)',
              padding: '14px 20px',
              minWidth: '260px'
            }}
          >
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Dedicated Care Navigator
            </div>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', marginTop: '2px' }}>
              Sister Mary V. • Onco-Desk
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--gold-light)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Phone size={13} />
              <span>+91 40 2355 1235 (Ext 401)</span>
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Emergency: Vikram Sharma ({patient.emergencyContact.phone})
            </div>
          </div>
        </div>

        {/* Actionable Current Step Box */}
        <div
          style={{
            marginTop: '20px',
            padding: '16px 20px',
            background: activeAlert
              ? 'linear-gradient(135deg, rgba(225, 29, 72, 0.22) 0%, rgba(35, 12, 18, 0.9) 100%)'
              : 'linear-gradient(135deg, rgba(245, 158, 11, 0.16) 0%, rgba(25, 12, 18, 0.9) 100%)',
            border: activeAlert ? '1px solid rgba(225, 29, 72, 0.5)' : '1px solid rgba(245, 158, 11, 0.4)',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '14px'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className={`badge ${activeAlert ? 'badge-red' : 'badge-gold'}`}>
                {activeAlert ? 'Urgent Milestone' : 'Current Active Phase'}
              </span>
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff' }}>
                Stage {currentStage.id}: {currentStage.stageName}
              </span>
            </div>
            <p style={{ fontSize: '0.84rem', color: '#f1e7ec', marginTop: '4px', maxWidth: '800px' }}>
              {currentStage.pendingAction}
            </p>
            <div style={{ fontSize: '0.78rem', color: 'var(--gold-light)', marginTop: '4px' }}>
              👉 <strong>Next Step:</strong> {currentStage.nextRecommendedStep}
            </div>
          </div>

          <button
            onClick={() => setActiveTab('journey')}
            className="btn btn-primary btn-3d"
            style={{ padding: '10px 18px', fontSize: '0.85rem' }}
          >
            <span>Track 19-Stage Journey</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </Card3D>

      {/* Row 1: 3D Interactive Bio-Matrix Canvas & Milestone Progress (Organized Grid) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.25fr 0.75fr', gap: '20px' }}>
        {/* Left: 3D Interactive Bio-Matrix Canvas */}
        <BioMatrix3DCanvas />

        {/* Right: Milestone Progress & SLA Health */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Card3D
            glowColor="gold"
            intensity={10}
            style={{
              padding: '20px',
              background: 'linear-gradient(135deg, rgba(22, 11, 18, 0.95), rgba(30, 14, 22, 0.95))',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              flex: 1
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--gold-light)', textTransform: 'uppercase' }}>
                Roadmap Completion
              </span>
              <span className="badge badge-gold">
                {completedStages} of 19 Stages Done
              </span>
            </div>

            {/* Progress Bar with Red-Gold Gradient */}
            <div
              style={{
                width: '100%',
                height: '10px',
                background: 'rgba(10, 5, 8, 0.7)',
                borderRadius: '999px',
                overflow: 'hidden',
                border: '1px solid rgba(245, 158, 11, 0.2)',
                marginBottom: '14px'
              }}
            >
              <div
                style={{
                  width: `${(completedStages / 19) * 100}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #be123c, #f59e0b, #fef08a)',
                  boxShadow: '0 0 10px rgba(245, 158, 11, 0.5)'
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.82rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>Diagnostic SaMD Screening:</span>
                <strong style={{ color: '#34d399' }}>✓ Completed</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>Core Biopsy Histopathology:</span>
                <strong style={{ color: 'var(--gold-light)' }}>⏳ In Review</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>Multi-Disciplinary Tumor Board:</span>
                <strong style={{ color: '#fff' }}>📅 Scheduled Thursday</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>Targeted Therapy Enrollment:</span>
                <strong style={{ color: 'var(--text-muted)' }}>Pending Staging</strong>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('journey')}
              className="btn btn-sm btn-outline btn-3d"
              style={{ width: '100%', marginTop: '16px', padding: '9px' }}
            >
              <span>Explore Detailed Milestones</span>
              <ChevronRight size={14} />
            </button>
          </Card3D>

          {/* Quick Doctor Seal Card */}
          <Card3D
            glowColor="red"
            intensity={10}
            style={{
              padding: '18px',
              background: 'linear-gradient(135deg, rgba(35, 12, 22, 0.95), rgba(22, 10, 16, 0.95))',
              border: '1px solid rgba(225, 29, 72, 0.35)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #be123c, #9f1239)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  border: '1px solid rgba(251, 113, 133, 0.3)'
                }}
              >
                <Stethoscope size={20} />
              </div>
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#fff' }}>
                  Dr. Ananya Sen, MS, MCh
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--gold-light)' }}>
                  Chief Surgical Oncologist • Basavatarakam Hospital
                </div>
              </div>
            </div>
            <p style={{ fontSize: '0.78rem', color: '#e8d9e0', marginTop: '10px', lineHeight: 1.4 }}>
              "Clinical impression matches BI-RADS 4C. Targeted HER2 therapy recommended following core biopsy verification."
            </p>
          </Card3D>
        </div>
      </div>

      {/* Row 2: 4 Key Metric Cards (3D Tilt with Red & Gold Accents) */}
      <div className="grid-4">
        {/* Metric 1 */}
        <Card3D glowColor="red" intensity={12}>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Risk Stratification
          </div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fb7185', marginTop: '4px' }}>
            BI-RADS 4C
          </div>
          <div style={{ fontSize: '0.76rem', color: 'var(--gold-light)', marginTop: '4px' }}>
            Score: <strong>78/100</strong> (Suspicious)
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Verified via BreastCAD AI v4.2
          </div>
        </Card3D>

        {/* Metric 2 */}
        <Card3D glowColor="gold" intensity={12}>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Pathology Staging
          </div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fbbf24', marginTop: '4px' }}>
            IDC Grade II
          </div>
          <div style={{ fontSize: '0.76rem', color: '#fff', marginTop: '4px' }}>
            Stage T2N1M0 • HER2+
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Biopsy Core: Basavatarakam Lab
          </div>
        </Card3D>

        {/* Metric 3 */}
        <Card3D glowColor="red" intensity={12}>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            SLA Delay Watchdog
          </div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: activeAlert ? '#fb7185' : '#34d399', marginTop: '4px' }}>
            {activeAlert ? 'Escalated L2' : 'SLA Met'}
          </div>
          <div style={{ fontSize: '0.76rem', color: 'var(--gold-light)', marginTop: '4px' }}>
            {activeAlert ? 'Delayed +51h (Mitigated)' : 'Turnaround on track'}
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Direct report release expedited
          </div>
        </Card3D>

        {/* Metric 4 */}
        <Card3D glowColor="gold" intensity={12}>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Ayushman Bharat Coverage
          </div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fef08a', marginTop: '4px' }}>
            100% Covered
          </div>
          <div style={{ fontSize: '0.76rem', color: '#34d399', marginTop: '4px' }}>
            PM-JAY Golden Card Active
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Cashless chemo & diagnostics
          </div>
        </Card3D>
      </div>

      {/* Row 3: Structured Clinical Action Deck (Tabs & Content) */}
      <Card3D
        glowColor="gold"
        intensity={6}
        style={{
          padding: '24px',
          background: 'rgba(20, 10, 16, 0.95)',
          border: '1px solid rgba(245, 158, 11, 0.3)'
        }}
      >
        {/* Deck Header & Option Effects */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginBottom: '20px' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', color: '#fff', margin: 0 }}>
              Clinical Command Deck
            </h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: 0 }}>
              Diagnostic records, specialist consultations, and oncology prescriptions
            </p>
          </div>

          {/* Interactive Option Tabs with 3D Bevel Effects */}
          <div
            style={{
              display: 'flex',
              gap: '6px',
              background: 'rgba(10, 5, 8, 0.8)',
              padding: '4px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)'
            }}
          >
            <button
              onClick={() => setActiveDeckTab('pathology')}
              className="btn-3d"
              style={{
                padding: '8px 16px',
                fontSize: '0.78rem',
                fontWeight: 700,
                borderRadius: '6px',
                border: activeDeckTab === 'pathology' ? '1px solid #fbbf24' : 'none',
                background: activeDeckTab === 'pathology' ? 'linear-gradient(135deg, #be123c, #b45309)' : 'transparent',
                color: activeDeckTab === 'pathology' ? '#fff' : 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              Diagnostic & AI Notes
            </button>
            <button
              onClick={() => setActiveDeckTab('schedule')}
              className="btn-3d"
              style={{
                padding: '8px 16px',
                fontSize: '0.78rem',
                fontWeight: 700,
                borderRadius: '6px',
                border: activeDeckTab === 'schedule' ? '1px solid #fbbf24' : 'none',
                background: activeDeckTab === 'schedule' ? 'linear-gradient(135deg, #be123c, #b45309)' : 'transparent',
                color: activeDeckTab === 'schedule' ? '#fff' : 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              Upcoming Schedule
            </button>
            <button
              onClick={() => setActiveDeckTab('prescriptions')}
              className="btn-3d"
              style={{
                padding: '8px 16px',
                fontSize: '0.78rem',
                fontWeight: 700,
                borderRadius: '6px',
                border: activeDeckTab === 'prescriptions' ? '1px solid #fbbf24' : 'none',
                background: activeDeckTab === 'prescriptions' ? 'linear-gradient(135deg, #be123c, #b45309)' : 'transparent',
                color: activeDeckTab === 'prescriptions' ? '#fff' : 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              Medicines & Refills
            </button>
          </div>
        </div>

        {/* Tab 1: Diagnostic & AI Notes */}
        {activeDeckTab === 'pathology' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div
              style={{
                padding: '18px',
                background: 'rgba(15, 7, 12, 0.7)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(245, 158, 11, 0.2)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--gold-light)' }}>
                  Full-Field Digital Mammography & CAD
                </span>
                <span className="badge badge-red">BI-RADS 4C</span>
              </div>
              <p style={{ fontSize: '0.82rem', color: '#d8cad1', marginTop: '10px', lineHeight: 1.5 }}>
                Irregular, high-density spicular mass noted in upper outer quadrant of left breast (approx 2.3 cm). Micro-calcifications observed. Core needle biopsy confirmed.
              </p>
              <div style={{ display: 'flex', gap: '10px', marginTop: '14px' }}>
                <button
                  onClick={() => setActiveTab('screening')}
                  className="btn btn-sm btn-outline btn-3d"
                >
                  <Sparkles size={13} />
                  <span>AI Screening Detail</span>
                </button>
                <button
                  onClick={() => setActiveTab('records')}
                  className="btn btn-sm btn-secondary btn-3d"
                >
                  <FileText size={13} />
                  <span>View Full Scan</span>
                </button>
              </div>
            </div>

            <div
              style={{
                padding: '18px',
                background: 'linear-gradient(135deg, rgba(225, 29, 72, 0.12), rgba(245, 158, 11, 0.08))',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(245, 158, 11, 0.3)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={16} color="#34d399" />
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>
                  Doctor Sign-Off & Biopsy Impression
                </span>
              </div>
              <p style={{ fontSize: '0.82rem', color: '#f1e7ec', marginTop: '10px', lineHeight: 1.5 }}>
                {aiResult?.clinicianNotes || 'Histopathology confirms Infiltrating Ductal Carcinoma (Grade II). Tumor Board recommendations: Neoadjuvant Trastuzumab with Docetaxel regimen.'}
              </p>
              <div style={{ marginTop: '14px', fontSize: '0.74rem', color: 'var(--gold-light)' }}>
                Signed by: <strong>Dr. Ananya Sen, MS, MCh (Oncology)</strong> • MCI-74892
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Upcoming Schedule */}
        {activeDeckTab === 'schedule' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            <div
              style={{
                padding: '16px',
                background: 'rgba(15, 7, 12, 0.8)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(245, 158, 11, 0.25)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--gold-light)', fontSize: '0.78rem', fontWeight: 700 }}>
                <Calendar size={14} />
                <span>Tomorrow • 10:30 AM IST</span>
              </div>
              <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#fff', marginTop: '6px' }}>
                Tumor Board Consultation
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                Basavatarakam Cancer Hospital • Room 304
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--gold-light)', marginTop: '8px' }}>
                Physician: Dr. Ananya Sen
              </div>
            </div>

            <div
              style={{
                padding: '16px',
                background: 'rgba(15, 7, 12, 0.8)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(245, 158, 11, 0.25)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--gold-light)', fontSize: '0.78rem', fontWeight: 700 }}>
                <Clock size={14} />
                <span>Friday • 02:00 PM IST</span>
              </div>
              <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#fff', marginTop: '6px' }}>
                Cardiac Echo & Pre-Chemo Workup
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                Basavatarakam Diagnostic Wing
              </div>
              <div style={{ fontSize: '0.72rem', color: '#34d399', marginTop: '8px' }}>
                Status: Verified & Confirmed
              </div>
            </div>

            <div
              style={{
                padding: '16px',
                background: 'rgba(15, 7, 12, 0.8)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(245, 158, 11, 0.25)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--gold-light)', fontSize: '0.78rem', fontWeight: 700 }}>
                <Building2 size={14} />
                <span>Next Week • Monday</span>
              </div>
              <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#fff', marginTop: '6px' }}>
                Cycle 1 Targeted Infusion
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                Day Care Oncology Day Ward
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--gold-light)', marginTop: '8px' }}>
                Medicine: Trastuzumab (Herceptin)
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Medicines & Refills */}
        {activeDeckTab === 'prescriptions' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            <div
              style={{
                padding: '16px',
                background: 'rgba(15, 7, 12, 0.8)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(245, 158, 11, 0.25)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Pill size={16} color="#fbbf24" />
                  <strong style={{ color: '#fff', fontSize: '0.95rem' }}>Trastuzumab (Herceptin 440mg)</strong>
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--gold-light)', marginTop: '2px' }}>
                  Targeted HER2 Monoclonal Antibody • 100% Ayushman Subsidy
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  Stock Verified: Apollo Specialty Pharmacy, Hyderabad
                </div>
              </div>
              <button
                onClick={() => requestMedicineRefill('med-01', 'Hyderabad')}
                className="btn btn-sm btn-primary btn-3d"
              >
                <span>Request Refill</span>
              </button>
            </div>

            <div
              style={{
                padding: '16px',
                background: 'rgba(15, 7, 12, 0.8)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(245, 158, 11, 0.25)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Pill size={16} color="#fb7185" />
                  <strong style={{ color: '#fff', fontSize: '0.95rem' }}>Ondansetron 8mg + Dexamethasone</strong>
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--gold-light)', marginTop: '2px' }}>
                  Supportive Care Pre-Medication • Active Prescription
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  Take 30 mins prior to chemotherapy infusion
                </div>
              </div>
              <span className="badge badge-emerald">Dispensed</span>
            </div>
          </div>
        )}
      </Card3D>
    </div>
  );
};
