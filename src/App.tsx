import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HackathonDemoBanner } from './components/HackathonDemoBanner';
import { LoginPage } from './components/LoginPage';
import { PatientDashboardView } from './components/PatientDashboardView';
import { DoctorDashboardView } from './components/DoctorDashboardView';
import { HospitalDashboardView } from './components/HospitalDashboardView';
import { AdminDashboardView } from './components/AdminDashboardView';
import { AIScreeningModule } from './components/AIScreeningModule';
import { PatientJourneyView } from './components/PatientJourneyView';
import { FacilityDiscoveryView } from './components/FacilityDiscoveryView';
import { InternationalDiscoveryView } from './components/InternationalDiscoveryView';
import { MedicineAccessView } from './components/MedicineAccessView';
import { RecordsVaultView } from './components/RecordsVaultView';
import { EscalationEngineView } from './components/EscalationEngineView';
import { ToastContainer } from './components/ToastContainer';
import { 
  Activity, 
  Sparkles, 
  Route, 
  Building2, 
  Globe, 
  Pill, 
  FileText, 
  ShieldAlert, 
  ShieldCheck
} from 'lucide-react';

const MainShell: React.FC = () => {
  const { 
    isAuthenticated,
    userRole, 
    activeTab, 
    setActiveTab, 
    t, 
    overdueAlerts 
  } = useApp();

  const activeAlertsCount = overdueAlerts.filter(a => a.status === 'active').length;

  if (!isAuthenticated) {
    return (
      <div className="app-container">
        <LoginPage />
        <ToastContainer />
      </div>
    );
  }

  const tabs = [
    { id: 'dashboard', label: t('dashboard'), icon: <Activity size={16} /> },
    { id: 'screening', label: t('screening'), icon: <Sparkles size={16} /> },
    { id: 'journey', label: t('patientJourney'), icon: <Route size={16} /> },
    { id: 'facilities', label: t('facilities'), icon: <Building2 size={16} /> },
    { id: 'international', label: t('international'), icon: <Globe size={16} /> },
    { id: 'medicines', label: t('medicines'), icon: <Pill size={16} /> },
    { id: 'records', label: t('records'), icon: <FileText size={16} /> },
    { 
      id: 'escalations', 
      label: t('escalations'), 
      icon: <ShieldAlert size={16} />,
      badge: activeAlertsCount > 0 ? `${activeAlertsCount}` : undefined
    }
  ];

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        if (userRole === 'doctor') return <DoctorDashboardView />;
        if (userRole === 'hospital') return <HospitalDashboardView />;
        if (userRole === 'admin') return <AdminDashboardView />;
        return <PatientDashboardView />;
      case 'screening':
        return <AIScreeningModule />;
      case 'journey':
        return <PatientJourneyView />;
      case 'facilities':
        return <FacilityDiscoveryView />;
      case 'international':
        return <InternationalDiscoveryView />;
      case 'medicines':
        return <MedicineAccessView />;
      case 'records':
        return <RecordsVaultView />;
      case 'escalations':
        return <EscalationEngineView />;
      default:
        return <PatientDashboardView />;
    }
  };

  return (
    <div className="app-container">
      <Navbar />
      <HackathonDemoBanner />

      <main className="main-content">
        {/* Navigation Tabs with 3D Depth */}
        <nav className="tab-nav" aria-label="Main Navigation">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`tab-btn btn-3d ${isActive ? 'active' : ''}`}
                id={`nav-tab-${tab.id}`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className="badge badge-red" style={{ padding: '1px 6px', fontSize: '0.65rem' }}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Dynamic Content View */}
        {renderActiveView()}
      </main>

      {/* Trust & Clinical Disclaimer Footer */}
      <footer style={{
        marginTop: 'auto',
        borderTop: '1px solid rgba(245, 158, 11, 0.2)',
        background: 'rgba(10, 5, 8, 0.96)',
        padding: '24px 20px',
        fontSize: '0.75rem',
        color: 'var(--text-muted)'
      }}>
        <div style={{
          maxWidth: '1440px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          textAlign: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
            <Activity size={16} style={{ color: 'var(--gold-light)' }} />
            <strong style={{ color: '#fff' }}>AI CancerConnect Platform</strong> — Ayushman Bharat (ABDM) & FHIR R4 Ready
          </div>

          <p style={{ maxWidth: '960px', margin: '0 auto', lineHeight: 1.5 }}>
            <strong>Clinical Notice:</strong> AI CancerConnect provides AI-assisted decision support and care coordination. All risk scores, imaging markers, and staging are verified by board-certified oncologists.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', color: 'var(--text-secondary)' }}>
            <span>National Cancer Helpline: <strong>1800-22-1951</strong></span>
            <span>Emergency Medical Services: <strong>112 / 108</strong></span>
            <span>Data Security: <strong>AES-256 Encrypted & Consent Governed</strong></span>
          </div>
        </div>
      </footer>

      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainShell />
    </AppProvider>
  );
}
