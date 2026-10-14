import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  FileText, 
  Upload, 
  Search, 
  Filter, 
  ShieldCheck, 
  Eye, 
  Download, 
  CheckCircle2, 
  Calendar, 
  User, 
  Building,
  AlertTriangle,
  Lock
} from 'lucide-react';
import { MedicalRecord } from '../types';

export const RecordsVaultView: React.FC = () => {
  const { records, uploadRecord, patient, addToast } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedRecordModal, setSelectedRecordModal] = useState<MedicalRecord | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);

  // New record form state
  const [newTitle, setNewTitle] = useState<string>('');
  const [newCategory, setNewCategory] = useState<MedicalRecord['category']>('imaging');
  const [newAuthor, setNewAuthor] = useState<string>('Dr. Ananya Sen');
  const [newInstitution, setNewInstitution] = useState<string>('Basavatarakam Cancer Hospital');
  const [newSummary, setNewSummary] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All Records' },
    { id: 'imaging', label: 'Imaging (Mammogram / CT / MRI)' },
    { id: 'pathology', label: 'Pathology & Biopsies' },
    { id: 'clinical_note', label: 'Clinical Notes & Triage' },
    { id: 'referral', label: 'Referrals & Requisitions' }
  ];

  const filteredRecords = records.filter((rec) => {
    const matchesCategory = selectedCategory === 'all' || rec.category === selectedCategory;
    const matchesSearch = 
      rec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newSummary) {
      addToast('Please provide a record title and summary.', 'warning');
      return;
    }

    uploadRecord({
      patientId: patient.id,
      title: newTitle,
      category: newCategory,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' IST',
      author: newAuthor,
      institution: newInstitution,
      fileSize: '2.4 MB (Encrypted)',
      fileType: 'PDF / DICOM',
      summary: newSummary,
      fhirResourceType: newCategory === 'imaging' ? 'DiagnosticReport' : 'Observation',
      isCritical: false
    });

    setIsUploadModalOpen(false);
    setNewTitle('');
    setNewSummary('');
  };

  return (
    <div>
      {/* Header Banner */}
      <div className="card" style={{ marginBottom: '24px', background: 'linear-gradient(135deg, #101726 0%, #1e293b 100%)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="badge badge-teal">Encrypted Health Vault</span>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                FHIR R4 DiagnosticReport & Observation Standards
              </span>
            </div>
            <h2 style={{ fontSize: '1.5rem', marginTop: '6px' }}>
              Centralized Medical Records: {patient.name}
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', maxWidth: '800px', marginTop: '4px' }}>
              Unified repository containing screening certificates, full-resolution mammograms, biopsy histopathology slides, IHC biomarker panels, multidisciplinary tumor board summaries, and clinician prescriptions.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="btn btn-primary"
            >
              <Upload size={15} />
              <span>Upload Medical Document</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="card" style={{ marginBottom: '24px', padding: '16px' }}>
        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ flex: 1, minWidth: '260px', position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search by report name, author, or finding summary..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px 10px 38px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-card-subtle)',
                border: '1px solid var(--border-subtle)',
                color: '#fff',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.85rem'
              }}
            />
          </div>

          {/* Category Tabs */}
          <div style={{ display: 'flex', gap: '6px', overflowX: 'auto' }}>
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className="btn btn-sm"
                style={{
                  background: selectedCategory === c.id ? 'var(--teal-glow)' : 'var(--bg-card-subtle)',
                  color: selectedCategory === c.id ? 'var(--teal-light)' : 'var(--text-secondary)',
                  border: selectedCategory === c.id ? '1px solid var(--teal-primary)' : '1px solid var(--border-subtle)',
                  whiteSpace: 'nowrap'
                }}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Records Cards List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filteredRecords.map((rec) => (
          <div
            key={rec.id}
            className="card card-interactive"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 20px',
              gap: '16px',
              flexWrap: 'wrap',
              borderLeft: rec.isCritical ? '4px solid var(--rose-danger)' : '4px solid var(--teal-primary)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', flex: 1, minWidth: '300px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: rec.isCritical ? 'rgba(244, 63, 94, 0.15)' : 'rgba(20, 184, 166, 0.15)',
                color: rec.isCritical ? '#fb7185' : 'var(--teal-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <FileText size={20} />
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <h4 style={{ fontSize: '1rem', color: '#fff', margin: 0 }}>
                    {rec.title}
                  </h4>
                  <span className="badge badge-teal" style={{ fontSize: '0.65rem' }}>
                    {rec.category.toUpperCase().replace('_', ' ')}
                  </span>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.04)', padding: '2px 6px', borderRadius: '4px' }}>
                    FHIR: {rec.fhirResourceType}
                  </span>
                </div>

                <p style={{ fontSize: '0.8rem', color: '#cbd5e1', marginTop: '4px', maxWidth: '750px', lineHeight: 1.4 }}>
                  {rec.summary}
                </p>

                <div style={{ display: 'flex', gap: '18px', marginTop: '6px', fontSize: '0.72rem', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
                  <span>📅 {rec.date}</span>
                  <span>👨‍⚕️ Author: {rec.author}</span>
                  <span>🏥 {rec.institution}</span>
                  <span>💾 {rec.fileSize}</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setSelectedRecordModal(rec)}
                className="btn btn-sm btn-secondary"
              >
                <Eye size={13} />
                <span>View Full Record</span>
              </button>
              <button
                onClick={() => addToast(`Downloading verified cryptographically signed record: "${rec.title}"`, 'info')}
                className="btn btn-sm btn-outline"
                title="Download encrypted PDF / DICOM"
              >
                <Download size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Record Preview Modal */}
      {selectedRecordModal && (
        <div className="modal-overlay" onClick={() => setSelectedRecordModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '16px', marginBottom: '18px' }}>
              <div>
                <span className="badge badge-teal">FHIR R4 Verified Record</span>
                <h3 style={{ fontSize: '1.25rem', marginTop: '4px' }}>{selectedRecordModal.title}</h3>
              </div>
              <button
                onClick={() => setSelectedRecordModal(null)}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '1.2rem', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.85rem' }}>
              <div>
                <strong style={{ color: 'var(--text-muted)' }}>Patient Identifier:</strong>
                <span style={{ marginLeft: '6px', color: '#fff' }}>{patient.name} ({patient.id})</span>
              </div>
              <div>
                <strong style={{ color: 'var(--text-muted)' }}>Date & Author:</strong>
                <span style={{ marginLeft: '6px', color: '#fff' }}>{selectedRecordModal.date} • {selectedRecordModal.author}</span>
              </div>
              <div>
                <strong style={{ color: 'var(--text-muted)' }}>Issuing Institution:</strong>
                <span style={{ marginLeft: '6px', color: '#fff' }}>{selectedRecordModal.institution}</span>
              </div>

              <div>
                <strong style={{ color: 'var(--text-muted)' }}>Clinical Summary & Findings:</strong>
                <div style={{ marginTop: '6px', padding: '14px', background: 'var(--bg-card-subtle)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', lineHeight: 1.6, color: '#e2e8f0' }}>
                  {selectedRecordModal.summary}
                </div>
              </div>

              <div style={{ padding: '12px', background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.25)', borderRadius: 'var(--radius-md)', fontSize: '0.75rem', color: '#a7f3d0' }}>
                🔒 <strong>Cryptographic Audit Guarantee:</strong> This document hash is immutably anchored. Access log records timestamp, requesting provider IP, and valid patient consent token.
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => setSelectedRecordModal(null)}
                  className="btn btn-secondary"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    addToast(`Signed copy of ${selectedRecordModal.title} exported.`, 'success');
                    setSelectedRecordModal(null);
                  }}
                  className="btn btn-primary"
                >
                  <Download size={15} />
                  <span>Download Signed Export</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload New Record Modal */}
      {isUploadModalOpen && (
        <div className="modal-overlay" onClick={() => setIsUploadModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '14px', marginBottom: '18px' }}>
              <div>
                <span className="badge badge-teal">Secure Document Ingestion</span>
                <h3 style={{ fontSize: '1.25rem', marginTop: '4px' }}>Upload Medical Record</h3>
              </div>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '1.2rem', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.85rem' }}>
              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                  Document Title:
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Whole-Body 18F-FDG PET-CT Staging Scan"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-card-subtle)',
                    border: '1px solid var(--border-subtle)',
                    color: '#fff',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.85rem'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                  Record Classification:
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-card-subtle)',
                    border: '1px solid var(--border-subtle)',
                    color: '#fff',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.85rem'
                  }}
                >
                  <option value="imaging">Imaging (DICOM, CT, Mammogram)</option>
                  <option value="pathology">Pathology & Biopsy Histology</option>
                  <option value="lab_report">Blood / Genomic / Biomarker Panel</option>
                  <option value="clinical_note">Clinical Note / Consultation</option>
                  <option value="referral">Referral Order / Requisition</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                  Issuing Doctor & Hospital:
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                  <input
                    type="text"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    placeholder="Doctor Name"
                    style={{
                      padding: '10px',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--bg-card-subtle)',
                      border: '1px solid var(--border-subtle)',
                      color: '#fff',
                      fontSize: '0.85rem'
                    }}
                  />
                  <input
                    type="text"
                    value={newInstitution}
                    onChange={(e) => setNewInstitution(e.target.value)}
                    placeholder="Hospital / Diagnostic Lab"
                    style={{
                      padding: '10px',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--bg-card-subtle)',
                      border: '1px solid var(--border-subtle)',
                      color: '#fff',
                      fontSize: '0.85rem'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                  Clinical Findings Summary:
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Enter detailed conclusion, histology grade, or impression..."
                  value={newSummary}
                  onChange={(e) => setNewSummary(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-card-subtle)',
                    border: '1px solid var(--border-subtle)',
                    color: '#fff',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.85rem'
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  <Upload size={15} />
                  <span>Upload & Classify Document</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
