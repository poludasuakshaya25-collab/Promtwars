import { 
  CancerPathway, 
  Doctor, 
  MedicalFacility, 
  InternationalCenter, 
  OncologyMedicine, 
  MedicalRecord, 
  OverdueAlert, 
  PatientProfile, 
  JourneyStage,
  AIScreeningResult
} from '../types';

export const CANCER_PATHWAYS: CancerPathway[] = [
  {
    id: 'breast',
    name: 'Breast Cancer',
    badge: 'High Incidence',
    tagline: 'Early mammographic and clinical evaluation for breast tissue anomalies',
    description: 'The most common cancer among women in India. Early screening via digital mammography, ultrasound, and clinical breast examination substantially improves treatment outcomes.',
    incidenceIndia: '1 in 28 Indian women will develop breast cancer in their lifetime. 50%+ presented at Stage III/IV.',
    recommendedSpecialist: 'Surgical Oncologist / Breast Onco-Surgeon',
    screeningGuidelines: [
      'Women aged 40-74: Biennial screening mammography',
      'Women with high risk / BRCA1/2 mutation: Annual breast MRI + mammography starting at age 30',
      'Monthly breast self-awareness examination for any palpable lump or skin tethering'
    ],
    diagnosticWorkflow: [
      'Bilateral Digital Mammography (MLO & CC views)',
      'High-Resolution Breast Ultrasound (Sonomammogram)',
      'Image-Guided Core Needle Biopsy (CNB) with Histopathology',
      'IHC Profiling (ER, PR, HER2/neu, Ki-67 index)',
      'Bilateral Breast MRI for dense breasts or multicentricity assessment'
    ],
    aiModel: {
      modelId: 'MammoVision-DeepNet-v2.4',
      name: 'MammoVision-DeepNet',
      version: 'v2.4.2 (ResNet-50 + DenseNet Ensemble)',
      modality: 'Full-Field Digital Mammography (FFDM) & Sonomammography',
      validationDataset: 'Curated Indian Multi-Center Dataset (N=14,200 mammograms) + CBIS-DDSM',
      sensitivity: 93.6,
      specificity: 91.2,
      regulatoryNotice: 'Validated in Class II AI SaMD clinical trials. Intended as a Clinical Decision Support System (CDSS) for triage, not primary diagnosis.',
      limitations: [
        'Higher false-positive rates in extremely dense breast parenchyma (ACR Density Category D)',
        'Cannot substitute histopathological biopsy for malignant microcalcification confirmation',
        'Not validated for pediatric or male breast pathology triage'
      ]
    },
    symptomQuestions: [
      { id: 'b_q1', text: 'Have you felt a new, painless lump or thickening in your breast or underarm area?', type: 'boolean', weight: 35, category: 'symptom' },
      { id: 'b_q2', text: 'Have you noticed any nipple discharge (especially spontaneous, clear, or bloody)?', type: 'boolean', weight: 25, category: 'symptom' },
      { id: 'b_q3', text: 'Is there any puckering, dimpling (peau d orange), or redness on the breast skin?', type: 'boolean', weight: 20, category: 'symptom' },
      { id: 'b_q4', text: 'Does any first-degree relative (mother, sister, daughter) have a history of breast or ovarian cancer?', type: 'boolean', weight: 20, category: 'family_history' },
      { id: 'b_q5', text: 'Did you undergo previous chest radiation therapy before age 30?', type: 'boolean', weight: 15, category: 'risk_factor' }
    ],
    sampleImages: [
      {
        id: 'img_b1',
        label: 'Mammogram: Suspicious Spiculated Mass (BI-RADS 4C)',
        description: 'Left upper outer quadrant spiculated density with pleomorphic microcalcifications.',
        caseType: 'suspicious',
        sampleUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'img_b2',
        label: 'Mammogram: Scattered Fibroglandular Tissue (BI-RADS 1)',
        description: 'Bilateral symmetric glandular architecture with no architectural distortion or suspicious clustering.',
        caseType: 'normal',
        sampleUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80'
      }
    ]
  },
  {
    id: 'cervical',
    name: 'Cervical Cancer',
    badge: 'Preventable & Curable',
    tagline: 'High-risk HPV DNA testing, Pap smear, and colposcopy screening',
    description: 'Second most frequent cancer in Indian women. Highly preventable through HPV vaccination and timely detection of pre-cancerous cervical intraepithelial neoplasia (CIN).',
    incidenceIndia: 'Approximately 123,907 new cervical cancer cases diagnosed annually in India (GLOBOCAN).',
    recommendedSpecialist: 'Gynaecologic Oncologist',
    screeningGuidelines: [
      'Women aged 25-65: High-Risk HPV DNA test every 5 years (preferred) or Pap cytology every 3 years',
      'Visual Inspection with Acetic Acid (VIA) in resource-limited primary health centers',
      'Immediate colposcopy if HPV 16/18 positive or cytology shows HSIL/ASC-US'
    ],
    diagnosticWorkflow: [
      'High-Risk HPV DNA PCR Genotyping (Types 16, 18, 31, 33, 45, etc.)',
      'Liquid-Based Cytology (LBC Pap Smear) with Bethesda Classification',
      'Digital Video Colposcopy with Directed Punch Biopsy',
      'Endocervical Curettage (ECC) if squamocolumnar junction is non-visualized',
      'Pelvic MRI with contrast for staging if malignancy confirmed'
    ],
    aiModel: {
      modelId: 'CerviScan-Vision-v1.9',
      name: 'CerviScan-AI',
      version: 'v1.9.4 (Dual-Path Attention Network)',
      modality: 'Digital Colposcopic Imaging & LBC ThinPrep Cytology',
      validationDataset: 'National Cancer Registry Programme (NCRP) verified colposcopy cohort (N=11,800)',
      sensitivity: 94.1,
      specificity: 89.8,
      regulatoryNotice: 'Investigational software for automated acetowhite lesion delineation and vascular pattern grading.',
      limitations: [
        'Inflammatory cervicitis or severe atrophy can cause false-positive acetowhite patterns',
        'Cannot evaluate transformation zones located deeply inside the endocervical canal'
      ]
    },
    symptomQuestions: [
      { id: 'c_q1', text: 'Do you experience unusual vaginal bleeding between menstrual cycles, after intercourse, or post-menopause?', type: 'boolean', weight: 40, category: 'symptom' },
      { id: 'c_q2', text: 'Do you have persistent watery, foul-smelling, or blood-tinged vaginal discharge?', type: 'boolean', weight: 30, category: 'symptom' },
      { id: 'c_q3', text: 'Have you had persistent pelvic or lower back pain during intercourse (dyspareunia)?', type: 'boolean', weight: 20, category: 'symptom' },
      { id: 'c_q4', text: 'Have you ever tested positive for High-Risk Human Papillomavirus (HPV)?', type: 'boolean', weight: 25, category: 'risk_factor' },
      { id: 'c_q5', text: 'Have you gone more than 3 years without a Pap smear or cervical screening?', type: 'boolean', weight: 15, category: 'lifestyle' }
    ],
    sampleImages: [
      {
        id: 'img_c1',
        label: 'Colposcopy: Dense Acetowhite Lesion with Punctation (CIN-3 / HSIL)',
        description: 'Sharp bordered opaque acetowhitening in anterior lip transformation zone with atypical vascular mosaic.',
        caseType: 'suspicious',
        sampleUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'img_c2',
        label: 'Colposcopy: Normal Squamocolumnar Junction (Bethesda NILM)',
        description: 'Smooth, uniform epithelium with negative iodine stain uptake and no atypical vascularization.',
        caseType: 'normal',
        sampleUrl: 'https://images.unsplash.com/photo-1579684453423-f84349ef60b0?auto=format&fit=crop&w=600&q=80'
      }
    ]
  },
  {
    id: 'oral',
    name: 'Oral Cavity Cancer',
    badge: 'High Male Incidence',
    tagline: 'Visual oral examination, autofluorescence, and lesion biopsy triage',
    description: 'Leading cancer among Indian males, heavily associated with chewing tobacco, gutkha, paan with areca nut, and bidi smoking. Early lesion detection saves facial function and life.',
    incidenceIndia: 'Accounts for over 30% of all cancers in Indian men; highest burden globally.',
    recommendedSpecialist: 'Head & Neck Surgical Oncologist',
    screeningGuidelines: [
      'Annual comprehensive visual oral exam for adults with tobacco/areca nut history',
      'Clinical examination of oral mucosa, gingivobuccal sulcus, tongue borders, and floor of mouth',
      'Palpation of bilateral cervical lymph nodes'
    ],
    diagnosticWorkflow: [
      'High-Resolution White-Light Oral Examination & Photographic Documentation',
      'Vital Staining (Toluidine Blue) & Tissue Autofluorescence',
      'Incisional Wedge Biopsy of Ulcerative / Indurated Mucosal Edge',
      'Contrast-Enhanced CT (CECT) of Neck & Mandible for cortical bone erosion',
      'Panoramic Dental Radiograph (OPG) for dentoalveolar involvement'
    ],
    aiModel: {
      modelId: 'OralScope-DeepNet-v3.1',
      name: 'OralScope-DeepNet',
      version: 'v3.1.0 (MobileNetV3 + Vision Transformer)',
      modality: 'Intraoral Smartphone / Dermatoscope Photography',
      validationDataset: 'Multicenter Indian Oral Lesion Repository (N=18,600 annotated images)',
      sensitivity: 92.4,
      specificity: 90.5,
      regulatoryNotice: 'AI triage algorithm for classifying Potentially Malignant Oral Disorders (PMOD). Not diagnostic.',
      limitations: [
        'Cannot differentiate severe chronic traumatic ulcers from early dysplastic erythroplakia without biopsy',
        'Image quality heavily dependent on uniform intraoral illumination and saliva clearance'
      ]
    },
    symptomQuestions: [
      { id: 'o_q1', text: 'Do you have a mouth sore, ulcer, or red/white patch that has not healed for more than 2 weeks?', type: 'boolean', weight: 45, category: 'symptom' },
      { id: 'o_q2', text: 'Do you have difficulty or pain while swallowing, chewing, or moving your tongue/jaw?', type: 'boolean', weight: 30, category: 'symptom' },
      { id: 'o_q3', text: 'Do you have reduced mouth opening (difficulty inserting 3 fingers into mouth)?', type: 'boolean', weight: 35, category: 'symptom' },
      { id: 'o_q4', text: 'Do you currently consume or have a history of chewing tobacco, gutkha, khaini, or areca nut?', type: 'boolean', weight: 40, category: 'lifestyle' },
      { id: 'o_q5', text: 'Have you noticed a painless hard lump in your neck or under your jaw?', type: 'boolean', weight: 25, category: 'symptom' }
    ],
    sampleImages: [
      {
        id: 'img_o1',
        label: 'Intraoral: Non-Healing Ulcer with Rolled Margins (Buccal Mucosa)',
        description: '2.5 cm indurated lesion on left buccal mucosa with central necrotic slough and erythematous halo.',
        caseType: 'suspicious',
        sampleUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'img_o2',
        label: 'Intraoral: Mild Homogeneous Leucoplakia / Normal Mucosa',
        description: 'Smooth mucosal lining without induration, papillary excrescences, or ulceration.',
        caseType: 'normal',
        sampleUrl: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=600&q=80'
      }
    ]
  },
  {
    id: 'lung',
    name: 'Lung Cancer',
    badge: 'Critical Mortality',
    tagline: 'Low-dose computed tomography (LDCT) and biomarker molecular triage',
    description: 'Leading cause of cancer death worldwide and rising sharply in non-smoking Indian populations due to air pollution and biomass exposure, alongside heavy smoking.',
    incidenceIndia: 'Over 70,000 deaths annually in India; 80% diagnosed at advanced non-curable stages.',
    recommendedSpecialist: 'Thoracic Medical / Surgical Oncologist / Pulmonologist',
    screeningGuidelines: [
      'Adults aged 50-80 with a 20+ pack-year smoking history who currently smoke or quit within 15 years: Annual Low-Dose CT (LDCT)',
      'High-risk occupational exposure (silica, asbestos) or severe environmental exposure: Targeted chest imaging'
    ],
    diagnosticWorkflow: [
      'Low-Dose Chest CT (LDCT) with Lung-RADS Classification',
      'PET-CT Whole Body for Metabolic Staging (18F-FDG)',
      'CT-Guided Percutaneous Transthoracic Lung Biopsy or EBUS-TBNA',
      'Next-Generation Molecular Sequencing (EGFR, ALK, ROS1, BRAF, PD-L1 expression)'
    ],
    aiModel: {
      modelId: 'PulmoScan-CT-v2.0',
      name: 'PulmoScan-CT',
      version: 'v2.0.8 (3D UNet + DenseNet Feature Extractor)',
      modality: 'Non-Contrast Low-Dose Volumetric Chest CT (DICOM)',
      validationDataset: 'LIDC-IDRI + Multi-Hospital Indian Pulmonary Cohort (N=8,400 thoracic CT scans)',
      sensitivity: 95.2,
      specificity: 92.1,
      regulatoryNotice: 'Class IIa CADe/CADx software for pulmonary nodule volumetric segmentation and Lung-RADS scoring.',
      limitations: [
        'Post-tuberculosis calcified granulomas can mimic subsolid neoplastic nodules in Indian endemic settings',
        'Sub-centimeter ground glass opacities require 3-6 month interval follow-up scans rather than single-timepoint diagnosis'
      ]
    },
    symptomQuestions: [
      { id: 'l_q1', text: 'Do you have a persistent cough lasting more than 3 weeks that has worsened or changed in nature?', type: 'boolean', weight: 35, category: 'symptom' },
      { id: 'l_q2', text: 'Have you coughed up blood or rust-colored sputum (hemoptysis)?', type: 'boolean', weight: 45, category: 'symptom' },
      { id: 'l_q3', text: 'Are you experiencing unexplained shortness of breath, wheezing, or persistent chest pain?', type: 'boolean', weight: 25, category: 'symptom' },
      { id: 'l_q4', text: 'Do you have a history of smoking cigarettes, bidis, or hookah (pack-years > 10)?', type: 'boolean', weight: 35, category: 'lifestyle' },
      { id: 'l_q5', text: 'Have you had prolonged exposure to indoor biomass smoke (chulha) or occupational dust/asbestos?', type: 'boolean', weight: 20, category: 'risk_factor' }
    ],
    sampleImages: [
      {
        id: 'img_l1',
        label: 'Low-Dose CT: Spiculated Right Upper Lobe Nodule (Lung-RADS 4B)',
        description: '18mm solid nodule with pleural indentation and spiculated margins in right upper lobe.',
        caseType: 'suspicious',
        sampleUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'img_l2',
        label: 'Low-Dose CT: Clear Bilateral Lung Fields (Lung-RADS 1)',
        description: 'Normal bronchovascular markings, sharp costophrenic angles, no focal consolidation.',
        caseType: 'normal',
        sampleUrl: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=600&q=80'
      }
    ]
  },
  {
    id: 'colorectal',
    name: 'Colorectal Cancer',
    badge: 'Rising in Young Adults',
    tagline: 'Fecal Immunochemical Test (FIT), colonoscopy, and polyp risk stratification',
    description: 'Rapidly rising incidence across Indian urban metros linked to dietary shifts, processed foods, and sedentary lifestyle. Early polypectomy halts the adenoma-carcinoma sequence.',
    incidenceIndia: 'Annual incidence increased by 20% over past decade, with notable spike in patients under 50.',
    recommendedSpecialist: 'Surgical / Medical Gastroenterologist & GI Surgical Oncologist',
    screeningGuidelines: [
      'Average-risk adults aged 45-75: Annual Fecal Immunochemical Test (FIT) or colonoscopy every 10 years',
      'Personal/family history of colorectal polyps, IBD, or Lynch Syndrome: Colonoscopy starting at age 40 or 10 years prior to youngest family case'
    ],
    diagnosticWorkflow: [
      'Quantitative Fecal Immunochemical Test (FIT) for occult hemoglobin',
      'High-Definition Optical Colonoscopy with Narrow-Band Imaging (NBI)',
      'Polypectomy with Serial Histopathological Evaluation',
      'Contrast-Enhanced Abdomino-Pelvic CT & Serum Carcinoembryonic Antigen (CEA) biomarker'
    ],
    aiModel: {
      modelId: 'ColoRisk-Predict-v1.5',
      name: 'ColoRisk-Predict',
      version: 'v1.5.3 (Multimodal CNN + Tabular XGBoost)',
      modality: 'Colonoscopy Video Stills & Quantitative FIT Assay + Clinical Parameters',
      validationDataset: 'GI Oncology Registry Consortium (N=9,200 colonoscopies + FIT datasets)',
      sensitivity: 91.8,
      specificity: 93.4,
      regulatoryNotice: 'Clinical decision tool for adenoma detection rate (ADR) enhancement and polyp morphology classification (Paris Classification).',
      limitations: [
        'Quality strictly limited by adequacy of bowel preparation (Boston Bowel Prep Score < 6 invalidates analysis)',
        'Cannot differentiate benign hyperplastic rectal polyps from sessile serrated lesions with 100% specificity'
      ]
    },
    symptomQuestions: [
      { id: 'cr_q1', text: 'Have you noticed bright red or dark blood in your stool or on toilet paper?', type: 'boolean', weight: 40, category: 'symptom' },
      { id: 'cr_q2', text: 'Have you experienced a persistent change in bowel habits (chronic diarrhea or constipation) lasting > 4 weeks?', type: 'boolean', weight: 30, category: 'symptom' },
      { id: 'cr_q3', text: 'Do you suffer from persistent abdominal cramping, gas, fullness, or feeling of incomplete bowel emptying?', type: 'boolean', weight: 20, category: 'symptom' },
      { id: 'cr_q4', text: 'Have you experienced unexplained iron deficiency anemia or unintentional weight loss?', type: 'boolean', weight: 30, category: 'symptom' },
      { id: 'cr_q5', text: 'Does anyone in your family have a history of colorectal cancer or familial adenomatous polyposis?', type: 'boolean', weight: 25, category: 'family_history' }
    ],
    sampleImages: [
      {
        id: 'img_cr1',
        label: 'Colonoscopy: Ulcerating Vegetating Mass (Sigmoid Colon)',
        description: 'Circumferential friable mass causing 60% luminal narrowing with spontaneous contact bleeding.',
        caseType: 'suspicious',
        sampleUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'img_cr2',
        label: 'Colonoscopy: Normal Colonic Mucosa & Vascular Pattern',
        description: 'Clean mucosal lining with clear branching submucosal capillary vessels, no polyps detected.',
        caseType: 'normal',
        sampleUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80'
      }
    ]
  },
  {
    id: 'prostate',
    name: 'Prostate Cancer',
    badge: 'Elderly Male Burden',
    tagline: 'Serum PSA dynamics, Digital Rectal Exam (DRE), and multiparametric MRI',
    description: 'Second most diagnosed cancer in men globally. Typically slow-growing, but aggressive variants require rapid intervention before bone metastasis occurs.',
    incidenceIndia: 'Incidence has tripled in urban Indian men aged 65+ over the last 15 years.',
    recommendedSpecialist: 'Urologic Oncologist / Urologist',
    screeningGuidelines: [
      'Men aged 50-70 with life expectancy > 10 years: Shared decision-making on Serum PSA testing',
      'Men with positive family history (father/brother) or BRCA mutations: Screening discussions starting at age 45',
      'Baseline PSA > 1.5 ng/mL warrants closer monitoring; PSA > 4.0 ng/mL warrants mpMRI & DRE'
    ],
    diagnosticWorkflow: [
      'Serum Total & Free Prostate-Specific Antigen (PSA) with PSA density calculation',
      'Multiparametric Prostate MRI (mpMRI 3-Tesla) with PI-RADS v2.1 scoring',
      'Transrectal or Transperineal MRI-Ultrasound Fusion Targeted Biopsy',
      'Histopathological Grading using Gleason Score & ISUP Grade Groups (1 to 5)',
      '68Ga-PSMA PET-CT for systemic metastasis evaluation'
    ],
    aiModel: {
      modelId: 'ProstaMetrics-AI-v2.2',
      name: 'ProstaMetrics-AI',
      version: 'v2.2.1 (Multi-Sequence 3D Diffusion CNN)',
      modality: 'Prostate mpMRI (T2-weighted, DWI/ADC map, DCE sequences)',
      validationDataset: 'ProstateX Challenge + Indian Urologic Oncology Collaborative (N=6,100 patients)',
      sensitivity: 93.0,
      specificity: 88.5,
      regulatoryNotice: 'Assists radiologists in PI-RADS score calculation and automated lesion contouring for fusion biopsy targeting.',
      limitations: [
        'Acute or chronic prostatitis and benign prostatic hyperplasia (BPH) can cause elevated PSA and transient MRI signal abnormalities',
        'Cannot replace tissue biopsy for definitive Gleason grading'
      ]
    },
    symptomQuestions: [
      { id: 'p_q1', text: 'Do you have difficulty starting urination or a weak/interrupted urinary stream?', type: 'boolean', weight: 25, category: 'symptom' },
      { id: 'p_q2', text: 'Do you wake up multiple times at night to urinate (nocturia > 2-3 times)?', type: 'boolean', weight: 20, category: 'symptom' },
      { id: 'p_q3', text: 'Have you observed blood in your urine (hematuria) or semen?', type: 'boolean', weight: 40, category: 'symptom' },
      { id: 'p_q4', text: 'Do you experience persistent pain or stiffness in your lower back, hips, or upper thighs?', type: 'boolean', weight: 30, category: 'symptom' },
      { id: 'p_q5', text: 'Has your doctor previously mentioned an elevated PSA level or enlarged prostate?', type: 'boolean', weight: 35, category: 'risk_factor' }
    ],
    sampleImages: [
      {
        id: 'img_p1',
        label: 'mpMRI: Peripheral Zone Hypointense Lesion (PI-RADS 5)',
        description: '1.4 cm markedly restricted diffusion nodule in right posterior peripheral zone with early dynamic contrast wash-in.',
        caseType: 'suspicious',
        sampleUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'img_p2',
        label: 'mpMRI: Symmetrical Transition Zone Hyperplasia (PI-RADS 2)',
        description: 'Encapsulated BPH stromal nodules with intact prostatic capsule and homogeneous peripheral zone signal.',
        caseType: 'normal',
        sampleUrl: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=600&q=80'
      }
    ]
  },
  {
    id: 'skin',
    name: 'Skin Cancer (Melanoma & NMSC)',
    badge: 'Visual Triage',
    tagline: 'Dermoscopic ABCDE feature recognition and lesion margin mapping',
    description: 'Includes malignant melanoma, basal cell carcinoma (BCC), and squamous cell carcinoma (SCC). Early detection through dermoscopy avoids destructive wide surgical excisions.',
    incidenceIndia: 'Lower incidence of cutaneous melanoma due to melanin protection, but acral lentiginous melanoma (palms/soles) often detected late.',
    recommendedSpecialist: 'Dermatologist / Dermato-Oncologist / Plastic Onco-Surgeon',
    screeningGuidelines: [
      'Annual full-body skin examination for individuals with high mole count (>50), dysplastic nevi, or immunosuppression',
      'Self-skin examination following the ABCDE criteria (Asymmetry, Border, Color, Diameter > 6mm, Evolving)'
    ],
    diagnosticWorkflow: [
      'Polarized & Non-Polarized Epiluminescence Dermoscopy',
      'Digital Dermoscopy Serial Monitoring (Mole Mapping)',
      'Excisional Skin Punch or Elliptical Biopsy with 2mm margins (avoid shave biopsy for suspected melanoma)',
      'Histopathological Measurement of Breslow Thickness and Mitotic Rate',
      'Sentinel Lymph Node Biopsy (SLNB) for intermediate/thick melanomas (> 0.8mm)'
    ],
    aiModel: {
      modelId: 'DermaDetect-ResNet-v4.0',
      name: 'DermaDetect-ResNet',
      version: 'v4.0.2 (EfficientNet-B6 + Dermoscopic Feature Fusion)',
      modality: 'High-Resolution Polarized Contact Dermoscopy & Macroscopic Clinical Photos',
      validationDataset: 'ISIC Archive + South Asian Fitzpatrick Phototype IV-VI Dermoscopy Cohort (N=16,400)',
      sensitivity: 94.8,
      specificity: 90.1,
      regulatoryNotice: 'Triage classifier for pig-mented skin lesions to prioritize rapid specialist in-person review.',
      limitations: [
        'Reduced diagnostic accuracy on subungual (under nail bed) and mucosal pigmentary lesions',
        'Cannot replace histological examination for determining tumor invasion depth'
      ]
    },
    symptomQuestions: [
      { id: 's_q1', text: 'Do you have a mole or dark spot that is changing in size, shape, color, or height (Evolving)?', type: 'boolean', weight: 45, category: 'symptom' },
      { id: 's_q2', text: 'Does the lesion have irregular, scalloped, or notched borders with asymmetric halves?', type: 'boolean', weight: 35, category: 'symptom' },
      { id: 's_q3', text: 'Does the mole contain varying shades of tan, brown, black, white, red, or blue?', type: 'boolean', weight: 30, category: 'symptom' },
      { id: 's_q4', text: 'Do you have a non-healing sore, pearl-like bump, or ulcer on sun-exposed skin that bleeds or oozes?', type: 'boolean', weight: 30, category: 'symptom' },
      { id: 's_q5', text: 'Have you had significant history of sunburns or outdoor occupational sun exposure without protection?', type: 'boolean', weight: 15, category: 'lifestyle' }
    ],
    sampleImages: [
      {
        id: 'img_s1',
        label: 'Dermoscopy: Atypical Pigment Network with Blue-White Veil (Melanoma)',
        description: 'Asymmetric multi-component lesion with pseudopods, irregular dots, and regression structures.',
        caseType: 'suspicious',
        sampleUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'img_s2',
        label: 'Dermoscopy: Benign Compound Melanocytic Nevus',
        description: 'Symmetric globular pigment pattern with uniform light brown coloration and regular peripheral margin.',
        caseType: 'normal',
        sampleUrl: 'https://images.unsplash.com/photo-1579684453423-f84349ef60b0?auto=format&fit=crop&w=600&q=80'
      }
    ]
  },
  {
    id: 'stomach',
    name: 'Stomach (Gastric) Cancer',
    badge: 'High Regional Burden',
    tagline: 'Endoscopy, Helicobacter pylori testing, and gastric mucosa assessment',
    description: 'High prevalence in southern and northeastern Indian states linked to smoked meats, high salt intake, and chronic H. pylori gastritis. Often mistaken for simple acid peptic disease.',
    incidenceIndia: 'Fourth most common cancer in India; high mortality due to late presentation with dyspepsia symptoms.',
    recommendedSpecialist: 'Gastroenterologist & Gastrointestinal Surgical Oncologist',
    screeningGuidelines: [
      'Adults over 45 with persistent dyspepsia or family history in high-prevalence geographic zones: Upper GI endoscopy',
      'Eradication screening for Helicobacter pylori in patients with chronic atrophic gastritis'
    ],
    diagnosticWorkflow: [
      'Upper Gastrointestinal Endoscopy (Esophagogastroduodenoscopy - EGD)',
      'Multiple Targeted Gastric Mucosal Biopsies (minimum 6-8 biopsy bites)',
      'Helicobacter pylori Rapid Urease Test (RUT) / Stool Antigen Test',
      'Endoscopic Ultrasound (EUS) for depth of wall invasion (T-staging)',
      'Contrast-Enhanced CT (CECT) of Abdomen & Pelvis with water distension'
    ],
    aiModel: {
      modelId: 'GastroVision-AI-v1.8',
      name: 'GastroVision-AI',
      version: 'v1.8.6 (Real-Time Attention-YOLOv8 + ResNeSt)',
      modality: 'White-Light Endoscopy & Linked Color Imaging (LCI) Video Stills',
      validationDataset: 'Consortium of Indian Digestive Disease Centers (N=7,900 endoscopic sessions)',
      sensitivity: 93.4,
      specificity: 91.0,
      regulatoryNotice: 'Computer-assisted detection (CADe) tool for identifying early gastric mucosal irregularities and intestinal metaplasia.',
      limitations: [
        'Mucus, bile pooling, or inadequate luminal insufflation significantly degrades AI detection accuracy',
        'Requires certified endoscopic histopathology confirmation before any therapeutic decision'
      ]
    },
    symptomQuestions: [
      { id: 'st_q1', text: 'Do you have persistent, severe indigestion or burning epigastric stomach pain that fails to respond to antacids?', type: 'boolean', weight: 35, category: 'symptom' },
      { id: 'st_q2', text: 'Do you feel early satiety (feeling full after eating only a small amount of food)?', type: 'boolean', weight: 40, category: 'symptom' },
      { id: 'st_q3', text: 'Have you experienced persistent nausea, vomiting, or vomiting blood (coffee-ground emesis)?', type: 'boolean', weight: 40, category: 'symptom' },
      { id: 'st_q4', text: 'Have you noticed black, tarry stools (melena) or unexplained significant weight loss?', type: 'boolean', weight: 35, category: 'symptom' },
      { id: 'st_q5', text: 'Do you have a history of chronic H. pylori infection or frequent consumption of heavily salted/preserved foods?', type: 'boolean', weight: 20, category: 'lifestyle' }
    ],
    sampleImages: [
      {
        id: 'img_st1',
        label: 'Endoscopy: Depressed Ulcerated Gastric Antral Lesion (Borrmann Type III)',
        description: 'Irregular ulcer with raised, rigid nodular margins and loss of surrounding mucosal folds.',
        caseType: 'suspicious',
        sampleUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'img_st2',
        label: 'Endoscopy: Normal Gastric Body & Fundic Rugae',
        description: 'Uniform pink gastric mucosa with distensible gastric folds and absence of focal ulceration or mucosal depression.',
        caseType: 'normal',
        sampleUrl: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=600&q=80'
      }
    ]
  }
];

