import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Activity, 
  User, 
  Stethoscope, 
  Building2, 
  ShieldAlert, 
  Globe, 
  Sparkles,
  AlertTriangle,
  LogOut,
  ShieldCheck
} from 'lucide-react';
import { UserRole, LanguageCode } from '../types';

export const Navbar: React.FC = () => {
  const { 
    userRole, 
    setUserRole, 
    currentUser,
    logout,
    language, 
    setLanguage, 
    t, 
    patient, 
    overdueAlerts,
    setActiveTab,
    hackathonStep,
    isHackathonDemoActive,
    setHackathonDemoActive
  } = useApp();

  const activeAlertsCount = overdueAlerts.filter(a => a.status === 'active').length;

  const roles: { id: UserRole; label: string; icon: React.ReactNode }[] = [
    { id: 'patient', label: t('rolePatient'), icon: <User size={14} /> },
    { id: 'doctor', label: t('roleDoctor'), icon: <Stethoscope size={14} /> },
    { id: 'hospital', label: t('roleHospital'), icon: <Building2 size={14} /> },
    { id: 'admin', label: t('roleAdmin'), icon: <ShieldAlert size={14} /> }
  ];

  return (
    <header className="glass-panel" style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      borderBottom: '1px solid var(--border-subtle)',
      borderRadius: 0,
      padding: '12px 24px',
      background: 'rgba(12, 6, 9, 0.94)',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.7)'
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
        {/* Brand & Mission with Red & Gold Glow */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #be123c 0%, #b45309 50%, #f59e0b 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            boxShadow: '0 0 20px rgba(245, 158, 11, 0.4), 0 0 10px rgba(225, 29, 72, 0.4)',
            border: '1px solid rgba(254, 240, 138, 0.5)'
          }}>
            <Activity size={24} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#fff' }}>
                AI Cancer<span className="gradient-text-gold">Connect</span>
              </span>
              <span className="badge badge-gold" style={{ fontSize: '0.65rem' }}>
                SaMD 8-Cancer
              </span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>
              Precision Oncology Care & National Escalation Network
            </p>
          </div>
        </div>

        {/* Right Action Cluster */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          {/* Hackathon Demo Launcher Toggle */}
          <button
            onClick={() => setHackathonDemoActive(!isHackathonDemoActive)}
            className="btn btn-sm btn-3d"
            style={{
              background: isHackathonDemoActive
                ? 'linear-gradient(135deg, #9f1239 0%, #b45309 100%)'
                : 'rgba(25, 12, 18, 0.9)',
              color: '#fff',
              border: isHackathonDemoActive
                ? '1px solid #fbbf24'
                : '1px solid var(--border-subtle)',
              boxShadow: isHackathonDemoActive
                ? '0 0 18px rgba(245, 158, 11, 0.35)'
                : 'none'
            }}
            title="Interactive Demonstration Scenario"
          >
            <Sparkles size={14} color="#fde047" />
            <span>Scenario Flow</span>
            <span style={{
              background: 'rgba(245, 158, 11, 0.25)',
              color: '#fef08a',
              border: '1px solid rgba(245, 158, 11, 0.4)',
              padding: '1px 6px',
              borderRadius: '999px',
              fontSize: '0.7rem'
            }}>
              Step {hackathonStep}/7
            </span>
          </button>

          {/* Active Overdue Alert Counter (Direct Jump to Escalations) */}
          <button
            onClick={() => setActiveTab('escalations')}
            className="btn btn-sm btn-3d"
            style={{
              background: activeAlertsCount > 0 ? 'rgba(225, 29, 72, 0.2)' : 'rgba(20, 10, 16, 0.8)',
              color: activeAlertsCount > 0 ? '#fb7185' : 'var(--text-secondary)',
              border: activeAlertsCount > 0 ? '1px solid rgba(225, 29, 72, 0.5)' : '1px solid var(--border-subtle)',
              boxShadow: activeAlertsCount > 0 ? '0 0 15px rgba(225, 29, 72, 0.3)' : 'none'
            }}
            title="View Delay Prevention & Smart Escalations"
          >
            <span className={activeAlertsCount > 0 ? "pulse-dot pulse-dot-red" : "pulse-dot pulse-dot-green"} />
            <AlertTriangle size={14} />
            <span>{activeAlertsCount} SLA Alert{activeAlertsCount > 1 ? 's' : ''}</span>
          </button>

          {/* Language Switcher */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            background: 'var(--bg-card-subtle)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '2px'
          }}>
            <Globe size={13} style={{ margin: '0 6px', color: 'var(--gold-light)' }} />
            {(['en', 'hi', 'te'] as LanguageCode[]).map((code) => (
              <button
                key={code}
                onClick={() => setLanguage(code)}
                style={{
                  padding: '4px 8px',
                  background: language === code ? 'linear-gradient(135deg, #b45309, #f59e0b)' : 'transparent',
                  color: language === code ? '#fff' : 'var(--text-secondary)',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  textTransform: 'uppercase'
                }}
              >
                {code}
              </button>
            ))}
          </div>

          {/* Role Switcher Pills */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            background: 'var(--bg-card-subtle)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '3px',
            gap: '2px'
          }}>
            {roles.map((r) => {
              const isActive = userRole === r.id;
              return (
                <button
                  key={r.id}
                  onClick={() => setUserRole(r.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    padding: '6px 10px',
                    borderRadius: '6px',
                    border: isActive ? '1px solid rgba(245, 158, 11, 0.5)' : '1px solid transparent',
                    background: isActive ? 'linear-gradient(135deg, rgba(159, 18, 57, 0.45) 0%, rgba(180, 83, 9, 0.45) 100%)' : 'transparent',
                    color: isActive ? '#fef08a' : 'var(--text-muted)',
                    fontSize: '0.75rem',
                    fontWeight: isActive ? 700 : 500,
                    cursor: 'pointer',
                    boxShadow: isActive ? '0 0 12px rgba(245, 158, 11, 0.25)' : 'none',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {r.icon}
                  <span>{r.label}</span>
                </button>
              );
            })}
          </div>

          {/* Active User Identity Pill */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(25, 12, 18, 0.85)',
            border: '1px solid var(--border-subtle)',
            padding: '4px 10px',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.75rem'
          }}>
            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #e11d48, #f59e0b)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '0.7rem',
              color: '#fff'
            }}>
              {currentUser?.name ? currentUser.name.charAt(0) : 'U'}
            </div>
            <div>
              <div style={{ fontWeight: 700, color: '#fff', lineHeight: 1.1 }}>
                {currentUser?.name || patient.name}
              </div>
              <div style={{ fontSize: '0.68rem', color: 'var(--gold-light)' }}>
                {currentUser?.healthIdOrRegNo || 'ABDM Verified'}
              </div>
            </div>
          </div>

          {/* Logout Action */}
          <button
            onClick={logout}
            className="btn btn-sm btn-outline btn-3d"
            style={{
              padding: '6px 10px',
              fontSize: '0.75rem',
              borderColor: 'rgba(225, 29, 72, 0.4)',
              color: '#fb7185'
            }}
            title="Sign out to Login Screen"
          >
            <LogOut size={13} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </header>
  );
};
