import React, { createContext, useContext, useState } from 'react';
import { 
  UserRole, 
  LanguageCode, 
  CancerPathwayId, 
  PatientProfile, 
  JourneyStage, 
  AIScreeningResult, 
  Doctor, 
  MedicalFacility, 
  InternationalCenter, 
  OncologyMedicine, 
  MedicalRecord, 
  OverdueAlert,
  CancerPathway,
  AuthUser
} from '../types';
import { 
  CANCER_PATHWAYS, 
  PRIYA_SHARMA_PROFILE, 
  INITIAL_JOURNEY_STAGES, 
  INITIAL_AI_RESULT,
  MOCK_DOCTORS,
  MOCK_FACILITIES,
  MOCK_INTERNATIONAL_CENTERS,
  MOCK_MEDICINES,
  MOCK_RECORDS,
  MOCK_OVERDUE_ALERTS,
  TRANSLATIONS
} from '../data/mockData';

export interface ToastMessage {
  id: string;
  type: 'success' | 'warning' | 'info' | 'error';
  message: string;
  timestamp: Date;
}

interface AppContextType {
  isAuthenticated: boolean;
  currentUser: AuthUser | null;
  login: (role: UserRole, customUser?: Partial<AuthUser>) => void;
  logout: () => void;

  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  
  patient: PatientProfile;
  setPatient: React.Dispatch<React.SetStateAction<PatientProfile>>;
  
  pathways: CancerPathway[];
  activePathwayId: CancerPathwayId;
  setActivePathwayId: (id: CancerPathwayId) => void;
  activePathway: CancerPathway;
  
  journeyStages: JourneyStage[];
  updateStageStatus: (stageId: number, status: JourneyStage['status'], note?: string) => void;
  
  aiResult: AIScreeningResult | null;
  runAIScreening: (pathwayId: CancerPathwayId, answers: Record<string, boolean>, imageName?: string) => void;
  confirmDoctorReview: (decision: 'confirmed' | 'inconclusive' | 'ruled_out', notes: string) => void;
  
  doctors: Doctor[];
  facilities: MedicalFacility[];
  internationalCenters: InternationalCenter[];
  medicines: OncologyMedicine[];
  records: MedicalRecord[];
  uploadRecord: (newRecord: Omit<MedicalRecord, 'id'>) => void;
  
  overdueAlerts: OverdueAlert[];
  resolveAlert: (alertId: string, reason: string, action: string) => void;
  
  toasts: ToastMessage[];
  addToast: (message: string, type?: ToastMessage['type']) => void;
  removeToast: (id: string) => void;
  
  // Hackathon Guided Scenario
  hackathonStep: number;
  isHackathonDemoActive: boolean;
  setHackathonDemoActive: (active: boolean) => void;
  advanceHackathonStep: () => void;
  resetHackathonDemo: () => void;
  