export const PRIYA_SHARMA_PROFILE: PatientProfile = {
  id: 'PT-IN-2026-8842',
  name: 'Priya Sharma',
  age: 48,
  gender: 'Female',
  phone: '+91 98490 12345',
  email: 'priya.sharma.hyd@example.com',
  city: 'Hyderabad',
  state: 'Telangana',
  preferredLanguage: 'en',
  emergencyContact: {
    name: 'Vikram Sharma',
    relation: 'Spouse',
    phone: '+91 98490 67890'
  },
  bloodGroup: 'B Positive',
  medicalHistory: ['Mild Hypertension (controlled on Telmisartan 40mg)', 'No history of diabetes or coronary artery disease'],
  allergies: ['Penicillin (mild cutaneous rash)'],
  currentMedicines: ['Tab. Telmisartan 40mg OD', 'Tab. Calcium + Vitamin D3 OD'],
  insuranceProvider: 'Star Health Premier Medi-Classic & PM-JAY Ayushman Bharat Eligible',
  insuranceId: 'SH-IND-HYD-993821',
  abdmAyushmanHealthId: '91-4920-8842-1029@abdm',
  consentSharingAccepted: true,
  activePathwayId: 'breast',
  currentStageId: 9 // Stage 9: Report Availability (Triggering Overdue SLA escalation!)
};

