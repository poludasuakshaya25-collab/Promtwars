export type UserRole = 'patient' | 'doctor' | 'hospital' | 'admin';

export interface AuthUser {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  avatar?: string;
  healthIdOrRegNo: string;
  organization?: string;
  specialization?: string;
}

export type LanguageCode = 'en' | 'hi' | 'te';

export type CancerPathwayId = 
  | 'breast'
  | 'cervical'
  | 'oral'
  | 'lung'
  | 'colorectal'
  | 'prostate'
  | 'skin'
  | 'stomach';

export interface SymptomQuestion {
  id: string;
  text: string;
  type: 'boolean' | 'select' | 'number';
  options?: string[];
  weight: number; // risk contribution
  category: 'symptom' | 'risk_factor' | 'family_history' | 'lifestyle';
}

export interface AIModelSpec {
  modelId: string;
  name: string;
  version: string;
  modality: string; // e.g. "Full-field Digital Mammography & Ultrasound"
  validationDataset: string;
  sensitivity: number;
  specificity: number;
  regulatoryNotice: string;
  limitations: string[];
}

export interface CancerPathway {
  id: CancerPathwayId;
  name: string;
  badge: string;
  tagline: string;
  description: string;
  incidenceIndia: string;
  recommendedSpecialist: string;
  screeningGuidelines: string[];
  diagnosticWorkflow: string[];
  aiModel: AIModelSpec;
  symptomQuestions: SymptomQuestion[];
  sampleImages: {
    id: string;
    label: string;
    description: string;
    caseType: 'normal' | 'suspicious' | 'inconclusive';
    sampleUrl: string;
  }[];
}

export type StageStatus = 
  | 'not_started'
  | 'in_progress'
  | 'waiting_appointment'
  | 'waiting_test'
  | 'waiting_report'
  | 'awaiting_review'
  | 'referral_pending'
  | 'treatment_planning'
  | 'treatment_in_progress'
  | 'followup_due'
  | 'completed'
  | 'cancelled'
  | 'on_hold';

export type EscalationLevel = 'none' | 'warning' | 'escalated_l1' | 'escalated_l2' | 'escalated_l3';

export interface JourneyStage {
  id: number; // 1 to 19
  stageName: string;
  category: 'Screening & AI' | 'Clinical Evaluation' | 'Diagnostic Workup' | 'Multidisciplinary Planning' | 'Active Treatment' | 'Survivorship & Follow-Up';
  status: StageStatus;
  initiatedDate?: string;
  dueDate?: string;
  completedDate?: string;
  responsibleParty: string;
  pendingAction: string;
  delayHours: number;
  slaTargetHours: number;
  escalationLevel: EscalationLevel;
  escalationNotes?: string;
  relatedDocuments?: string[];
  nextRecommendedStep: string;
}

export interface AIScreeningResult {
  assessmentId: string;
  patientId: string;
  pathwayId: CancerPathwayId;
  assessmentDate: string;
  modelUsed: string;
  modelVersion: string;
  riskScore: number; // 0 to 100
  riskTier: 'low_risk' | 'moderate_risk' | 'suspicious' | 'high_risk';
  confidencePercentage: number;
  keyFindings: string[];
  suggestedAction: string;
  limitationsDisclaimer: string;
  imageAnalyzedName?: string;
  clinicianReviewStatus: 'pending' | 'confirmed' | 'inconclusive' | 'ruled_out';
  clinicianNotes?: string;
  reviewedByDoctor?: string;
  reviewedDate?: string;
}

export interface Doctor {
  id: string;
  name: string;
  degrees: string;
  specialty: string;
  subspecialty: string;
  hospitalAffiliation: string;
  city: string;
  state: string;
  experienceYears: number;
  rating: number;
  supportedPathways: CancerPathwayId[];
  consultationModes: ('In-Person' | 'Teleconsultation')[];
  nextAvailableSlot: string;
  feeINR: number;
  languages: string[];
  verified: boolean;
  avatarUrl?: string;
}

export interface MedicalFacility {
  id: string;
  name: string;
  type: 'Comprehensive Cancer Hospital' | 'Diagnostic & Imaging Centre' | 'Specialized Pathology Lab' | 'Radiation Therapy Centre';
  city: string;
  state: string;
  address: string;
  phone: string;
  cancerPathways: CancerPathwayId[];
  servicesOffered: string[];
  accreditation: 'NABH' | 'NABL' | 'JCI' | 'Govt-Recognized' | 'ABDM-Compliant';
  schemeAcceptance: string[]; // e.g. PM-JAY, CGHS, Aarogyasri
  verified: boolean;
  lastVerifiedDate: string;
  nextDiagnosticSlot: string;
  waitingTimeDays: number;
  estimatedCostRange: string;
  liveSlotStatus: 'Available Today' | 'Next Available: Tomorrow' | 'Waitlist 3 Days' | 'Contact Center';
  dataFreshnessTag: string; // e.g. "Updated 45 mins ago via ABDM HFR sync"
}

export interface InternationalCenter {
  id: string;
  name: string;
  country: string;
  city: string;
  specialties: string[];
  advancedTechnologies: string[];
  clinicalTrialsActive: number;
  estConsultationUSD: number;
  estTreatmentRangeUSD: string;
  averageWaitWeeks: number;
  visaAssistanceOffered: boolean;
  languageSupport: string[];
  teleSecondOpinionAvailable: boolean;
  hipaaGdrpCompliant: boolean;
  keyHighlights: string;
}

export interface OncologyMedicine {
  id: string;
  brandName: string;
  genericName: string;
  category: 'Targeted Therapy' | 'Immunotherapy' | 'Chemotherapy' | 'Hormone Therapy' | 'Supportive Care';
  cancerIndication: string;
  dosageStrength: string;
  estBrandPriceINR: number;
  genericEquivalent?: string;
  estGenericPriceINR?: number;
  requiresPrescription: boolean;
  stockAvailability: {
    city: string;
    pharmacy: string;
    inStock: boolean;
    quantity: string;
    verifiedTime: string;
  }[];
  papAssistanceAvailable: boolean;
  papDetails?: string;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  title: string;
  category: 'imaging' | 'pathology' | 'lab_report' | 'prescription' | 'clinical_note' | 'referral';
  date: string;
  author: string;
  institution: string;
  fileSize: string;
  fileType: string;
  summary: string;
  fhirResourceType: string; // e.g. "DiagnosticReport", "Observation"
  isCritical: boolean;
}

export interface OverdueAlert {
  id: string;
  stageId: number;
  patientId: string;
  patientName: string;
  cancerPathway: CancerPathwayId;
  taskTitle: string;
  responsiblePerson: string;
  responsibleRole: string;
  delayHours: number;
  slaMaxHours: number;
  urgency: 'medium' | 'high' | 'critical';
  escalationLevel: EscalationLevel;
  escalatedTo: string;
  status: 'active' | 'acknowledged' | 'resolved';
  loggedReason?: string;
  actionTaken?: string;
}

export interface PatientProfile {
  id: string;
  name: string;
  age: number;
  gender: 'Female' | 'Male' | 'Other';
  phone: string;
  email: string;
  city: string;
  state: string;
  preferredLanguage: LanguageCode;
  emergencyContact: {
    name: string;
    relation: string;
    phone: string;
  };
  bloodGroup: string;
  medicalHistory: string[];
  allergies: string[];
  currentMedicines: string[];
  insuranceProvider: string;
  insuranceId: string;
  abdmAyushmanHealthId: string;
  consentSharingAccepted: boolean;
  activePathwayId: CancerPathwayId;
  currentStageId: number;
}