  // Quick Actions
  bookAppointment: (facilityId: string, serviceName: string, slotTime: string) => void;
  requestMedicineRefill: (medicineId: string, pharmacyCity: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const DEFAULT_USERS: Record<UserRole, AuthUser> = {
  patient: {
    id: 'USR-PAT-001',
    name: 'Priya Sharma',
    role: 'patient',
    email: 'priya.sharma@abdm.gov.in',
    healthIdOrRegNo: '91-4920-1847-2931',
    organization: 'ABDM Ayushman Patient Registry'
  },
  doctor: {
    id: 'USR-DOC-002',
    name: 'Dr. Ananya Sen, MS, MCh',
    role: 'doctor',
    email: 'dr.ananya.sen@basavatarakam.org',
    healthIdOrRegNo: 'MCI-74892-ONCO',
    specialization: 'Surgical Oncology & Breast Disease',
    organization: 'Basavatarakam Cancer Hospital'
  },
  hospital: {
    id: 'USR-HOSP-003',
    name: 'Basavatarakam Cancer Hospital',
    role: 'hospital',
    email: 'operations@basavatarakam.org',
    healthIdOrRegNo: 'NABH-HYD-ONC-04',
    organization: 'Tertiary Comprehensive Oncology Centre'
  },
  admin: {
    id: 'USR-ADM-004',
    name: 'National Oncology Oversight',
    role: 'admin',
    email: 'director@mohfw.gov.in',
    healthIdOrRegNo: 'DIR-MOHFW-2026',
    organization: 'Ministry of Health & Family Welfare'
  }
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<UserRole>('patient');
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(DEFAULT_USERS.patient);
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  const login = (role: UserRole, customUser?: Partial<AuthUser>) => {
    setUserRole(role);
    const base = DEFAULT_USERS[role];
    setCurrentUser(customUser ? { ...base, ...customUser } : base);
    setIsAuthenticated(true);
    setActiveTab('dashboard');
  };

  const logout = () => {
    setIsAuthenticated(false);
  };
  
  const [patient, setPatient] = useState<PatientProfile>(PRIYA_SHARMA_PROFILE);
  const [pathways] = useState<CancerPathway[]>(CANCER_PATHWAYS);
  const [activePathwayId, setActivePathwayId] = useState<CancerPathwayId>('breast');
  
  const [journeyStages, setJourneyStages] = useState<JourneyStage[]>(INITIAL_JOURNEY_STAGES);
  const [aiResult, setAiResult] = useState<AIScreeningResult | null>(INITIAL_AI_RESULT);
  
  const [doctors] = useState<Doctor[]>(MOCK_DOCTORS);
  const [facilities, setFacilities] = useState<MedicalFacility[]>(MOCK_FACILITIES);
  const [internationalCenters] = useState<InternationalCenter[]>(MOCK_INTERNATIONAL_CENTERS);
  const [medicines] = useState<OncologyMedicine[]>(MOCK_MEDICINES);
  const [records, setRecords] = useState<MedicalRecord[]>(MOCK_RECORDS);
  const [overdueAlerts, setOverdueAlerts] = useState<OverdueAlert[]>(MOCK_OVERDUE_ALERTS);
  
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  
  // Hackathon Demonstration Scenario (Prompt Section 22)
  const [hackathonStep, setHackathonStep] = useState<number>(1);
  const [isHackathonDemoActive, setHackathonDemoActive] = useState<boolean>(true);

  const t = (key: string): string => {
    return TRANSLATIONS[language]?.[key] || TRANSLATIONS['en']?.[key] || key;
  };

  const addToast = (message: string, type: ToastMessage['type'] = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type, timestamp: new Date() }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const activePathway = pathways.find((p) => p.id === activePathwayId) || pathways[0];

  const updateStageStatus = (stageId: number, status: JourneyStage['status'], note?: string) => {
    setJourneyStages((prev) => 
      prev.map((stage) => {
        if (stage.id === stageId) {
          return {
            ...stage,
            status,
            completedDate: status === 'completed' ? new Date().toISOString().replace('T', ' ').substring(0, 16) : stage.completedDate,
            escalationLevel: status === 'completed' ? 'none' : stage.escalationLevel,
            delayHours: status === 'completed' ? 0 : stage.delayHours,
            pendingAction: status === 'completed' ? 'Stage completed successfully' : (note || stage.pendingAction)
          };
        }
        return stage;
      })
    );
    addToast(`Journey Stage ${stageId} status updated to: ${status.toUpperCase().replace('_', ' ')}`, 'success');
  };

  const runAIScreening = (pathwayId: CancerPathwayId, answers: Record<string, boolean>, imageName?: string) => {
    const pathway = pathways.find((p) => p.id === pathwayId) || activePathway;
    let totalRiskWeight = 0;
    let maxWeight = 0;
    
    pathway.symptomQuestions.forEach((q) => {
      maxWeight += q.weight;
      if (answers[q.id]) {
        totalRiskWeight += q.weight;
      }
    });

    const calculatedScore = Math.min(95, Math.max(12, Math.round((totalRiskWeight / (maxWeight || 1)) * 100)));
    let tier: AIScreeningResult['riskTier'] = 'low_risk';
    if (calculatedScore >= 75) tier = 'suspicious';
    else if (calculatedScore >= 45) tier = 'moderate_risk';

    const newResult: AIScreeningResult = {
      assessmentId: `AI-ASSESS-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      patientId: patient.id,
      pathwayId,
      assessmentDate: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' IST',
      modelUsed: pathway.aiModel.name,
      modelVersion: pathway.aiModel.version,
      riskScore: calculatedScore,
      riskTier: tier,
      confidencePercentage: Number((85 + Math.random() * 10).toFixed(1)),
      keyFindings: [
        `Risk scoring algorithm calculated composite score: ${calculatedScore}/100 based on verified symptomatology`,
        `Image analysis on ${imageName || 'submitted clinical photography'}: Structural asymmetry and tissue density variance identified`,
        `Recommendation: Clinical review mandated for ${pathway.recommendedSpecialist}`
      ],
      suggestedAction: tier === 'suspicious' 
        ? `HIGH SUSPICION: Expedited in-person specialist review required within 48 hours for ${pathway.recommendedSpecialist}. Diagnostic workup mandatory.`
        : `Routine follow-up indicated with general practitioner or community health post. Repeat screening in 12 months.`,
      limitationsDisclaimer: pathway.aiModel.regulatoryNotice + ' ' + pathway.aiModel.limitations[0],
      imageAnalyzedName: imageName || 'Patient_Uploaded_Diagnostic_Scan.png',
      clinicianReviewStatus: 'pending'
    };

    setAiResult(newResult);
    addToast(`AI Screening completed using ${pathway.aiModel.name}. Risk Score: ${calculatedScore}/100 (${tier})`, 'info');
    
    // Update Stage 3 in journey
    updateStageStatus(3, 'completed', 'AI Assessment generated. Pending clinician review.');
    updateStageStatus(4, 'awaiting_review', 'Forwarded to Dr. Ananya Sen for clinical confirmation.');
  };

  const confirmDoctorReview = (decision: 'confirmed' | 'inconclusive' | 'ruled_out', notes: string) => {
    if (!aiResult) return;
    setAiResult((prev) => prev ? {
      ...prev,
      clinicianReviewStatus: decision,
      clinicianNotes: notes,
      reviewedByDoctor: 'Dr. Ananya Sen, MS, MCh (Surgical Oncology)',
      reviewedDate: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' IST'
    } : null);

    if (decision === 'confirmed') {
      updateStageStatus(4, 'completed', `Confirmed by Dr. Ananya Sen: ${notes}`);
      updateStageStatus(5, 'completed', 'Specialist consultation concluded. Diagnostic tests required.');
      updateStageStatus(6, 'completed', 'Diagnostic requisitions issued.');
      addToast('Clinician review confirmed. Patient referred for targeted diagnostic workup.', 'success');
    } else if (decision === 'ruled_out') {
      updateStageStatus(4, 'completed', `Ruled Out: ${notes}`);
      addToast('Clinician marked finding as non-malignant/benign. Patient scheduled for routine follow-up.', 'info');
    } else {
      updateStageStatus(4, 'in_progress', `Inconclusive finding: Additional multi-slice views ordered.`);
      addToast('Review marked as Inconclusive. Supplemental investigations triggered.', 'warning');
    }
  };

  const uploadRecord = (newRecord: Omit<MedicalRecord, 'id'>) => {
    const record: MedicalRecord = {
      ...newRecord,
      id: `REC-${Math.floor(100 + Math.random() * 900)}`
    };
    setRecords((prev) => [record, ...prev]);
    addToast(`Record "${record.title}" securely uploaded and encrypted in vault.`, 'success');
  };

  const resolveAlert = (alertId: string, reason: string, action: string) => {
    setOverdueAlerts((prev) => 
      prev.map((alert) => {
        if (alert.id === alertId) {
          return {
            ...alert,
            status: 'resolved',
            loggedReason: reason,
            actionTaken: action
          };
        }
        return alert;
      })
    );

    // If resolving stage 9 overdue biopsy alert:
    updateStageStatus(9, 'completed', `Histopathology signed off by Chief Pathologist: IDC Grade II. Delay reason recorded: ${reason}`);
    updateStageStatus(10, 'completed', 'Infiltrating Ductal Carcinoma confirmed. Staging T2N1M0. Forwarded to Tumor Board.');
    addToast(`Alert ${alertId} resolved! Corrective action executed and stage updated.`, 'success');
  };

  const bookAppointment = (facilityId: string, serviceName: string, slotTime: string) => {
    const fac = facilities.find((f) => f.id === facilityId);
    addToast(`Appointment Confirmed at ${fac?.name || 'Medical Center'} for "${serviceName}" on ${slotTime}. Ref #BK-2026-${Math.floor(1000 + Math.random() * 9000)}`, 'success');
  };

  const requestMedicineRefill = (medicineId: string, pharmacyCity: string) => {
    const med = medicines.find((m) => m.id === medicineId);
    addToast(`Refill Request Submitted for ${med?.brandName} (${med?.genericName}) at verified pharmacy in ${pharmacyCity}. Awaiting clinician e-sign.`, 'info');
  };

  // Hackathon Step Progression (Covers prompt section 22)
  const advanceHackathonStep = () => {
    if (hackathonStep < 7) {
      const next = hackathonStep + 1;
      setHackathonStep(next);

      if (next === 2) {
        setUserRole('patient');
        setActiveTab('screening');
        addToast('Step 2: AI Screening Engine evaluates symptom questionnaire & mammography imaging.', 'info');
      } else if (next === 3) {
        setUserRole('doctor');
        setActiveTab('dashboard');
        addToast('Step 3: Doctor reviews AI assessment, examines physical findings, and confirms need for core biopsy.', 'info');
      } else if (next === 4) {
        setUserRole('patient');
        setActiveTab('facilities');
        addToast('Step 4: Facility discovery finds Basavatarakam Cancer Hospital in Hyderabad with verified biopsy slot.', 'info');
      } else if (next === 5) {
        setUserRole('admin');
        setActiveTab('escalations');
        addToast('Step 5: DELAY PREVENTED! SLA Engine detected 51h overdue biopsy report and triggered Level 2 Escalation.', 'warning');
      } else if (next === 6) {
        setUserRole('doctor');
        setActiveTab('records');
        addToast('Step 6: Biopsy confirmed Infiltrating Ductal Carcinoma; Tumor Board outlines Trastuzumab + Chemotherapy.', 'success');
      } else if (next === 7) {
        setUserRole('patient');
        setActiveTab('journey');
        addToast('Step 7: Complete 19-Stage connected journey tracked with medicine subsidies and follow-up surveillance!', 'success');
      }
    }
  };

  const resetHackathonDemo = () => {
    setHackathonStep(1);
    setUserRole('patient');
    setActiveTab('dashboard');
    setJourneyStages(INITIAL_JOURNEY_STAGES);
    setOverdueAlerts(MOCK_OVERDUE_ALERTS);
    addToast('Hackathon Demonstration Scenario Reset to Step 1 (Priya Sharma Baseline).', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        currentUser,
        login,
        logout,
        userRole,
        setUserRole,
        language,
        setLanguage,
        t,
        activeTab,
        setActiveTab,
        patient,
        setPatient,
        pathways,
        activePathwayId,
        setActivePathwayId,
        activePathway,
        journeyStages,
        updateStageStatus,
        aiResult,
        runAIScreening,
        confirmDoctorReview,
        doctors,
        facilities,
        internationalCenters,
        medicines,
        records,
        uploadRecord,
        overdueAlerts,
        resolveAlert,
        toasts,
        addToast,
        removeToast,
        hackathonStep,
        isHackathonDemoActive,
        setHackathonDemoActive,
        advanceHackathonStep,
        resetHackathonDemo,
        bookAppointment,
        requestMedicineRefill
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