export const INITIAL_JOURNEY_STAGES: JourneyStage[] = [
  {
    id: 1,
    stageName: 'Patient Registration & Profile Creation',
    category: 'Screening & AI',
    status: 'completed',
    initiatedDate: '2026-10-01 09:30',
    dueDate: '2026-10-01 10:30',
    completedDate: '2026-10-01 09:45',
    responsibleParty: 'Priya Sharma (Self) / Front Desk Coordinator',
    pendingAction: 'Completed',
    delayHours: 0,
    slaTargetHours: 2,
    escalationLevel: 'none',
    relatedDocuments: ['Patient Consent Form (ABDM-HFR-Signed)'],
    nextRecommendedStep: 'Proceed to Cancer Pathway Symptom & Risk Questionnaire'
  },
  {
    id: 2,
    stageName: 'Initial Screening & Symptom Questionnaire',
    category: 'Screening & AI',
    status: 'completed',
    initiatedDate: '2026-10-01 10:00',
    dueDate: '2026-10-01 12:00',
    completedDate: '2026-10-01 10:25',
    responsibleParty: 'Priya Sharma (Self) & Community Health Officer',
    pendingAction: 'Completed',
    delayHours: 0,
    slaTargetHours: 4,
    escalationLevel: 'none',
    relatedDocuments: ['Breast Symptom Scorecard (Risk Tier: Moderate-High)'],
    nextRecommendedStep: 'Input Mammogram / Ultrasound to AI Triage System'
  },
  {
    id: 3,
    stageName: 'AI-Assisted Assessment & SaMD Triage',
    category: 'Screening & AI',
    status: 'completed',
    initiatedDate: '2026-10-01 10:30',
    dueDate: '2026-10-01 11:30',
    completedDate: '2026-10-01 10:38',
    responsibleParty: 'MammoVision-DeepNet v2.4 AI Engine',
    pendingAction: 'Completed',
    delayHours: 0,
    slaTargetHours: 1,
    escalationLevel: 'none',
    relatedDocuments: ['AI SaMD Triage Report #MV-2026-8842 (BI-RADS 4C, 88.4% Confidence)'],
    nextRecommendedStep: 'Mandatory Clinical Review by Qualified Breast Surgical Oncologist'
  },
  {
    id: 4,
    stageName: 'Clinical Review & Primary Triage',
    category: 'Clinical Evaluation',
    status: 'completed',
    initiatedDate: '2026-10-01 11:00',
    dueDate: '2026-10-02 11:00',
    completedDate: '2026-10-01 16:15',
    responsibleParty: 'Dr. Ananya Sen, MS, MCh (Surgical Oncology)',
    pendingAction: 'Completed',
    delayHours: 0,
    slaTargetHours: 24,
    escalationLevel: 'none',
    relatedDocuments: ['Clinical Evaluation Note: Palpable 2.2cm firm mass in left upper outer quadrant'],
    nextRecommendedStep: 'Book Specialist Consultation & Diagnostic Imaging Workup'
  },
  {
    id: 5,
    stageName: 'Specialist In-Person Consultation',
    category: 'Clinical Evaluation',
    status: 'completed',
    initiatedDate: '2026-10-02 09:00',
    dueDate: '2026-10-03 17:00',
    completedDate: '2026-10-03 11:30',
    responsibleParty: 'Dr. Ananya Sen, Basavatarakam Indo-American Cancer Hospital',
    pendingAction: 'Completed',
    delayHours: 0,
    slaTargetHours: 48,
    escalationLevel: 'none',
    relatedDocuments: ['Specialist Outpatient Consultation Record #OPD-2918'],
    nextRecommendedStep: 'Issue Diagnostic Order for Ultrasound-Guided Core Needle Biopsy'
  },
  {
    id: 6,
    stageName: 'Diagnostic Test Requisition & Ordering',
    category: 'Diagnostic Workup',
    status: 'completed',
    initiatedDate: '2026-10-03 12:00',
    dueDate: '2026-10-03 14:00',
    completedDate: '2026-10-03 12:45',
    responsibleParty: 'Dr. Ananya Sen / Clinical Care Coordinator',
    pendingAction: 'Completed',
    delayHours: 0,
    slaTargetHours: 4,
    escalationLevel: 'none',
    relatedDocuments: ['Investigation Order: USG-Guided Core Needle Biopsy Left Breast + IHC'],
    nextRecommendedStep: 'Schedule Biopsy Slot at Accredited Diagnostic Center'
  },
  {
    id: 7,
    stageName: 'Test Scheduling & Facility Allocation',
    category: 'Diagnostic Workup',
    status: 'completed',
    initiatedDate: '2026-10-03 13:00',
    dueDate: '2026-10-04 13:00',
    completedDate: '2026-10-03 15:20',
    responsibleParty: 'Department of Radiology, Basavatarakam Cancer Hospital',
    pendingAction: 'Completed',
    delayHours: 0,
    slaTargetHours: 24,
    escalationLevel: 'none',
    relatedDocuments: ['Diagnostic Appointment Slip #APP-BIOPSY-992'],
    nextRecommendedStep: 'Patient Undergoes Biopsy Procedure'
  },
  {
    id: 8,
    stageName: 'Test Execution & Specimen Processing',
    category: 'Diagnostic Workup',
    status: 'completed',
    initiatedDate: '2026-10-05 09:00',
    dueDate: '2026-10-05 12:00',
    completedDate: '2026-10-05 10:15',
    responsibleParty: 'Dr. K. Srinivas (Interventional Radiologist) & Lab Tech S. Rao',
    pendingAction: 'Completed',
    delayHours: 0,
    slaTargetHours: 6,
    escalationLevel: 'none',
    relatedDocuments: ['Biopsy Procedure Note: 4 core tissue cylinders obtained without complication'],
    nextRecommendedStep: 'Histopathology & IHC Processing (SLA Target: 48 Hours)'
  },
  {
    id: 9,
    stageName: 'Diagnostic Report Availability & Lab Verification',
    category: 'Diagnostic Workup',
    status: 'waiting_report',
    initiatedDate: '2026-10-05 10:30',
    dueDate: '2026-10-07 10:30',
    completedDate: undefined,
    responsibleParty: 'Dr. V. Ramanathan (Chief Histopathologist, Central Pathology Lab)',
    pendingAction: 'OVERDUE: Biopsy Histopathology & IHC Report pending sign-off (Overdue by 51 Hours)',
    delayHours: 51,
    slaTargetHours: 48,
    escalationLevel: 'escalated_l2',
    escalationNotes: 'System Escalation Engine triggered Level 2 Alert: Overdue biopsy report exceeds 48h SLA threshold. Care Coordinator and Supervising Oncologist notified. Corrective sign-off requested.',
    relatedDocuments: ['Draft Histopathology Slide Preview (Awaiting Final Pathologist Digital Signature)'],
    nextRecommendedStep: 'Immediate Lab Verification & Pathologist Electronic Sign-Off'
  },
  {
    id: 10,
    stageName: 'Clinical Diagnostic Confirmation',
    category: 'Clinical Evaluation',
    status: 'awaiting_review',
    initiatedDate: '2026-10-07 11:00',
    dueDate: '2026-10-08 17:00',
    completedDate: undefined,
    responsibleParty: 'Dr. Ananya Sen (Treating Oncologist)',
    pendingAction: 'Awaiting signed histopathology report to confirm Infiltrating Ductal Carcinoma (IDC) Grade II',
    delayHours: 24,
    slaTargetHours: 24,
    escalationLevel: 'warning',
    relatedDocuments: [],
    nextRecommendedStep: 'Review Confirmed Pathology and Stage Disease (T2N1M0, Stage IIB)'
  },
  {
    id: 11,
    stageName: 'Additional Staging Investigations (PET-CT)',
    category: 'Diagnostic Workup',
    status: 'waiting_test',
    initiatedDate: '2026-10-08 09:00',
    dueDate: '2026-10-10 17:00',
    completedDate: undefined,
    responsibleParty: 'Nuclear Medicine Department, Apollo Cancer Center',
    pendingAction: 'Whole-Body 18F-FDG PET-CT scan scheduled for distant metastasis clearance',
    delayHours: 0,
    slaTargetHours: 72,
    escalationLevel: 'none',
    relatedDocuments: ['PET-CT Requisition #NUC-8841'],
    nextRecommendedStep: 'Complete PET-CT and Submit to Tumor Board'
  },
  {
    id: 12,
    stageName: 'Multidisciplinary Tumor Board (MDT) Review',
    category: 'Multidisciplinary Planning',
    status: 'treatment_planning',
    initiatedDate: '2026-10-09 14:00',
    dueDate: '2026-10-12 17:00',
    completedDate: undefined,
    responsibleParty: 'MDT Panel: Surgical, Medical, Radiation Oncologists & Radiologist',
    pendingAction: 'Scheduled for Thursday Tumor Board Conference (Case #8842)',
    delayHours: 0,
    slaTargetHours: 72,
    escalationLevel: 'none',
    relatedDocuments: ['Draft MDT Case Presentation Dossier'],
    nextRecommendedStep: 'Consensus on Neoadjuvant Chemotherapy vs. Upfront Breast Conservation Surgery'
  },
  {
    id: 13,
    stageName: 'Comprehensive Treatment Plan Formulation',
    category: 'Multidisciplinary Planning',
    status: 'not_started',
    initiatedDate: undefined,
    dueDate: '2026-10-14 17:00',
    completedDate: undefined,
    responsibleParty: 'Medical Oncology Team / Dr. Rajesh M., MD, DM',
    pendingAction: 'Pending MDT Consensus: AC-T Regimen (Doxorubicin, Cyclophosphamide followed by Paclitaxel) + Trastuzumab (if HER2+)',
    delayHours: 0,
    slaTargetHours: 48,
    escalationLevel: 'none',
    relatedDocuments: [],
    nextRecommendedStep: 'Counsel Patient on Treatment Protocol and Obtain Informed Consent'
  },
  {
    id: 14,
    stageName: 'Treatment Scheduling & Bed/Daycare Allocation',
    category: 'Active Treatment',
    status: 'not_started',
    initiatedDate: undefined,
    dueDate: '2026-10-16 12:00',
    completedDate: undefined,
    responsibleParty: 'Chemotherapy Daycare Unit, Basavatarakam Cancer Center',
    pendingAction: 'Pending treatment plan approval',
    delayHours: 0,
    slaTargetHours: 48,
    escalationLevel: 'none',
    relatedDocuments: [],
    nextRecommendedStep: 'Reserve Daycare Chemotherapy Chair & Chemoport Placement'
  },
  {
    id: 15,
    stageName: 'Treatment Initiation (Cycle 1 Chemotherapy)',
    category: 'Active Treatment',
    status: 'not_started',
    initiatedDate: undefined,
    dueDate: '2026-10-18 09:00',
    completedDate: undefined,
    responsibleParty: 'Medical Oncology Nursing Staff & Dr. Rajesh M.',
    pendingAction: 'Pre-chemo blood counts, echocardiography / MUGA scan, and antiemetic infusion',
    delayHours: 0,
    slaTargetHours: 96,
    escalationLevel: 'none',
    relatedDocuments: [],
    nextRecommendedStep: 'Execute Cycle 1 Infusion & Monitor Adverse Events'
  },
  {
    id: 16,
    stageName: 'Treatment Progress & Response Monitoring',
    category: 'Active Treatment',
    status: 'not_started',
    initiatedDate: undefined,
    dueDate: '2026-11-15 17:00',
    completedDate: undefined,
    responsibleParty: 'Clinical Onco-Navigator & Treating Team',
    pendingAction: 'Mid-treatment ultrasound response evaluation after Cycle 3',
    delayHours: 0,
    slaTargetHours: 720,
    escalationLevel: 'none',
    relatedDocuments: [],
    nextRecommendedStep: 'Assess Tumor Shrinkage & Toxicities (CTCAE Grading)'
  },
  {
    id: 17,
    stageName: 'Medicine & Supportive Care Coordination',
    category: 'Active Treatment',
    status: 'not_started',
    initiatedDate: undefined,
    dueDate: '2026-10-18 17:00',
    completedDate: undefined,
    responsibleParty: 'Hospital Oncology Pharmacy & Patient Assistance Coordinator',
    pendingAction: 'Verify subsidized Trastuzumab access via National PAP Scheme & G-CSF procurement',
    delayHours: 0,
    slaTargetHours: 24,
    escalationLevel: 'none',
    relatedDocuments: [],
    nextRecommendedStep: 'Ensure uninterrupted drug supply across 12 cycles'
  },
  {
    id: 18,
    stageName: 'Post-Treatment Follow-Up Consultations',
    category: 'Survivorship & Follow-Up',
    status: 'not_started',
    initiatedDate: undefined,
    dueDate: '2027-04-15 11:00',
    completedDate: undefined,
    responsibleParty: 'Breast Surgical & Medical Oncology Clinics',
    pendingAction: 'Three-monthly clinical breast check and CBC/LFT profile',
    delayHours: 0,
    slaTargetHours: 2160,
    escalationLevel: 'none',
    relatedDocuments: [],
    nextRecommendedStep: 'Assess disease-free status and lymphedema prevention'
  },
  {
    id: 19,
    stageName: 'Long-Term Surveillance & Survivorship Care Plan',
    category: 'Survivorship & Follow-Up',
    status: 'not_started',
    initiatedDate: undefined,
    dueDate: '2027-10-15 11:00',
    completedDate: undefined,
    responsibleParty: 'Cancer Survivorship Program, Basavatarakam Hospital',
    pendingAction: 'Annual surveillance mammogram of contralateral breast and bone density DEXA scan',
    delayHours: 0,
    slaTargetHours: 8760,
    escalationLevel: 'none',
    relatedDocuments: [],
    nextRecommendedStep: 'Continuous survivorship quality-of-life logging'
  }
];

