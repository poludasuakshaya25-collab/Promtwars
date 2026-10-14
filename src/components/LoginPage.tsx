import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import { 
  Activity, 
  User, 
  Stethoscope, 
  Building2, 
  ShieldAlert, 
  Lock, 
  KeyRound, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck,
  HeartPulse,
  Fingerprint
} from 'lucide-react';
import { Card3D } from './Card3D';

export const LoginPage: React.FC = () => {
  const { login, addToast } = useApp();
  const [selectedRole, setSelectedRole] = useState<UserRole>('patient');
  const [emailOrId, setEmailOrId] = useState<string>('91-4920-1847-2931');
  const [password, setPassword] = useState<string>('••••••••••••');
  const [useOtp, setUseOtp] = useState<boolean>(false);
  const [otpCode, setOtpCode] = useState<string>('849201');
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const roleProfiles = [
    {
      role: 'patient' as UserRole,
      title: 'Patient Portal',
      name: 'Priya Sharma (Age 42)',
      idLabel: 'ABDM Health ID',
      idValue: '91-4920-1847-2931',
      details: 'Stage 9: Core Biopsy • Breast Pathway',
      icon: <User size={20} />,
      badgeColor: 'badge-gold'
    },
    {
      role: 'doctor' as UserRole,
      title: 'Oncologist Portal',
      name: 'Dr. Ananya Sen, MS, MCh',
      idLabel: 'MCI Reg. Number',
      idValue: 'MCI-74892-ONCO',
      details: 'Chief Surgical Oncologist • Tumor Board',
      icon: <Stethoscope size={20} />,
      badgeColor: 'badge-red'
    },
    {
      role: 'hospital' as UserRole,
      title: 'Hospital Operations',
      name: 'Basavatarakam Cancer Hospital',
      idLabel: 'NABH Facility ID',
      idValue: 'NABH-HYD-ONC-04',
      details: 'Oncology Care Operations • 450 Beds',
      icon: <Building2 size={20} />,
      badgeColor: 'badge-gold'
    },
    {
      role: 'admin' as UserRole,
      title: 'Directorate / Admin',
      name: 'National Oncology Oversight',
      idLabel: 'MoHFW Nodal ID',
      idValue: 'DIR-MOHFW-2026',
      details: 'SLA Escalation Engine • National Registry',
      icon: <ShieldAlert size={20} />,
      badgeColor: 'badge-red'
    }
  ];

  const handleQuickLogin = (role: UserRole) => {
    const profile = roleProfiles.find((p) => p.role === role);
    setSelectedRole(role);
    if (profile) {
      setEmailOrId(profile.idValue);
    }
    executeLogin(role);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeLogin(selectedRole);
  };

  const executeLogin = (role: UserRole) => {
    setIsLoading(true);
    setTimeout(() => {
      login(role);
      setIsLoading(false);
      addToast(`Authentication successful! Welcome to AI CancerConnect.`, 'success');
    }, 450);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px',
        position: 'relative',
        background: 'radial-gradient(ellipse 90% 60% at 50% 10%, rgba(225, 29, 72, 0.22), transparent 70%), radial-gradient(circle at 80% 90%, rgba(245, 158, 11, 0.15), transparent 50%), #0a0508'
      }}
    >
      {/* Background Decorative 3D Glow Rings */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(225, 29, 72, 0.15) 0%, transparent 70%)',
          filter: 'blur(40px)',
          pointerEvents: 'none'
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '5%',
          width: '380px',
          height: '380px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.15) 0%, transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none'
        }}
      />

      {/* Brand Header */}
      <div style={{ textAlign: 'center', marginBottom: '28px', zIndex: 2 }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '64px',
            height: '64px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, #be123c 0%, #b45309 50%, #f59e0b 100%)',
            boxShadow: '0 0 35px rgba(245, 158, 11, 0.4), 0 0 20px rgba(225, 29, 72, 0.5)',
            marginBottom: '14px',
            border: '2px solid rgba(254, 240, 138, 0.4)'
          }}
          className="floating-3d"
        >
          <Activity size={36} color="#ffffff" />
        </div>

        <h1
          style={{
            fontSize: '2.4rem',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            marginBottom: '6px'
          }}
        >
          AI Cancer<span className="gradient-text-gold">Connect</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '520px', margin: '0 auto' }}>
          Precision Oncology Care Coordination & National Delay-Prevention Platform
        </p>
      </div>

      {/* Main 3D Login Hub */}
      <div
        style={{
          width: '100%',
          maxWidth: '960px',
          display: 'grid',
          gridTemplateColumns: '1.1fr 0.9fr',
          gap: '24px',
          zIndex: 2
        }}
      >
        {/* Left Column: Quick 1-Click Role Logins */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--gold-light)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Select Role & 1-Click Demo Login
            </span>
            <span className="badge badge-gold" style={{ fontSize: '0.65rem' }}>
              Instant Demo Access
            </span>
          </div>

          {roleProfiles.map((item) => {
            const isSelected = selectedRole === item.role;
            return (
              <Card3D
                key={item.role}
                glowColor={item.role === 'doctor' || item.role === 'admin' ? 'red' : 'gold'}
                intensity={8}
                onClick={() => handleQuickLogin(item.role)}
                style={{
                  padding: '16px 18px',
                  background: isSelected
                    ? 'linear-gradient(135deg, rgba(35, 14, 22, 0.95) 0%, rgba(55, 25, 15, 0.95) 100%)'
                    : 'rgba(20, 10, 16, 0.85)',
                  border: isSelected
                    ? '2px solid #fbbf24'
                    : '1px solid rgba(245, 158, 11, 0.2)',
                  boxShadow: isSelected
                    ? '0 0 25px rgba(245, 158, 11, 0.35)'
                    : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '12px',
                        background: isSelected
                          ? 'linear-gradient(135deg, #e11d48, #f59e0b)'
                          : 'rgba(245, 158, 11, 0.12)',
                        color: isSelected ? '#fff' : 'var(--gold-light)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid rgba(245, 158, 11, 0.3)'
                      }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#fff' }}>
                          {item.title}
                        </span>
                        {isSelected && (
                          <span className="badge badge-gold" style={{ fontSize: '0.6rem', padding: '2px 6px' }}>
                            Selected
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: '0.82rem', color: 'var(--gold-light)', marginTop: '2px' }}>
                        {item.name}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        {item.idLabel}: <strong style={{ color: '#d1c4cb' }}>{item.idValue}</strong>
                      </div>
                    </div>
                  </div>

                  <button
                    className="btn btn-sm btn-primary btn-3d"
                    style={{ padding: '6px 14px', fontSize: '0.75rem', pointerEvents: 'none' }}
                  >
                    <span>Enter</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </Card3D>
            );
          })}
        </div>

        {/* Right Column: Interactive Secure Login Form */}
        <Card3D
          glowColor="both"
          intensity={12}
          style={{
            padding: '28px',
            background: 'linear-gradient(145deg, rgba(22, 11, 18, 0.95) 0%, rgba(32, 14, 22, 0.95) 100%)',
            border: '1px solid rgba(245, 158, 11, 0.4)',
            boxShadow: 'var(--shadow-3d)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'rgba(245, 158, 11, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--gold-light)'
              }}
            >
              <Fingerprint size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', color: '#fff', margin: 0 }}>
                Secure Clinical Sign-In
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>
                Encrypted via ABDM Health ID & National Gateway
              </p>
            </div>
          </div>

          <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Role Tab Selector */}
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                Access Domain
              </label>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '4px',
                  background: 'rgba(10, 5, 8, 0.7)',
                  padding: '4px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                {(['patient', 'doctor', 'hospital', 'admin'] as UserRole[]).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => {
                      setSelectedRole(r);
                      const prof = roleProfiles.find((p) => p.role === r);
                      if (prof) setEmailOrId(prof.idValue);
                    }}
                    style={{
                      padding: '7px 4px',
                      fontSize: '0.72rem',
                      fontWeight: selectedRole === r ? 700 : 500,
                      background: selectedRole === r ? 'linear-gradient(135deg, #be123c, #b45309)' : 'transparent',
                      color: selectedRole === r ? '#fff' : 'var(--text-secondary)',
                      border: 'none',
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      textTransform: 'capitalize',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Identifier Input */}
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                ABDM Health ID / Professional Reg No.
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  className="form-input"
                  value={emailOrId}
                  onChange={(e) => setEmailOrId(e.target.value)}
                  placeholder="e.g. 91-4920-1847-2931 or email"
                  required
                />
                <span style={{ position: 'absolute', right: '12px', top: '12px', color: 'var(--gold-light)' }}>
                  <ShieldCheck size={18} />
                </span>
              </div>
            </div>

            {/* Password or OTP */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                  {useOtp ? '6-Digit ABDM OTP' : 'Password / Pin'}
                </label>
                <button
                  type="button"
                  onClick={() => setUseOtp(!useOtp)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--gold-light)',
                    fontSize: '0.72rem',
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  {useOtp ? 'Use Password instead' : 'Sign in with OTP'}
                </button>
              </div>

              {useOtp ? (
                <input
                  type="text"
                  className="form-input"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  placeholder="Enter 6-digit OTP"
                  maxLength={6}
                  required
                />
              ) : (
                <input
                  type="password"
                  className="form-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                />
              )}
            </div>

            {/* Checkbox */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.78rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{ accentColor: '#fbbf24' }}
                />
                <span>Remember this terminal</span>
              </label>
              <span style={{ color: 'var(--gold-light)', cursor: 'pointer' }}>Help / Support</span>
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary btn-3d"
              style={{
                width: '100%',
                padding: '13px',
                fontSize: '0.95rem',
                marginTop: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              {isLoading ? (
                <span>Authenticating with Gateway...</span>
              ) : (
                <>
                  <KeyRound size={17} />
                  <span>Enter {selectedRole.toUpperCase()} Dashboard</span>
                  <ArrowRight size={17} />
                </>
              )}
            </button>
          </form>

          {/* Security Certifications */}
          <div
            style={{
              marginTop: '20px',
              paddingTop: '16px',
              borderTop: '1px solid rgba(245, 158, 11, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.68rem',
              color: 'var(--text-muted)'
            }}
          >
            <span>🔒 AES-256 Consent Governed</span>
            <span>⭐ FHIR R4 & ABDM Ready</span>
            <span>🛡️ SaMD Class B Aid</span>
          </div>
        </Card3D>
      </div>

      {/* Footer Info */}
      <div style={{ marginTop: '30px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.75rem', zIndex: 2 }}>
        AI CancerConnect National Platform • Emergency: <strong>112 / 108</strong> • Helpline: <strong>1800-22-1951</strong>
      </div>
    </div>
  );
};
