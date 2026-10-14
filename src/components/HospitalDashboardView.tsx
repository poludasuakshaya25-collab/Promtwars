import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Building2, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Upload, 
  AlertTriangle, 
  RefreshCw,
  Search,
  Activity,
  Sparkles
} from 'lucide-react';
import { Card3D } from './Card3D';

export const HospitalDashboardView: React.FC = () => {
  const { facilities, patient, updateStageStatus, addToast } = useApp();
  const currentHospital = facilities[0];

  const [slotStatus, setSlotStatus] = useState<string>('Available Today');
  const [dailySlotCapacity, setDailySlotCapacity] = useState<number>(36);
  const [occupiedSlots, setOccupiedSlots] = useState<number>(28);
  const [pathologyTurnaroundDays, setPathologyTurnaroundDays] = useState<number>(2);

  const handleUpdateCapacity = () => {
    addToast('Institutional diagnostic capacity synchronized with National ABDM Gateway.', 'success');
  };

  const handleFastTrackBiopsy = () => {
    updateStageStatus(9, 'completed', 'Pathology Lab expedited core needle biopsy report sign-off.');
    addToast('Biopsy specimen fast-tracked. Preliminary IHC released to surgical oncology.', 'success');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Hospital Identity Header with 3D Depth */}
      <Card3D
        glowColor="gold"
        intensity={6}
        style={{
          background: 'linear-gradient(135deg, rgba(35, 12, 22, 0.95) 0%, rgba(20, 10, 16, 0.95) 100%)',
          border: '1px solid rgba(245, 158, 11, 0.35)',
          padding: '24px',
          boxShadow: 'var(--shadow-3d)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
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
              <Building2 size={28} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2 style={{ fontSize: '1.4rem', color: '#fff', margin: 0 }}>
                  {currentHospital.name}
                </h2>
                <span className="badge badge-gold">NABH Accredited</span>
              </div>
              <p style={{ color: 'var(--gold-light)', fontSize: '0.85rem', marginTop: '3px' }}>
                Department of Radiology, Pathology & Daycare Oncology • ABDM Health Facility
              </p>
            </div>
          </div>

          <div style={{
            background: 'rgba(15, 7, 12, 0.8)',
            padding: '12px 18px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(245, 158, 11, 0.25)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>HFR Registry ID</div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>
              IN-TS-HYD-HFR-9912
            </div>
            <div style={{ fontSize: '0.72rem', color: '#34d399', fontWeight: 600 }}>ABDM Connected</div>
          </div>
        </div>
      </Card3D>

      {/* Grid: Capacity Publisher vs. Incoming Referral Orders */}
      <div className="grid-2">
        {/* Left: Capacity & Slot Publisher */}
        <Card3D glowColor="gold" intensity={8} style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h4 style={{ fontSize: '1.1rem', color: '#fff' }}>
              Diagnostic Capacity & Availability
            </h4>
            <span className="badge badge-gold">Live Slot Sync</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.85rem' }}>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', display: 'block', marginBottom: '6px', fontWeight: 600 }}>
                Public Slot Status on National Platform:
              </label>
              <select
                value={slotStatus}
                onChange={(e) => setSlotStatus(e.target.value)}
                className="form-input"
              >
                <option value="Available Today">Available Today (Walk-in & Digital Triage Open)</option>
                <option value="Next Available: Tomorrow">Next Available: Tomorrow Morning</option>
                <option value="Waitlist 3 Days">Waitlist 3 Days (High Load)</option>
                <option value="Maintenance / Offline">Equipment Recalibration</option>
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', display: 'block', marginBottom: '6px', fontWeight: 600 }}>
                  Total Daily Biopsy Slots:
                </label>
                <input
                  type="number"
                  value={dailySlotCapacity}
                  onChange={(e) => setDailySlotCapacity(Number(e.target.value))}
                  className="form-input"
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', display: 'block', marginBottom: '6px', fontWeight: 600 }}>
                  Occupied / Booked Slots:
                </label>
                <input
                  type="number"
                  value={occupiedSlots}
                  onChange={(e) => setOccupiedSlots(Number(e.target.value))}
                  className="form-input"
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', display: 'block', marginBottom: '6px', fontWeight: 600 }}>
                Pathology Turnaround SLA (Days):
              </label>
              <input
                type="number"
                value={pathologyTurnaroundDays}
                onChange={(e) => setPathologyTurnaroundDays(Number(e.target.value))}
                className="form-input"
              />
            </div>

            <div style={{
              padding: '12px',
              background: 'rgba(245, 158, 11, 0.12)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.78rem',
              color: '#fef08a'
            }}>
              ✓ Available capacity: <strong>{dailySlotCapacity - occupiedSlots} slots remaining</strong> today.
            </div>

            <button
              onClick={handleUpdateCapacity}
              className="btn btn-primary btn-3d"
              style={{ padding: '12px', marginTop: '4px' }}
            >
              <RefreshCw size={15} />
              <span>Broadcast Availability to Platform</span>
            </button>
          </div>
        </Card3D>

        {/* Right: Incoming Diagnostic Orders */}
        <Card3D glowColor="red" intensity={8} style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h4 style={{ fontSize: '1.1rem', color: '#fff' }}>
              Incoming Referrals & Test Requisitions
            </h4>
            <span className="badge badge-red">Lab Queue</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Order 1: Priya Sharma (Overdue!) */}
            <div style={{
              padding: '14px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(225, 29, 72, 0.15)',
              border: '1px solid rgba(225, 29, 72, 0.4)',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#fff' }}>
                  {patient.name} (Age {patient.age}, {patient.city})
                </span>
                <span className="badge badge-red">SLA OVERDUE (51h)</span>
              </div>
              <div style={{ fontSize: '0.78rem', color: '#fecdd3' }}>
                USG Guided Core Biopsy Left Breast + IHC Panel
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                Referred by: Dr. Ananya Sen • Specimen Received: 2026-10-05 10:15
              </div>

              <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                <button
                  onClick={handleFastTrackBiopsy}
                  className="btn btn-sm btn-primary btn-3d"
                  style={{ padding: '7px 14px', fontSize: '0.76rem' }}
                >
                  <CheckCircle2 size={14} />
                  <span>Expedite & Release Signed Histology</span>
                </button>
              </div>
            </div>

            {/* Order 2: Routine CT */}
            <div style={{
              padding: '14px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(15, 7, 12, 0.7)',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#fff' }}>
                  K. Venkat Rao (Age 55)
                </span>
                <span className="badge badge-emerald">On Schedule</span>
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                High-Resolution CT Thorax (LDCT Lung Protocol)
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                Slot: Tomorrow 11:30 AM • PM-JAY Verified
              </div>
            </div>

            {/* Order 3: Colposcopy */}
            <div style={{
              padding: '14px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(15, 7, 12, 0.7)',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#fff' }}>
                  Laxmi Bai (Age 42)
                </span>
                <span className="badge badge-gold">Scheduled</span>
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                Digital Video Colposcopy + Cervical Biopsy
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                Slot: Friday 02:00 PM • Cashless Approved
              </div>
            </div>
          </div>
        </Card3D>
      </div>
    </div>
  );
};