export const INITIAL_AI_RESULT: AIScreeningResult = {
  assessmentId: 'AI-ASSESS-2026-8842',
  patientId: 'PT-IN-2026-8842',
  pathwayId: 'breast',
  assessmentDate: '2026-10-01 10:38 IST',
  modelUsed: 'MammoVision-DeepNet',
  modelVersion: 'v2.4.2 (ResNet-50 + DenseNet Ensemble)',
  riskScore: 84,
  riskTier: 'suspicious',
  confidencePercentage: 88.4,
  keyFindings: [
    'Focal architectural distortion in left upper outer quadrant (diameter 22 x 18 mm)',
    'Cluster of pleomorphic fine microcalcifications in segmental distribution',
    'AI Sonomammography confidence score: 0.884 (BI-RADS Category 4C: High Suspicion of Malignancy)',
    'Contralateral right breast demonstrates symmetric fibroglandular density (BI-RADS 1: Normal)'
  ],
  suggestedAction: 'URGENT: Recommended immediate consultation with Breast Surgical Oncologist and Ultrasound-Guided Core Needle Biopsy for histopathological evaluation.',
  limitationsDisclaimer: 'IMPORTANT MEDICAL DISCLAIMER: This AI assessment is generated by an authorized Clinical Decision Support algorithm and is strictly NOT a definitive medical diagnosis. A normal result does not guarantee absence of disease, and a suspicious finding requires tissue biopsy confirmation by a licensed medical practitioner. It must be evaluated in conjunction with full clinical history by a certified clinician.',
  imageAnalyzedName: 'Mammogram_L_MLO_CC_PriyaSharma.dcm',
  clinicianReviewStatus: 'confirmed',
  clinicianNotes: 'Clinically correlated with palpated 2.2cm mobile firm mass at 2 o clock position, 4cm from nipple. Agrees with BI-RADS 4C assessment. Proceeding with USG-guided core needle biopsy.',
  reviewedByDoctor: 'Dr. Ananya Sen, MS, MCh (Surgical Oncology)',
  reviewedDate: '2026-10-01 16:15 IST'
};

