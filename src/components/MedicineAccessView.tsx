import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Pill, 
  Search, 
  MapPin, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  RefreshCw,
  Building,
  HelpCircle,
  FileCheck
} from 'lucide-react';
import { OncologyMedicine } from '../types';

export const MedicineAccessView: React.FC = () => {
  const { medicines, requestMedicineRefill, patient } = useApp();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [refillModalMed, setRefillModalMed] = useState<OncologyMedicine | null>(null);
  const [refillCity, setRefillCity] = useState<string>('Hyderabad');

  const categories = ['All', 'Targeted Therapy', 'Immunotherapy', 'Chemotherapy', 'Hormone Therapy'];
  const cities = ['All', 'Hyderabad', 'Mumbai', 'Delhi', 'Bengaluru', 'Chennai'];

  const filteredMedicines = medicines.filter((med) => {
    const matchesSearch = 
      med.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.genericName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.cancerIndication.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || med.category === selectedCategory;
    const matchesCity = selectedCity === 'All' || med.stockAvailability.some(s => s.city === selectedCity);

    return matchesSearch && matchesCategory && matchesCity;
  });

  const handleOpenRefill = (med: OncologyMedicine) => {
    setRefillModalMed(med);
  };

  const handleConfirmRefill = () => {
    if (refillModalMed) {
      requestMedicineRefill(refillModalMed.id, refillCity);
      setRefillModalMed(null);
    }
  };

  return (
    <div>
      {/* Medicine Access Header */}
      <div className="card" style={{ marginBottom: '24px', background: 'linear-gradient(135deg, #101726 0%, #1e1b4b 100%)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="badge badge-teal">Verified Pharmacy Network</span>
              <span style={{ fontSize: '0.78rem', color: '#c7d2fe' }}>
                CDSCO Licensed Channels Only
              </span>
            </div>
            <h2 style={{ fontSize: '1.5rem', marginTop: '6px' }}>
              Oncology Medicine Availability & Financial Access Programs
            </h2>
            <p style={{ color: '#e0e7ff', fontSize: '0.88rem', maxWidth: '800px', marginTop: '4px' }}>
              Locate verified in-stock oncology pharmaceuticals across hospital pharmacies and specialized cancer dispensaries. Compare certified generic alternatives and access manufacturer Patient Assistance Programs (PAP).
            </p>
          </div>

          <div style={{
            background: 'rgba(0, 0, 0, 0.3)',
            padding: '12px 18px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(99, 102, 241, 0.4)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.72rem', color: '#c7d2fe', textTransform: 'uppercase' }}>Tracked Drugs</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--blue-light)' }}>
              {medicines.length}+ Therapeutics
            </div>
            <div style={{ fontSize: '0.68rem', color: '#e0e7ff' }}>Stock verified daily</div>
          </div>
        </div>

        {/* Clinical Safety Disclaimer */}
        <div style={{
          marginTop: '16px',
          padding: '10px 14px',
          background: 'rgba(0, 0, 0, 0.25)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: 'var(--radius-md)',
          fontSize: '0.75rem',
          color: '#cbd5e1',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <AlertCircle size={15} style={{ color: '#38bdf8', flexShrink: 0 }} />
          <span>
            <strong>Prescription Mandate:</strong> AI CancerConnect never prescribes cancer medicines or substitutes dosages autonomously. All listings require a valid prescription digitally signed by an authorized oncologist.
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="card" style={{ marginBottom: '24px', padding: '18px' }}>
        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Search Box */}
          <div style={{ flex: 1, minWidth: '260px', position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search by brand name (Herceptin), generic (Trastuzumab), or cancer type..."
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

          {/* Category Filter */}
          <div style={{ minWidth: '180px' }}>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
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
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat === 'All' ? 'All Drug Classes' : cat}</option>
              ))}
            </select>
          </div>

          {/* City Filter */}
          <div style={{ minWidth: '160px' }}>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
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
              {cities.map((city) => (
                <option key={city} value={city}>{city === 'All' ? 'All Metro Pharmacies' : `${city} Pharmacies`}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Medicines Cards List */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(430px, 1fr))', gap: '20px' }}>
        {filteredMedicines.map((med) => (
          <div
            key={med.id}
            className="card card-interactive"
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          >
            <div>
              {/* Card Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span className="badge badge-purple">{med.category}</span>
                    <span className="badge badge-teal">Rx Mandatory</span>
                  </div>
                  <h3 style={{ fontSize: '1.25rem', color: '#fff', marginTop: '6px' }}>
                    {med.brandName}
                  </h3>
                  <div style={{ fontSize: '0.85rem', color: 'var(--teal-light)', fontWeight: 600 }}>
                    {med.genericName}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Dosage / Form: {med.dosageStrength}
                  </div>
                </div>

                <div style={{
                  textAlign: 'right',
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--bg-card-subtle)',
                  border: '1px solid var(--border-subtle)',
                  flexShrink: 0
                }}>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Brand Price (Est.)</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#f8fafc' }}>
                    ₹{med.estBrandPriceINR.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              {/* Indication */}
              <div style={{ marginTop: '12px', fontSize: '0.8rem', color: '#cbd5e1' }}>
                <strong>Approved Clinical Indication:</strong> {med.cancerIndication}
              </div>

              {/* Generic Alternative & Savings Card */}
              {med.genericEquivalent && med.estGenericPriceINR && (
                <div style={{
                  marginTop: '12px',
                  padding: '10px 12px',
                  background: 'rgba(16, 185, 129, 0.08)',
                  border: '1px solid rgba(16, 185, 129, 0.25)',
                  borderRadius: 'var(--radius-md)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.72rem', color: '#34d399', fontWeight: 700, textTransform: 'uppercase' }}>
                      Certified Generic Alternative:
                    </span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--emerald-success)', fontWeight: 700 }}>
                      Save ~{Math.round(((med.estBrandPriceINR - med.estGenericPriceINR) / med.estBrandPriceINR) * 100)}%
                    </span>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#fff', fontWeight: 600, marginTop: '2px' }}>
                    {med.genericEquivalent}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#a7f3d0' }}>
                    Generic Price: ₹{med.estGenericPriceINR.toLocaleString('en-IN')} (Subject to Clinician Approval)
                  </div>
                </div>
              )}

              {/* Patient Assistance Program (PAP) Alert */}
              {med.papAssistanceAvailable && med.papDetails && (
                <div style={{
                  marginTop: '10px',
                  padding: '10px 12px',
                  background: 'rgba(99, 102, 241, 0.1)',
                  border: '1px solid rgba(99, 102, 241, 0.3)',
                  borderRadius: 'var(--radius-md)'
                }}>
                  <div style={{ fontSize: '0.72rem', color: '#a5b4fc', fontWeight: 700, textTransform: 'uppercase' }}>
                    ★ Patient Assistance Program (PAP) Active:
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#e0e7ff', marginTop: '2px', lineHeight: 1.4 }}>
                    {med.papDetails}
                  </div>
                </div>
              )}

              {/* Stock Across Verified Locations */}
              <div style={{ marginTop: '14px' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Live Stock at Verified Pharmacies:
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {med.stockAvailability.map((stock, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontSize: '0.75rem',
                        padding: '6px 8px',
                        background: 'var(--bg-card-subtle)',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-subtle)'
                      }}
                    >
                      <div>
                        <span style={{ fontWeight: 600, color: '#fff' }}>{stock.pharmacy}</span>
                        <span style={{ color: 'var(--text-muted)', marginLeft: '6px' }}>({stock.city})</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span className="badge badge-emerald" style={{ fontSize: '0.62rem' }}>
                          In Stock ({stock.quantity})
                        </span>
                        <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                          {stock.verifiedTime}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Refill / Reservation Button */}
            <div style={{ marginTop: '16px', borderTop: '1px solid var(--border-subtle)', paddingTop: '12px' }}>
              <button
                onClick={() => handleOpenRefill(med)}
                className="btn btn-primary"
                style={{ width: '100%', padding: '9px', fontSize: '0.82rem' }}
              >
                <RefreshCw size={14} />
                <span>Reserve Medicine / Submit Refill Requisition</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Refill Request Modal */}
      {refillModalMed && (
        <div className="modal-overlay" onClick={() => setRefillModalMed(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '26px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '14px', marginBottom: '16px' }}>
              <div>
                <span className="badge badge-teal">Prescription Dispense Requisition</span>
                <h3 style={{ fontSize: '1.2rem', marginTop: '4px' }}>
                  {refillModalMed.brandName} ({refillModalMed.genericName})
                </h3>
              </div>
              <button
                onClick={() => setRefillModalMed(null)}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '1.2rem', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.85rem' }}>
              <div>
                <strong style={{ color: 'var(--text-muted)' }}>Patient:</strong> {patient.name} ({patient.city})
              </div>
              <div>
                <strong style={{ color: 'var(--text-muted)' }}>Treating Oncologist:</strong> Dr. Ananya Sen (Basavatarakam Cancer Hospital)
              </div>
              <div>
                <strong style={{ color: 'var(--text-muted)' }}>Dosage Form:</strong> {refillModalMed.dosageStrength}
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                  Preferred Pharmacy City for Collection / Delivery:
                </label>
                <select
                  value={refillCity}
                  onChange={(e) => setRefillCity(e.target.value)}
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
                  <option value="Hyderabad">Hyderabad (Basavatarakam In-House / Apollo Pharmacy Banjara)</option>
                  <option value="Mumbai">Mumbai (Tata Memorial In-House Pharmacy)</option>
                  <option value="Delhi">Delhi (Rajiv Gandhi / MedPlus)</option>
                  <option value="Bengaluru">Bengaluru (Kidwai / HCG)</option>
                </select>
              </div>

              <div style={{ padding: '12px', background: 'rgba(20, 184, 166, 0.1)', border: '1px solid rgba(20, 184, 166, 0.25)', borderRadius: 'var(--radius-md)', fontSize: '0.76rem', color: '#ccfbf1' }}>
                ✓ An automated prescription authorization check will be dispatched to Dr. Ananya Sen. Upon e-signature, the pharmacy will reserve the stock for same-day pick up or temperature-controlled courier delivery.
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setRefillModalMed(null)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmRefill}
                  className="btn btn-primary"
                >
                  <CheckCircle2 size={15} />
                  <span>Submit Dispense Requisition</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
