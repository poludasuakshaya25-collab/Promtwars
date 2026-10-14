import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  ArrowRight, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle,
  Stethoscope,
  Building,
  Clock,
  Pill,
  MapPin
} from 'lucide-react';

interface StepDetail {
  step: number;
  title: string;
  role: string;
  summary: string;
  actionText: string;
}

export const HackathonDemoBanner: React.FC = () => {
  const { 
    hackathonStep, 
    advanceHackathonStep, 
    resetHackathonDemo,
    isHackathonDemoActive,
    setHackathonDemoActive
  } = useApp();

  if (!isHackathonDemoActive) return null;

  const steps: StepDetail[] = [
    {
      step: 1,
      title: 'Registration & Screening Form',
      role: 'Patient (Priya Sharma, Hyderabad)',
      summary: 'Patient Priya Sharma registers with ABDM Health ID and completes Breast Pathway symptom assessment.',
      actionText: 'Execute AI Screening Engine'
    },
    {
      step: 2,
      title: 'AI SaMD Screening & Image Analysis',
      role: 'AI Model (BreastCAD-DeepNet v4.2)',
      summary: 'AI algorithms detect BI-RADS 4C suspicious mass (Score: 78/100). Clinician confirmation mandated.',
      actionText: 'Send to Dr. Ananya Sen for Review'
    },
    {
      step: 3,
      title: 'Clinician Confirmation & Biopsy Order',
      role: 'Doctor (Dr. Ananya Sen, Surgical Oncologist)',
      summary: 'Dr. Sen confirms clinical suspicion and orders urgent Core Needle Biopsy + IHC at Basavatarakam.',
      actionText: 'Discover Diagnostic Facilities in India'
    },
    {
      step: 4,
      title: 'Nationwide Availability Search',
      role: 'Patient / Care Navigator',
      summary: 'Platform locates Basavatarakam Cancer Hospital (Hyderabad) with verified biopsy slot under PM-JAY.',
      actionText: 'Trigger SLA Delay Escalation Engine'
    },
    {
      step: 5,
      title: 'Delay Prevention & Smart Escalation',
      role: 'System Administrator / Quality Officer',
      summary: 'CRITICAL ESCALATION: Biopsy delayed 51h (SLA limit 48h). System auto-escalates to Level 2 (Supervising Oncologist).',
      actionText: 'Resolve Escalation & Review Confirmed Pathology'
    },
    {
      step: 6,
      title: 'Diagnostic Confirmation & MDT Board',
      role: 'Multidisciplinary Tumor Board',
      summary: 'Biopsy signed off: IDC Grade II. MDT outlines Neoadjuvant Trastuzumab (Herceptin) regimen.',
      actionText: 'Coordinate Medicine Subsidies & Complete Journey'
    },
    {
      step: 7,
      title: 'Medicine Access & 19-Stage Journey',
      role: 'Patient & Care Team',
      summary: 'Platform verifies Herceptin stock with Ayushman subsidy (PAP 1+1 free) and tracks 19-stage longitudinal care.',
      actionText: 'Scenario Completed (Replay)'
    }
  ];

  const current = steps[hackathonStep - 1] || steps[0];

  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(35, 12, 22, 0.95) 0%, rgba(20, 10, 16, 0.95) 100%)',
      borderBottom: '1px solid rgba(245, 158, 11, 0.35)',
      padding: '12px 24px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
    }}>
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        {/* Step Indicator and Summary */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1, minWidth: '320px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #be123c 0%, #b45309 50%, #f59e0b 100%)',
            color: '#fff',
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '1rem',
            boxShadow: '0 0 16px rgba(245, 158, 11, 0.4)',
            border: '1px solid rgba(254, 240, 138, 0.5)',
            flexShrink: 0
          }}>
            {hackathonStep}
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.92rem', fontWeight: 700, color: '#fff' }}>
                Walkthrough: {current.title}
              </span>
              <span className="badge badge-gold" style={{ fontSize: '0.68rem' }}>
                Role: {current.role}
              </span>
            </div>
            <p style={{ fontSize: '0.78rem', color: '#e5d7df', marginTop: '2px', maxWidth: '820px' }}>
              {current.summary}
            </p>
          </div>
        </div>

        {/* Step Buttons and Progress Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Direct Step Chips */}
          <div style={{ display: 'flex', gap: '4px' }}>
            {steps.map((s) => (
              <div
                key={s.step}
                style={{
                  width: '24px',
                  height: '6px',
                  borderRadius: '3px',
                  background: s.step === hackathonStep 
                    ? '#fbbf24' 
                    : s.step < hackathonStep 
                      ? '#e11d48' 
                      : 'rgba(255, 255, 255, 0.15)',
                  boxShadow: s.step === hackathonStep ? '0 0 8px #fbbf24' : 'none',
                  transition: 'all 0.2s ease'
                }}
                title={`Step ${s.step}: ${s.title}`}
              />
            ))}
          </div>

          {/* Action Trigger with 3D Depth */}
          <button
            onClick={hackathonStep === 7 ? resetHackathonDemo : advanceHackathonStep}
            className="btn btn-sm btn-primary btn-3d"
            style={{
              padding: '8px 16px',
              fontSize: '0.8rem'
            }}
          >
            <span>{hackathonStep === 7 ? 'Replay Demo' : current.actionText}</span>
            {hackathonStep === 7 ? <RotateCcw size={14} /> : <ArrowRight size={14} />}
          </button>

          {/* Reset Demo Button */}
          <button
            onClick={resetHackathonDemo}
            className="btn btn-sm btn-secondary btn-3d"
            style={{ padding: '8px 10px' }}
            title="Reset scenario back to Step 1"
          >
            <RotateCcw size={13} />
          </button>

          <button
            onClick={() => setHackathonDemoActive(false)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              fontSize: '0.8rem',
              padding: '4px'
            }}
            title="Minimize guide banner"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};