export const MOCK_DOCTORS: Doctor[] = [
  {
    id: 'doc-1',
    name: 'Dr. Ananya Sen',
    degrees: 'MBBS, MS (Gen Surg), MCh (Surgical Oncology), FICS',
    specialty: 'Surgical Oncology',
    subspecialty: 'Breast & Gynaecologic Onco-Surgery',
    hospitalAffiliation: 'Basavatarakam Indo-American Cancer Hospital & Research Institute',
    city: 'Hyderabad',
    state: 'Telangana',
    experienceYears: 18,
    rating: 4.9,
    supportedPathways: ['breast', 'cervical'],
    consultationModes: ['In-Person', 'Teleconsultation'],
    nextAvailableSlot: 'Tomorrow, 10:30 AM',
    feeINR: 1200,
    languages: ['English', 'Telugu', 'Hindi', 'Bengali'],
    verified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'doc-2',
    name: 'Dr. Rajesh Mukherjee',
    degrees: 'MBBS, MD (Medicine), DM (Medical Oncology - Tata Memorial Hospital)',
    specialty: 'Medical Oncology',
    subspecialty: 'Thoracic & Gastrointestinal Oncology, Immunotherapy',
    hospitalAffiliation: 'Tata Memorial Hospital',
    city: 'Mumbai',
    state: 'Maharashtra',
    experienceYears: 22,
    rating: 4.95,
    supportedPathways: ['lung', 'colorectal', 'stomach', 'breast'],
    consultationModes: ['In-Person', 'Teleconsultation'],
    nextAvailableSlot: 'Friday, 02:00 PM',
    feeINR: 1500,
    languages: ['English', 'Hindi', 'Marathi', 'Bengali'],
    verified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'doc-3',
    name: 'Dr. Sunita Deshmukh',
    degrees: 'MBBS, DGO, MD, Fellowship in Gynaecologic Oncology (AIIMS)',
    specialty: 'Gynaecologic Oncology',
    subspecialty: 'Cervical Pre-Cancers, Ovarian & Uterine Malignancies',
    hospitalAffiliation: 'Kidwai Memorial Institute of Oncology',
    city: 'Bengaluru',
    state: 'Karnataka',
    experienceYears: 16,
    rating: 4.85,
    supportedPathways: ['cervical'],
    consultationModes: ['In-Person', 'Teleconsultation'],
    nextAvailableSlot: 'Today, 04:30 PM (Urgent Slots Open)',
    feeINR: 1000,
    languages: ['English', 'Kannada', 'Hindi'],
    verified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1594824813576-0fef47683ca5?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'doc-4',
    name: 'Dr. Harshavardhan Rao',
    degrees: 'MBBS, MS (ENT), MCh (Head & Neck Surgical Oncology)',
    specialty: 'Head & Neck Surgical Oncology',
    subspecialty: 'Oral Cavity, Laryngeal & Microvascular Reconstruction',
    hospitalAffiliation: 'Apollo Cancer Centre, Jubilee Hills',
    city: 'Hyderabad',
    state: 'Telangana',
    experienceYears: 20,
    rating: 4.9,
    supportedPathways: ['oral'],
    consultationModes: ['In-Person'],
    nextAvailableSlot: 'Thursday, 11:00 AM',
    feeINR: 1400,
    languages: ['English', 'Telugu', 'Hindi'],
    verified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'doc-5',
    name: 'Dr. Arvind Mehra',
    degrees: 'MBBS, MD, DNB (Pulmonary Medicine), Fellowship Thoracic Oncology',
    specialty: 'Thoracic Oncology & Pulmonology',
    subspecialty: 'Lung Nodule Evaluation, EBUS-TBNA, Target Therapy',
    hospitalAffiliation: 'Rajiv Gandhi Cancer Institute & Research Centre',
    city: 'New Delhi',
    state: 'Delhi NCR',
    experienceYears: 19,
    rating: 4.88,
    supportedPathways: ['lung'],
    consultationModes: ['In-Person', 'Teleconsultation'],
    nextAvailableSlot: 'Tomorrow, 03:00 PM',
    feeINR: 1600,
    languages: ['English', 'Hindi', 'Punjabi'],
    verified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'doc-6',
    name: 'Dr. S. K. Narayanan',
    degrees: 'MBBS, MS, MCh (Urology - AIIMS), DNB (Urology)',
    specialty: 'Urologic Oncology',
    subspecialty: 'Robotic Radical Prostatectomy, mpMRI-Fusion Biopsy',
    hospitalAffiliation: 'Apollo Proton Cancer Centre',
    city: 'Chennai',
    state: 'Tamil Nadu',
    experienceYears: 24,
    rating: 4.96,
    supportedPathways: ['prostate'],
    consultationModes: ['In-Person', 'Teleconsultation'],
    nextAvailableSlot: 'Saturday, 10:00 AM',
    feeINR: 1800,
    languages: ['English', 'Tamil', 'Telugu', 'Hindi'],
    verified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'doc-7',
    name: 'Dr. Meenakshi Sundaram',
    degrees: 'MBBS, MD (Dermatology), Fellowship Cutaneous Oncology (USA)',
    specialty: 'Dermatology & Dermato-Oncology',
    subspecialty: 'Melanoma Mole Mapping, Mohs Micrographic Surgery',
    hospitalAffiliation: 'HCG Cancer Hospital',
    city: 'Bengaluru',
    state: 'Karnataka',
    experienceYears: 15,
    rating: 4.82,
    supportedPathways: ['skin'],
    consultationModes: ['In-Person', 'Teleconsultation'],
    nextAvailableSlot: 'Friday, 11:30 AM',
    feeINR: 1100,
    languages: ['English', 'Kannada', 'Tamil', 'Hindi'],
    verified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'doc-8',
    name: 'Dr. Rakesh K. Verma',
    degrees: 'MBBS, MS, MCh (Surgical Gastroenterology & GI Oncology)',
    specialty: 'Gastrointestinal Surgical Oncology',
    subspecialty: 'Gastric & Colorectal Resections, Laparoscopic D2 Gastrectomy',
    hospitalAffiliation: 'All India Institute of Medical Sciences (AIIMS)',
    city: 'New Delhi',
    state: 'Delhi NCR',
    experienceYears: 21,
    rating: 4.94,
    supportedPathways: ['colorectal', 'stomach'],
    consultationModes: ['In-Person'],
    nextAvailableSlot: 'Monday, 09:00 AM',
    feeINR: 800,
    languages: ['English', 'Hindi'],
    verified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=300&q=80'
  }
];

