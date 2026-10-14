import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  Upload, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  ShieldCheck, 
  ArrowRight, 
  FileText, 
  Info, 
  Stethoscope,
  Activity,
  Maximize2
} from 'lucide-react';
import { CancerPathwayId } from '../types';

export const AIScreeningModule: React.FC = () => {
  const { 
    pathways, 
    activePathwayId, 
    setActivePathwayId, 
    activePathway, 
    runAIScreening, 
    aiResult, 
    patient, 
    setActiveTab,
    setUserRole,
    addToast
  } = useApp();

  const [answers, setAnswers] = useState<Record<string, boolean>>({
    b_q1: true, // Lump felt
    b_q3: true  // Mild dimpling
  });
  const [selectedImage, setSelectedImage] = useState<string>(activePathway.sampleImages[0]?.sampleUrl || '');
  const [selectedImageLabel, setSelectedImageLabel] = useState<string>(activePathway.sampleImages[0]?.label || '');
  const [customFileUploaded, setCustomFileUploaded] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisProgress, setAnalysisProgress] = useState<number>(0);

  const handlePathwayChange = (id: CancerPathwayId) => {
    setActivePathwayId(id);
    const newPathway = pathways.find(p => p.id === id);
    if (newPathway && newPathway.sampleImages[0]) {
      setSelectedImage(newPathway.sampleImages[0].sampleUrl);
      setSelectedImageLabel(newPathway.sampleImages[0].label);
    }
    setAnswers({});
  };

  const handleToggleAnswer = (questionId: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const handleCustomUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCustomFileUploaded(file.name);
      setSelectedImageLabel(`Uploaded: ${file.name}`);
      addToast(`File ${file.name} loaded into DICOM / Image preprocessor.`, 'info');
    }
  };

  const handleRunInference = () => {
    setIsAnalyzing(true);
    setAnalysisProgress(15);

    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 25;
      });
    }, 280);

    setTimeout(() => {
      clearInterval(interval);
      setIsAnalyzing(false);
      setAnalysisProgress(100);
      runAIScreening(activePathwayId, answers, customFileUploaded || selectedImageLabel);
    }, 1400);
  };

  return (
    <div>
      {/* 8 Cancer Pathways Selector Header */}
      <div className="card" style={{ marginBottom: '24px', padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <span className="badge badge-teal">Integrated Decision Support</span>
            <h3 style={{ fontSize: '1.25rem', marginTop: '4px' }}>
              Select Cancer Pathway for Screening & Triage
            </h3>
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            8 Validated Clinical Workflows Available
          </span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '10px'
        }}>
          {pathways.map((pathway) => {
            const isSelected = pathway.id === activePathwayId;
            return (
              <button
                key={pathway.id}
                onClick={() => handlePathwayChange(pathway.id)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '12px 8px',
                  borderRadius: 'var(--radius-md)',
                  background: isSelected ? 'var(--teal-glow)' : 'var(--bg-card-subtle)',
                  border: isSelected ? '2px solid var(--teal-primary)' : '1px solid var(--border-subtle)',
                  color: isSelected ? '#fff' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textAlign: 'center'
                }}
              >
                <span style={{ fontSize: '0.85rem', fontWeight: isSelected ? 700 : 500 }}>
                  {pathway.name}
                </span>
                <span style={{ fontSize: '0.65rem', color: isSelected ? 'var(--teal-light)' : 'var(--text-muted)', marginTop: '2px' }}>
                  {pathway.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Pathway Overview & Guidelines Banner */}
      <div className="card" style={{ marginBottom: '24px', background: 'linear-gradient(135deg, #101726 0%, #162032 100%)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ flex: 1, minWidth: '300px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className="badge badge-blue">{activePathway.badge}</span>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                Target Specialist: <strong style={{ color: 'var(--teal-light)' }}>{activePathway.recommendedSpecialist}</strong>
              </span>
            </div>
            <h2 style={{ fontSize: '1.5rem', marginTop: '6px' }}>{activePathway.name} Pathway</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginTop: '4px' }}>
              {activePathway.description}
            </p>
            <div style={{ marginTop: '10px', fontSize: '0.8rem', color: '#93c5fd' }}>
              📊 <strong>Incidence in India:</strong> {activePathway.incidenceIndia}
            </div>
          </div>

          {/* Model Card Specs */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.35)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '14px 18px',
            minWidth: '280px',
            maxWidth: '400px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Integrated AI Model</span>
              <span className="badge badge-purple" style={{ fontSize: '0.65rem' }}>SaMD Class II</span>
            </div>
            <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#f8fafc' }}>
              {activePathway.aiModel.name}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              {activePathway.aiModel.version}
            </div>
            <div style={{ display: 'flex', gap: '14px', marginTop: '10px', fontSize: '0.75rem' }}>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Sensitivity: </span>
                <strong style={{ color: 'var(--emerald-success)' }}>{activePathway.aiModel.sensitivity}%</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Specificity: </span>
                <strong style={{ color: 'var(--teal-light)' }}>{activePathway.aiModel.specificity}%</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid-2" style={{ marginBottom: '24px' }}>
        {/* Left Column: Symptom & Risk Questionnaire */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h4 style={{ fontSize: '1.05rem', color: '#fff' }}>
              1. Symptom & Clinical Risk Assessment
            </h4>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              {activePathway.symptomQuestions.length} Questions
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {activePathway.symptomQuestions.map((q) => {
              const isChecked = !!answers[q.id];
              return (
                <div
                  key={q.id}
                  onClick={() => handleToggleAnswer(q.id)}
                  style={{
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-md)',
                    background: isChecked ? 'rgba(20, 184, 166, 0.1)' : 'var(--bg-card-subtle)',
                    border: isChecked ? '1px solid rgba(20, 184, 166, 0.35)' : '1px solid var(--border-subtle)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {}} // Handled by parent div
                    style={{ marginTop: '3px', accentColor: 'var(--teal-primary)', width: '16px', height: '16px' }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.85rem', color: isChecked ? '#fff' : 'var(--text-secondary)', fontWeight: isChecked ? 600 : 400 }}>
                      {q.text}
                    </div>
                    <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                      <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'capitalize' }}>
                        Category: {q.category.replace('_', ' ')}
                      </span>
                      <span style={{ fontSize: '0.68rem', color: 'var(--teal-light)' }}>
                        Risk Weight: +{q.weight}%
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Age & Risk Screening Guidance Box */}
          <div style={{ marginTop: '20px', padding: '14px', background: 'rgba(59, 130, 246, 0.08)', border: '1px solid rgba(59, 130, 246, 0.25)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--blue-light)', marginBottom: '6px' }}>
              Standard Clinical Screening Guidance:
            </div>
            <ul style={{ paddingLeft: '18px', fontSize: '0.76rem', color: '#cbd5e1', lineHeight: 1.6 }}>
              {activePathway.screeningGuidelines.map((g, idx) => (
                <li key={idx}>{g}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Medical Imaging / Laboratory Data & AI Processing */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h4 style={{ fontSize: '1.05rem', color: '#fff' }}>
              2. Imaging or Test Report Upload
            </h4>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Modality: {activePathway.aiModel.modality.split('(')[0]}
            </span>
          </div>

          {/* Pre-Loaded Real Synthetic Clinical Samples */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
              Select a benchmark clinical sample to test AI triage:
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
              {activePathway.sampleImages.map((sample) => {
                const isSelected = selectedImageLabel === sample.label;
                return (
                  <div
                    key={sample.id}
                    onClick={() => {
                      setSelectedImage(sample.sampleUrl);
                      setSelectedImageLabel(sample.label);
                      setCustomFileUploaded(null);
                    }}
                    style={{
                      border: isSelected ? '2px solid var(--teal-primary)' : '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-md)',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      background: isSelected ? 'var(--teal-glow)' : 'var(--bg-card-subtle)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ height: '90px', background: '#000', position: 'relative' }}>
                      <img
                        src={sample.sampleUrl}
                        alt={sample.label}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
                      />
                      <span
                        className={`badge ${sample.caseType === 'suspicious' ? 'badge-danger' : 'badge-emerald'}`}
                        style={{ position: 'absolute', top: '6px', right: '6px', fontSize: '0.62rem' }}
                      >
                        {sample.caseType.toUpperCase()}
                      </span>
                    </div>
                    <div style={{ padding: '8px' }}>
                      <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {sample.label}
                      </div>
                      <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '2px', lineHeight: 1.2 }}>
                        {sample.description}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Custom Upload Simulator */}
          <div style={{
            border: '2px dashed var(--border-light)',
            borderRadius: 'var(--radius-md)',
            padding: '16px',
            textAlign: 'center',
            background: 'rgba(255, 255, 255, 0.02)',
            marginBottom: '20px'
          }}>
            <Upload size={24} style={{ color: 'var(--teal-light)', margin: '0 auto 6px' }} />
            <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#fff' }}>
              {customFileUploaded ? `Loaded: ${customFileUploaded}` : 'Upload DICOM, JPEG or Pathology Scan'}
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              Supports PACS DICOM files, high-res endoscopic still, dermoscopic photographs (Max 50MB)
            </div>
            <input
              type="file"
              id="medical-scan-upload"
              accept=".dcm,.jpg,.jpeg,.png,.pdf"
              onChange={handleCustomUpload}
              style={{ display: 'none' }}
            />
            <label
              htmlFor="medical-scan-upload"
              className="btn btn-sm btn-secondary"
              style={{ marginTop: '10px', display: 'inline-flex' }}
            >
              Choose Local Medical Scan
            </label>
          </div>

          {/* Run Inference Action */}
          <div>
            {isAnalyzing ? (
              <div style={{ padding: '16px', background: 'var(--bg-card-subtle)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                  <Sparkles size={18} className="pulse-ring" style={{ color: 'var(--teal-light)' }} />
                  <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#fff' }}>
                    Running {activePathway.aiModel.name} ({analysisProgress}%)...
                  </span>
                </div>
                <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', marginTop: '10px', overflow: 'hidden' }}>
                  <div style={{ width: `${analysisProgress}%`, height: '100%', background: 'var(--teal-primary)', transition: 'width 0.25s ease' }} />
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                  Extracting deep spatial feature vectors • Cross-referencing against {activePathway.aiModel.validationDataset.split('(')[0]}
                </div>
              </div>
            ) : (
              <button
                onClick={handleRunInference}
                className="btn btn-primary"
                style={{ width: '100%', padding: '12px' }}
              >
                <Sparkles size={16} />
                <span>Execute AI Screening & Generate Triage Report</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* AI SaMD Output Result Section (If generated) */}
      {aiResult && (
        <div className="card" style={{
          borderLeft: aiResult.riskTier === 'suspicious' ? '4px solid var(--rose-danger)' : '4px solid var(--emerald-success)',
          background: aiResult.riskTier === 'suspicious' ? 'rgba(38, 16, 24, 0.9)' : 'var(--bg-card)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="badge badge-purple">AI SaMD Triage Certificate</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  ID: {aiResult.assessmentId} • {aiResult.assessmentDate}
                </span>
              </div>
              <h3 style={{ fontSize: '1.35rem', marginTop: '6px', color: '#fff' }}>
                Assessment Output: {aiResult.riskTier.toUpperCase().replace('_', ' ')}
              </h3>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ textAlign: 'center', padding: '8px 14px', background: 'rgba(0,0,0,0.3)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Risk Score</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: aiResult.riskScore >= 75 ? 'var(--rose-danger)' : 'var(--teal-light)' }}>
                  {aiResult.riskScore}/100
                </div>
              </div>
              <div style={{ textAlign: 'center', padding: '8px 14px', background: 'rgba(0,0,0,0.3)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Model Confidence</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--teal-light)' }}>
                  {aiResult.confidencePercentage}%
                </div>
              </div>
            </div>
          </div>

          {/* Key Findings List */}
          <div style={{ marginTop: '16px' }}>
            <h5 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
              Automated Algorithmic Findings:
            </h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {aiResult.keyFindings.map((finding, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: '#e2e8f0' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--teal-light)', flexShrink: 0 }} />
                  <span>{finding}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Suggested Clinical Action */}
          <div style={{ marginTop: '16px', padding: '12px 16px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--teal-light)', textTransform: 'uppercase' }}>
              Recommended Clinical Next Step:
            </div>
            <p style={{ fontSize: '0.85rem', color: '#fff', marginTop: '4px' }}>
              {aiResult.suggestedAction}
            </p>
          </div>

          {/* Mandatory Responsible AI & Limitations Disclaimer */}
          <div style={{ marginTop: '16px', padding: '12px 14px', background: 'rgba(244, 63, 94, 0.1)', border: '1px solid rgba(244, 63, 94, 0.25)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#fb7185', fontWeight: 700, fontSize: '0.75rem' }}>
              <AlertTriangle size={14} />
              <span>MANDATORY CLINICAL & REGULATORY LIMITATIONS NOTICE</span>
            </div>
            <p style={{ fontSize: '0.76rem', color: '#fecdd3', marginTop: '4px', lineHeight: 1.5 }}>
              {aiResult.limitationsDisclaimer}
            </p>
          </div>

          {/* Forward for Clinical Review Action */}
          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={() => {
                setUserRole('doctor');
                setActiveTab('dashboard');
                addToast('Switched to Doctor Dashboard: Review pending for Priya Sharma.', 'success');
              }}
              className="btn btn-primary"
            >
              <Stethoscope size={15} />
              <span>Forward to Qualified Clinician for In-Person Review</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