export const MOCK_FACILITIES: MedicalFacility[] = [
  {
    id: 'fac-1',
    name: 'Basavatarakam Indo-American Cancer Hospital & Research Institute',
    type: 'Comprehensive Cancer Hospital',
    city: 'Hyderabad',
    state: 'Telangana',
    address: 'Road No. 10, Banjara Hills, Hyderabad, Telangana 500034',
    phone: '+91 40 2355 1235',
    cancerPathways: ['breast', 'cervical', 'oral', 'lung', 'colorectal', 'prostate', 'skin', 'stomach'],
    servicesOffered: [
      'Digital Sonomammography & Stereotactic Biopsy',
      'TrueBeam Radiotherapy & Brachytherapy',
      'Daycare Chemotherapy Unit (70 Beds)',
      'Robotic Surgery (da Vinci Xi)',
      'Molecular Pathology & Next-Gen Sequencing'
    ],
    accreditation: 'NABH',
    schemeAcceptance: ['PM-JAY Ayushman Bharat', 'Telangana Aarogyasri', 'CGHS', 'ESIC', 'Private TPA'],
    verified: true,
    lastVerifiedDate: '2026-10-14',
    nextDiagnosticSlot: 'Today, 03:00 PM (Sonomammogram/Biopsy)',
    waitingTimeDays: 1,
    estimatedCostRange: '₹3,500 - ₹85,000 (Subsidized under Schemes)',
    liveSlotStatus: 'Available Today',
    dataFreshnessTag: 'Verified 42 mins ago via ABDM HFR sync'
  },
  {
    id: 'fac-2',
    name: 'Tata Memorial Hospital & ACTREC',
    type: 'Comprehensive Cancer Hospital',
    city: 'Mumbai',
    state: 'Maharashtra',
    address: 'Dr. E Borges Road, Parel, Mumbai, Maharashtra 400012',
    phone: '+91 22 2417 7000',
    cancerPathways: ['breast', 'cervical', 'oral', 'lung', 'colorectal', 'prostate', 'skin', 'stomach'],
    servicesOffered: [
      'National Reference Pathology & IHC Lab',
      'Whole-Body 18F-FDG & PSMA PET-CT',
      'Proton & Heavy Ion Therapy Center (Kharghar)',
      'Bone Marrow Transplant Unit',
      'Multidisciplinary Tumor Boards'
    ],
    accreditation: 'NABH',
    schemeAcceptance: ['PM-JAY Ayushman Bharat', 'Mahatma Jyotirao Phule Jan Arogya Yojana', 'CGHS', 'Railway', 'Govt Grant'],
    verified: true,
    lastVerifiedDate: '2026-10-14',
    nextDiagnosticSlot: 'Tomorrow, 09:30 AM',
    waitingTimeDays: 3,
    estimatedCostRange: '₹1,200 - ₹60,000 (Govt Subsidized Categories A & B)',
    liveSlotStatus: 'Next Available: Tomorrow',
    dataFreshnessTag: 'Verified 1 hour ago (Hospital Information System)'
  },
  {
    id: 'fac-3',
    name: 'Apollo Proton Cancer Centre',
    type: 'Comprehensive Cancer Hospital',
    city: 'Chennai',
    state: 'Tamil Nadu',
    address: '100 Feet Road, Taramani, Chennai, Tamil Nadu 600113',
    phone: '+91 44 3322 1111',
    cancerPathways: ['breast', 'lung', 'prostate', 'oral', 'stomach', 'skin'],
    servicesOffered: [
      'Pencil Beam Scanning Proton Therapy',
      'PET-CT & 3-Tesla Prostate mpMRI',
      'Comprehensive Genomics & Liquid Biopsy',
      'Minimally Invasive Onco-Surgery',
      'International Patient Lounge'
    ],
    accreditation: 'JCI',
    schemeAcceptance: ['Tamil Nadu Chief Minister Comprehensive Scheme', 'CGHS', 'Top Private Insurers'],
    verified: true,
    lastVerifiedDate: '2026-10-14',
    nextDiagnosticSlot: 'Today, 05:00 PM',
    waitingTimeDays: 1,
    estimatedCostRange: '₹8,000 - ₹3,50,000',
    liveSlotStatus: 'Available Today',
    dataFreshnessTag: 'Verified 15 mins ago (Real-time API)'
  },
  {
    id: 'fac-4',
    name: 'Kidwai Memorial Institute of Oncology',
    type: 'Comprehensive Cancer Hospital',
    city: 'Bengaluru',
    state: 'Karnataka',
    address: 'Dr. M H Marigowda Road, Bengaluru, Karnataka 560029',
    phone: '+91 80 2609 4000',
    cancerPathways: ['breast', 'cervical', 'oral', 'colorectal', 'stomach'],
    servicesOffered: [
      'Cervical Cancer Screening & Colposcopy Center',
      'Cobalt-60 & Linear Accelerator Teletherapy',
      'Automated Cytopathology & Pap Smear Lab',
      'Palliative & Community Outreach Oncology'
    ],
    accreditation: 'NABH',
    schemeAcceptance: ['PM-JAY Ayushman Bharat', 'Karnataka Suvarna Arogya Suraksha Trust', 'CGHS'],
    verified: true,
    lastVerifiedDate: '2026-10-13',
    nextDiagnosticSlot: 'Thursday, 10:00 AM',
    waitingTimeDays: 2,
    estimatedCostRange: '₹500 - ₹35,000 (Free for BPL card holders)',
    liveSlotStatus: 'Next Available: Tomorrow',
    dataFreshnessTag: 'Verified 2 hours ago (State Health Registry)'
  },
  {
    id: 'fac-5',
    name: 'Rajiv Gandhi Cancer Institute & Research Centre',
    type: 'Comprehensive Cancer Hospital',
    city: 'New Delhi',
    state: 'Delhi NCR',
    address: 'Sector 5, Rohini, New Delhi, Delhi 110085',
    phone: '+91 11 4702 2222',
    cancerPathways: ['breast', 'lung', 'oral', 'prostate', 'colorectal'],
    servicesOffered: [
      'Low-Dose CT (LDCT) Lung Screening Suite',
      'CyberKnife Robotic Radiosurgery',
      'PET-MRI 3T Hybrid Imaging',
      'Endobronchial Ultrasound (EBUS) Suite'
    ],
    accreditation: 'NABH',
    schemeAcceptance: ['PM-JAY Ayushman Bharat', 'Delhi Arogya Kosh', 'CGHS', 'ECHS'],
    verified: true,
    lastVerifiedDate: '2026-10-14',
    nextDiagnosticSlot: 'Tomorrow, 11:30 AM',
    waitingTimeDays: 1,
    estimatedCostRange: '₹4,500 - ₹1,20,000',
    liveSlotStatus: 'Next Available: Tomorrow',
    dataFreshnessTag: 'Verified 35 mins ago via ABDM'
  },
  {
    id: 'fac-6',
    name: 'Vijaya Diagnostic Central Imaging & Reference Lab',
    type: 'Diagnostic & Imaging Centre',
    city: 'Hyderabad',
    state: 'Telangana',
    address: 'Himayatnagar Main Road, Hyderabad, Telangana 500029',
    phone: '+91 40 2323 4400',
    cancerPathways: ['breast', 'cervical', 'prostate', 'colorectal', 'stomach'],
    servicesOffered: [
      '3D Digital Sonomammography with Tomosynthesis',
      'Image-Guided Core Needle Biopsy',
      'Cobas 4800 High-Risk HPV DNA PCR',
      'Serum PSA & Free PSA Quantitation',
      'FIT Quantitative Stool Immunoassay'
    ],
    accreditation: 'NABL',
    schemeAcceptance: ['PM-JAY Ayushman Bharat', 'CGHS', 'Cashless Insurance'],
    verified: true,
    lastVerifiedDate: '2026-10-14',
    nextDiagnosticSlot: 'Today, 02:30 PM (Biopsies & Mammograms)',
    waitingTimeDays: 0,
    estimatedCostRange: '₹1,500 - ₹18,000',
    liveSlotStatus: 'Available Today',
    dataFreshnessTag: 'Verified 10 mins ago (Live Booking Engine)'
  },
  {
    id: 'fac-7',
    name: 'Dr. Lal PathLabs National Reference Lab',
    type: 'Specialized Pathology Lab',
    city: 'New Delhi',
    state: 'Delhi NCR',
    address: 'Block E, Sector 18, Rohini, New Delhi 110085',
    phone: '+91 11 3988 5050',
    cancerPathways: ['breast', 'cervical', 'lung', 'colorectal', 'prostate', 'skin'],
    servicesOffered: [
      'Comprehensive IHC Staining (ER, PR, HER2, Ki-67, PD-L1)',
      'Liquid Biopsy Circulating Tumor DNA (ctDNA)',
      'Liquid-Based Cytology ThinPrep (Bethesda)',
      'Histopathology Second Opinion Service'
    ],
    accreditation: 'NABL',
    schemeAcceptance: ['CGHS', 'Direct Corporate Empanelments'],
    verified: true,
    lastVerifiedDate: '2026-10-14',
    nextDiagnosticSlot: 'Home Collection / Walk-in Slots Open Every 30 Mins',
    waitingTimeDays: 0,
    estimatedCostRange: '₹800 - ₹24,000',
    liveSlotStatus: 'Available Today',
    dataFreshnessTag: 'Verified 5 mins ago (Lab Dispatch API)'
  },
  {
    id: 'fac-8',
    name: 'All India Institute of Medical Sciences (AIIMS)',
    type: 'Comprehensive Cancer Hospital',
    city: 'New Delhi',
    state: 'Delhi NCR',
    address: 'Ansari Nagar, New Delhi 110029 (National Cancer Institute, Jhajjar)',
    phone: '+91 11 2658 8500',
    cancerPathways: ['breast', 'cervical', 'oral', 'lung', 'colorectal', 'prostate', 'skin', 'stomach'],
    servicesOffered: [
      'Subsidized Cancer Workup & Treatment',
      'Advanced Robotic Gastrointestinal & Thoracic Resection',
      'Phase I/II Clinical Trial Units',
      'National Tissue Biobank'
    ],
    accreditation: 'Govt-Recognized',
    schemeAcceptance: ['PM-JAY Ayushman Bharat', 'Rashtriya Arogya Nidhi (RAN)', 'CGHS', 'Free BPL'],
    verified: true,
    lastVerifiedDate: '2026-10-13',
    nextDiagnosticSlot: 'Walk-in Triage Active Daily 08:00 AM',
    waitingTimeDays: 5,
    estimatedCostRange: '₹200 - ₹25,000 (Govt Subsidized Rates)',
    liveSlotStatus: 'Waitlist 3 Days',
    dataFreshnessTag: 'Verified 4 hours ago via NIC-eHospital'
  }
];

export const MOCK_INTERNATIONAL_CENTERS: InternationalCenter[] = [
  {
    id: 'intl-1',
    name: 'MD Anderson Cancer Center (University of Texas)',
    country: 'United States',
    city: 'Houston, Texas',
    specialties: ['Triple-Negative Breast Cancer', 'Thoracic Oncology', 'Advanced Immunotherapy', 'Sarcoma'],
    advancedTechnologies: ['CAR-T Cell Therapy', 'MR-Linac Adaptive Radiation', 'Novel T-Cell Receptor (TCR) Trials', 'Comprehensive Genomic Profiling'],
    clinicalTrialsActive: 1420,
    estConsultationUSD: 1800,
    estTreatmentRangeUSD: '$45,000 - $280,000',
    averageWaitWeeks: 2,
    visaAssistanceOffered: true,
    languageSupport: ['English', 'Hindi translator on request', 'Spanish', 'Arabic'],
    teleSecondOpinionAvailable: true,
    hipaaGdrpCompliant: true,
    keyHighlights: 'Ranked #1 for cancer care in USA by U.S. News & World Report. Dedicated International Center assists Indian patients with medical visa invitation letters and treatment estimators.'
  },
  {
    id: 'intl-2',
    name: 'Memorial Sloan Kettering Cancer Center (MSKCC)',
    country: 'United States',
    city: 'New York City, NY',
    specialties: ['Gastrointestinal Cancers', 'Breast & Prostate Malignancies', 'Genomic Guided Oncology'],
    advancedTechnologies: ['MSK-IMPACT 500-gene Sequencing', 'Intraoperative Molecular Imaging', 'Customized Dendritic Vaccines'],
    clinicalTrialsActive: 1180,
    estConsultationUSD: 2100,
    estTreatmentRangeUSD: '$50,000 - $310,000',
    averageWaitWeeks: 2,
    visaAssistanceOffered: true,
    languageSupport: ['English', 'Hindi', 'Mandarin', 'Russian'],
    teleSecondOpinionAvailable: true,
    hipaaGdrpCompliant: true,
    keyHighlights: 'Direct tele-second opinion portal allowing Indian clinicians to co-review histopathology with MSKCC disease management teams within 7 business days.'
  },
  {
    id: 'intl-3',
    name: 'National Cancer Centre Singapore (NCCS)',
    country: 'Singapore',
    city: 'Outram, Singapore',
    specialties: ['Head & Neck Cancers', 'Gastric & Colorectal Oncology', 'Nasopharyngeal Carcinoma'],
    advancedTechnologies: ['Goh Cheng Liang Proton Therapy Centre', 'Advanced Endoscopic Submucosal Dissection (ESD)', 'Liquid Biopsy Surveillance'],
    clinicalTrialsActive: 380,
    estConsultationUSD: 850,
    estTreatmentRangeUSD: '$20,000 - $95,000',
    averageWaitWeeks: 1,
    visaAssistanceOffered: true,
    languageSupport: ['English', 'Tamil', 'Hindi', 'Malay', 'Mandarin'],
    teleSecondOpinionAvailable: true,
    hipaaGdrpCompliant: true,
    keyHighlights: 'Closer proximity to India (4-hour direct flight), comprehensive Tamil/Hindi patient navigation, significantly lower travel and accommodation costs compared to US/Europe.'
  },
  {
    id: 'intl-4',
    name: 'Gustave Roussy Institute',
    country: 'France',
    city: 'Villejuif (Paris)',
    specialties: ['Cutaneous Melanoma', 'Immunotherapy Resistance Trials', 'Rare Tumors'],
    advancedTechnologies: ['High-Field 1.5T MR-Linac', 'Personalized Cancer Immunotherapy', 'Next-Gen Circulating Tumor Cell Platforms'],
    clinicalTrialsActive: 490,
    estConsultationUSD: 1100,
    estTreatmentRangeUSD: '€22,000 - €110,000',
    averageWaitWeeks: 2,
    visaAssistanceOffered: true,
    languageSupport: ['French', 'English', 'Arabic'],
    teleSecondOpinionAvailable: true,
    hipaaGdrpCompliant: true,
    keyHighlights: 'Premier European cancer research hospital pioneering checkpoint inhibitor combination trials and skin melanoma molecular oncology.'
  },
  {
    id: 'intl-5',
    name: 'Asan Medical Center',
    country: 'South Korea',
    city: 'Seoul',
    specialties: ['Gastric Cancer (Global Leader in Survival)', 'Minimally Invasive Laparoscopic / Robotic Gastrectomy'],
    advancedTechnologies: ['High-Volume 3D Laparoscopic Robotics', 'Endoscopic Full-Thickness Resection', 'Targeted Organ-Preserving Surgery'],
    clinicalTrialsActive: 310,
    estConsultationUSD: 750,
    estTreatmentRangeUSD: '$18,000 - $75,000',
    averageWaitWeeks: 1,
    visaAssistanceOffered: true,
    languageSupport: ['Korean', 'English', 'Russian', 'Mongolian'],
    teleSecondOpinionAvailable: true,
    hipaaGdrpCompliant: true,
    keyHighlights: 'Highest volume gastric cancer center worldwide with over 90% 5-year survival for early gastric cancer. International medical travel facilitation team.'
  }
];

export const MOCK_MEDICINES: OncologyMedicine[] = [
  {
    id: 'med-1',
    brandName: 'Herceptin',
    genericName: 'Trastuzumab',
    category: 'Targeted Therapy',
    cancerIndication: 'HER2-Positive Breast & Gastric Cancer',
    dosageStrength: '440 mg Single-Dose Lyophilized Vial',
    estBrandPriceINR: 58000,
    genericEquivalent: 'Vivitra (Zydus Cadila) / Hertraz (Biocon)',
    estGenericPriceINR: 19500,
    requiresPrescription: true,
    stockAvailability: [
      { city: 'Hyderabad', pharmacy: 'Apollo Pharmacy, Banjara Hills Rd 10', inStock: true, quantity: '8 vials', verifiedTime: 'Today 09:15 AM' },
      { city: 'Hyderabad', pharmacy: 'Basavatarakam Hospital In-House Pharmacy', inStock: true, quantity: '24 vials (Subsidized Stock)', verifiedTime: 'Today 10:00 AM' },
      { city: 'Mumbai', pharmacy: 'Tata Memorial In-House Pharmacy', inStock: true, quantity: '50+ vials', verifiedTime: 'Today 08:30 AM' },
      { city: 'Delhi', pharmacy: 'MedPlus Specialist Pharmacy, South Ext', inStock: true, quantity: '12 vials', verifiedTime: 'Today 11:00 AM' },
      { city: 'Bengaluru', pharmacy: 'HCG Pharmacy, K.R. Road', inStock: true, quantity: '15 vials', verifiedTime: 'Today 09:45 AM' }
    ],
    papAssistanceAvailable: true,
    papDetails: 'Patient Assistance Program (PAP) active: Buy 1 Cycle, Get 1 Cycle free under manufacturer access initiative for eligible household income < ₹10 Lakhs/year.'
  },
  {
    id: 'med-2',
    brandName: 'Keytruda',
    genericName: 'Pembrolizumab',
    category: 'Immunotherapy',
    cancerIndication: 'Metastatic Non-Small Cell Lung Cancer, Melanoma, Cervical, Colorectal (MSI-High)',
    dosageStrength: '100 mg / 4 mL Solution for Infusion',
    estBrandPriceINR: 185000,
    genericEquivalent: 'Patent Protected (No authorized domestic biosimilar yet in India)',
    estGenericPriceINR: undefined,
    requiresPrescription: true,
    stockAvailability: [
      { city: 'Hyderabad', pharmacy: 'Apollo Cancer Center Pharmacy', inStock: true, quantity: '6 vials', verifiedTime: 'Today 10:30 AM' },
      { city: 'Mumbai', pharmacy: 'Tata Memorial Hospital Pharmacy', inStock: true, quantity: '14 vials', verifiedTime: 'Today 09:00 AM' },
      { city: 'Delhi', pharmacy: 'Rajiv Gandhi Hospital Pharmacy', inStock: true, quantity: '8 vials', verifiedTime: 'Today 11:15 AM' }
    ],
    papAssistanceAvailable: true,
    papDetails: 'MSD Access Program: Co-payment assistance and 3+1 cycle concession for verified oncological prescriptions.'
  },
  {
    id: 'med-3',
    brandName: 'Tagrisso',
    genericName: 'Osimertinib Mesylate',
    category: 'Targeted Therapy',
    cancerIndication: 'EGFR T790M Mutation-Positive Non-Small Cell Lung Cancer',
    dosageStrength: '80 mg Oral Tablets (Pack of 30)',
    estBrandPriceINR: 145000,
    genericEquivalent: 'Osimert (Authorized Export/Special Permit under CDSCO)',
    estGenericPriceINR: 38000,
    requiresPrescription: true,
    stockAvailability: [
      { city: 'Hyderabad', pharmacy: 'Yashoda Hospital Onco-Pharmacy', inStock: true, quantity: '10 packs', verifiedTime: 'Today 09:30 AM' },
      { city: 'Bengaluru', pharmacy: 'Kidwai Institute Pharmacy', inStock: true, quantity: '18 packs', verifiedTime: 'Today 10:15 AM' }
    ],
    papAssistanceAvailable: true,
    papDetails: 'AstraZeneca Patient Access Scheme: Free drug support for cycles 4 through 12 after baseline therapy adherence.'
  },
  {
    id: 'med-4',
    brandName: 'Cisplatin Injection',
    genericName: 'Cisplatin',
    category: 'Chemotherapy',
    cancerIndication: 'Cervical, Lung, Head & Neck, Gastric Cancers',
    dosageStrength: '50 mg / 50 mL Injection Vial',
    estBrandPriceINR: 650,
    genericEquivalent: 'Kemoplat (Fresenius Kabi) / Cysplat (Cipla)',
    estGenericPriceINR: 280,
    requiresPrescription: true,
    stockAvailability: [
      { city: 'Hyderabad', pharmacy: 'All Major Hospital Pharmacies', inStock: true, quantity: 'Ample (>100 vials)', verifiedTime: 'Today 08:00 AM' },
      { city: 'Mumbai', pharmacy: 'Tata Memorial In-House Pharmacy', inStock: true, quantity: 'Ample (>200 vials)', verifiedTime: 'Today 08:00 AM' }
    ],
    papAssistanceAvailable: false
  },
  {
    id: 'med-5',
    brandName: 'Xeloda',
    genericName: 'Capecitabine',
    category: 'Chemotherapy',
    cancerIndication: 'Colorectal, Gastric, and Metastatic Breast Cancer',
    dosageStrength: '500 mg Film-Coated Tablets (Strip of 10)',
    estBrandPriceINR: 3200,
    genericEquivalent: 'Capegard (Cipla) / Distamine (Dr. Reddy’s)',
    estGenericPriceINR: 850,
    requiresPrescription: true,
    stockAvailability: [
      { city: 'Hyderabad', pharmacy: 'Apollo Pharmacy & MedPlus', inStock: true, quantity: '35 strips', verifiedTime: 'Today 10:45 AM' },
      { city: 'Delhi', pharmacy: 'Lal PathLabs Associated Pharmacies', inStock: true, quantity: '50 strips', verifiedTime: 'Today 11:20 AM' }
    ],
    papAssistanceAvailable: false
  },
  {
    id: 'med-6',
    brandName: 'Zytiga',
    genericName: 'Abiraterone Acetate',
    category: 'Hormone Therapy',
    cancerIndication: 'Metastatic Castration-Resistant Prostate Cancer (mCRPC)',
    dosageStrength: '250 mg Tablets (Bottle of 120)',
    estBrandPriceINR: 72000,
    genericEquivalent: 'Abirapro (Glenmark) / Zelgor (Sun Pharma)',
    estGenericPriceINR: 14500,
    requiresPrescription: true,
    stockAvailability: [
      { city: 'Chennai', pharmacy: 'Apollo Proton Onco-Pharmacy', inStock: true, quantity: '12 bottles', verifiedTime: 'Today 09:00 AM' },
      { city: 'Hyderabad', pharmacy: 'Basavatarakam Hospital Pharmacy', inStock: true, quantity: '15 bottles', verifiedTime: 'Today 10:15 AM' }
    ],
    papAssistanceAvailable: true,
    papDetails: 'PAP scheme with 50% discount voucher for senior citizens verified under CGHS/ECHS.'
  }
];

export const MOCK_RECORDS: MedicalRecord[] = [
  {
    id: 'REC-001',
    patientId: 'PT-IN-2026-8842',
    title: 'Bilateral Digital Sonomammography Report & Imaging',
    category: 'imaging',
    date: '2026-10-01 10:15 IST',
    author: 'Dr. S. K. Rao, MD (Consultant Radiologist)',
    institution: 'Vijaya Diagnostic Center, Hyderabad',
    fileSize: '42.8 MB (DICOM + PDF)',
    fileType: 'DICOM / PDF',
    summary: 'Left breast: 22 x 18 mm irregular hypoechoic mass at 2 o clock position with peripheral acoustic shadowing and pleomorphic microcalcifications. BI-RADS Category 4C.',
    fhirResourceType: 'DiagnosticReport',
    isCritical: true
  },
  {
    id: 'REC-002',
    patientId: 'PT-IN-2026-8842',
    title: 'MammoVision-DeepNet AI SaMD Triage Certificate',
    category: 'clinical_note',
    date: '2026-10-01 10:38 IST',
    author: 'AI SaMD Engine (MammoVision-DeepNet v2.4.2)',
    institution: 'AI CancerConnect Integrated Decision Support',
    fileSize: '1.4 MB',
    fileType: 'PDF / HL7 JSON',
    summary: 'Suspicious architectural distortion detected. Risk Tier: Suspicious (Score: 84/100, Confidence: 88.4%). Clinician review mandated.',
    fhirResourceType: 'Observation',
    isCritical: true
  },
  {
    id: 'REC-003',
    patientId: 'PT-IN-2026-8842',
    title: 'Surgical Oncology Outpatient Consultation Note',
    category: 'clinical_note',
    date: '2026-10-01 16:15 IST',
    author: 'Dr. Ananya Sen, MS, MCh (Surgical Oncology)',
    institution: 'Basavatarakam Indo-American Cancer Hospital',
    fileSize: '850 KB',
    fileType: 'PDF',
    summary: 'Clinical breast exam confirms 2.2 cm firm, non-tender lump in Left UOQ, skin pinch test negative, mobile in breast parenchyma. Clinician concurs with BI-RADS 4C. Requisitioned USG-guided core needle biopsy.',
    fhirResourceType: 'CarePlan',
    isCritical: false
  },
  {
    id: 'REC-004',
    patientId: 'PT-IN-2026-8842',
    title: 'Investigation Order Slip - USG Guided Core Needle Biopsy',
    category: 'referral',
    date: '2026-10-03 12:45 IST',
    author: 'Dr. Ananya Sen',
    institution: 'Basavatarakam Indo-American Cancer Hospital',
    fileSize: '320 KB',
    fileType: 'PDF',
    summary: 'Procedure order: 4 cores from left breast lesion. Request histopathology, Scarff-Bloom-Richardson grading, and ER/PR/HER2/Ki-67 IHC panel.',
    fhirResourceType: 'ServiceRequest',
    isCritical: false
  },
  {
    id: 'REC-005',
    patientId: 'PT-IN-2026-8842',
    title: 'Preliminary Biopsy Specimen Grossing & Microscopic Preview',
    category: 'pathology',
    date: '2026-10-05 15:30 IST',
    author: 'Dr. V. Ramanathan (Chief Histopathologist)',
    institution: 'Central Pathology Lab, Basavatarakam Hospital',
    fileSize: '5.2 MB',
    fileType: 'PDF / WSI Slide',
    summary: 'Tissue core cylinders measuring 1.4 cm in length. Microscopic sections reveal cords and nests of malignant ductal epithelial cells with nuclear pleomorphism. Infiltrating Ductal Carcinoma. Awaiting final IHC sign-off.',
    fhirResourceType: 'DiagnosticReport',
    isCritical: true
  }
];

export const MOCK_OVERDUE_ALERTS: OverdueAlert[] = [
  {
    id: 'ALERT-SLA-9921',
    stageId: 9,
    patientId: 'PT-IN-2026-8842',
    patientName: 'Priya Sharma (Age 48, Hyderabad)',
    cancerPathway: 'breast',
    taskTitle: 'Diagnostic Report Availability: Core Biopsy Histopathology & IHC Sign-Off',
    responsiblePerson: 'Dr. V. Ramanathan (Chief Histopathologist)',
    responsibleRole: 'Central Pathology Laboratory',
    delayHours: 51,
    slaMaxHours: 48,
    urgency: 'critical',
    escalationLevel: 'escalated_l2',
    escalatedTo: 'Dr. Ananya Sen (Treating Oncologist) & Medical Director / Care Escalation Desk',
    status: 'active',
    loggedReason: 'Laboratory IHC automated autostainer reagent batch re-calibration delayed HER2/neu control slide validation by 24h.',
    actionTaken: 'Expedited manual IHC control staining initiated; digital sign-off scheduled within 2 hours.'
  },
  {
    id: 'ALERT-SLA-9918',
    stageId: 7,
    patientId: 'PT-IN-2026-5519',
    patientName: 'Rajesh Kumar (Age 52, New Delhi)',
    cancerPathway: 'oral',
    taskTitle: 'Diagnostic CT Mandible Scheduling: Appointment Confirmation Pending > 36h',
    responsiblePerson: 'Diagnostic Scheduling Coordinator',
    responsibleRole: 'Radiology Desk, Rajiv Gandhi Cancer Institute',
    delayHours: 38,
    slaMaxHours: 24,
    urgency: 'high',
    escalationLevel: 'escalated_l1',
    escalatedTo: 'Head of Radiology Department',
    status: 'acknowledged',
    loggedReason: 'Patient contact phone was temporarily unreachable; care coordinator sent SMS and WhatsApp scheduling link.',
    actionTaken: 'Patient confirmed for tomorrow morning 08:30 AM slot.'
  },
  {
    id: 'ALERT-SLA-9914',
    stageId: 18,
    patientId: 'PT-IN-2026-4412',
    patientName: 'Sunita Devi (Age 43, Bengaluru)',
    cancerPathway: 'cervical',
    taskTitle: 'Post-Brachytherapy Follow-Up: 3-Month Surveillance Examination Missed',
    responsiblePerson: 'Clinical Care Navigator',
    responsibleRole: 'Kidwai Memorial Cancer Institute',
    delayHours: 120,
    slaMaxHours: 72,
    urgency: 'medium',
    escalationLevel: 'escalated_l1',
    escalatedTo: 'Community Onco-Health Officer',
    status: 'acknowledged',
    loggedReason: 'Patient had travel constraints from rural Mandya district.',
    actionTaken: 'Teleconsultation arranged; local Primary Health Center assigned for pelvic exam.'
  }
];

export const TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    appTitle: 'AI CancerConnect',
    tagline: 'AI-Assisted Eight-Cancer Screening, Medical Availability, Referral & Patient Tracking Platform',
    dashboard: 'Dashboard',
    screening: 'AI Screening',
    patientJourney: '19-Stage Journey',
    facilities: 'Medical Availability',
    international: 'Global Options',
    medicines: 'Medicines & Access',
    records: 'Medical Vault',
    escalations: 'Delay & Escalations',
    rolePatient: 'Patient',
    roleDoctor: 'Doctor / Clinician',
    roleHospital: 'Hospital / Lab',
    roleAdmin: 'Administrator',
    activeAlerts: 'Active SLA Alerts',
    disclaimer: 'Clinical Decision Support Platform. Does NOT replace qualified medical practitioners or guarantee cancer detection, cure, or treatment outcome.',
    hackathonDemo: 'Hackathon Demo Mode',
    nextStep: 'Next Journey Step',
    resetDemo: 'Reset Demo',
    searchPlaceholder: 'Search facilities, oncologists, diagnostic tests...',
    filterByState: 'Filter by State/City',
    bookAppointment: 'Request Appointment',
    viewReport: 'View Medical Record',
    forwardToDoctor: 'Forward for Clinical Review'
  },
  hi: {
    appTitle: 'एआई कैंसरकनेक्ट (AI CancerConnect)',
    tagline: 'एआई-सहायित 8-कैंसर स्क्रीनिंग, चिकित्सा उपलब्धता, रेफरल एवं रोगी ट्रैकिंग प्लेटफॉर्म',
    dashboard: 'डैशबोर्ड',
    screening: 'एआई स्क्रीनिंग',
    patientJourney: '19-चरणीय यात्रा',
    facilities: 'चिकित्सा उपलब्धता',
    international: 'अंतर्राष्ट्रीय विकल्प',
    medicines: 'दवाइयाँ एवं उपलब्धता',
    records: 'मेडिकल रिकॉर्ड्स',
    escalations: 'विलंब एवं अलर्ट',
    rolePatient: 'मरीज़ (Patient)',
    roleDoctor: 'डॉक्टर (Doctor)',
    roleHospital: 'अस्पताल / लैब',
    roleAdmin: 'प्रशासक (Admin)',
    activeAlerts: 'सक्रिय एसएलए अलर्ट',
    disclaimer: 'क्लिनिकल निर्णय सहायता मंच। यह किसी योग्य चिकित्सक का स्थान नहीं लेता है और कैंसर निदान या इलाज की गारंटी नहीं देता है।',
    hackathonDemo: 'हैकाथॉन डेमो मोड',
    nextStep: 'अगला चरण',
    resetDemo: 'डेमो रीसेट करें',
    searchPlaceholder: 'अस्पताल, ऑन्कोलॉजिस्ट, टेस्ट खोजें...',
    filterByState: 'राज्य/शहर के अनुसार फ़िल्टर करें',
    bookAppointment: 'अपॉइंटमेंट अनुरोध',
    viewReport: 'मेडिकल रिपोर्ट देखें',
    forwardToDoctor: 'क्लिनिकल समीक्षा हेतु भेजें'
  },
  te: {
    appTitle: 'ఏఐ క్యాన్సర్‌కనెక్ట్ (AI CancerConnect)',
    tagline: 'ఏఐ-సహాయక 8-క్యాన్సర్ స్క్రీనింగ్, వైద్య లభ్యత, రెఫరల్ మరియు పేషెంట్ ట్రాకింగ్ వేదిక',
    dashboard: 'డాష్‌బోర్డ్',
    screening: 'ఏఐ స్క్రీనింగ్',
    patientJourney: '19-దశల ప్రయాణం',
    facilities: 'వైద్య లభ్యత',
    international: 'అంతర్జాతీయ ఎంపికలు',
    medicines: 'మందులు & లభ్యత',
    records: 'మెడికల్ రికార్డులు',
    escalations: 'ఆలస్యాలు & హెచ్చరికలు',
    rolePatient: 'రోగి (Patient)',
    roleDoctor: 'వైద్యులు (Doctor)',
    roleHospital: 'ఆసుపత్రి / ల్యాబ్',
    roleAdmin: 'నిర్వాహకుడు (Admin)',
    activeAlerts: 'చురుకైన ఎస్ఎల్ఏ హెచ్చరికలు',
    disclaimer: 'క్లినికల్ నిర్ణయ సహాయక వేదిక. అర్హతగల వైద్యులకు ప్రత్యామ్నాయం కాదు, మరియు క్యాన్సర్ నిర్ధారణ లేదా నివారణకు హామీ ఇవ్వదు.',
    hackathonDemo: 'హ్యాకథాన్ డెమో మోడ్',
    nextStep: 'తదుపరి దశ',
    resetDemo: 'డెమో రీసెట్ చేయండి',
    searchPlaceholder: 'ఆసుపత్రులు, ఆంకాలజిస్టులు, పరీక్షలను శోధించండి...',
    filterByState: 'రాష్ట్రం/నగరం ద్వారా ఫిల్టర్ చేయండి',
    bookAppointment: 'అపాయింట్‌మెంట్ అభ్యర్థించండి',
    viewReport: 'మెడికల్ రికార్డును వీక్షించండి',
    forwardToDoctor: 'క్లినికల్ సమీక్ష కోసం పంపండి'
  }
};
