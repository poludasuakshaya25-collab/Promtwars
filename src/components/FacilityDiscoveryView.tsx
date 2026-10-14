import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Search, 
  MapPin, 
  Building2, 
  Phone, 
  ShieldCheck, 
  Calendar, 
  Clock, 
  DollarSign, 
  Filter, 
  CheckCircle2,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { MedicalFacility } from '../types';

export const FacilityDiscoveryView: React.FC = () => {
  const { facilities, bookAppointment, activePathway, patient } = useApp();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [schemeOnly, setSchemeOnly] = useState<boolean>(false);
  const [bookingModalFacility, setBookingModalFacility] = useState<MedicalFacility | null>(null);
  const [selectedService, setSelectedService] = useState<string>('');
  const [selectedSlot, setSelectedSlot] = useState<string>('Tomorrow, 10:30 AM');

  const cities = ['All', 'Hyderabad', 'Mumbai', 'New Delhi', 'Bengaluru', 'Chennai'];
  const types = ['All', 'Comprehensive Cancer Hospital', 'Diagnostic & Imaging Centre', 'Specialized Pathology Lab'];

  const filteredFacilities = facilities.filter((fac) => {
    const matchesSearch = 
      fac.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fac.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fac.servicesOffered.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCity = selectedCity === 'All' || fac.city === selectedCity;
    const matchesType = selectedType === 'All' || fac.type === selectedType;
    const matchesScheme = !schemeOnly || fac.schemeAcceptance.some(s => s.includes('PM-JAY') || s.includes('Arogyasri'));

    return matchesSearch && matchesCity && matchesType && matchesScheme;
  });

  const handleOpenBooking = (fac: MedicalFacility) => {
    setBookingModalFacility(fac);
    setSelectedService(fac.servicesOffered[0] || 'Consultation');
  };

  const handleConfirmBooking = () => {
    if (bookingModalFacility) {
      bookAppointment(bookingModalFacility.id, selectedService, selectedSlot);
      setBookingModalFacility(null);
    }
  };

  return (
    <div>
      {/* Search Header Banner */}
      <div className="card" style={{ marginBottom: '24px', background: 'linear-gradient(135deg, #101726 0%, #064e3b 100%)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="badge badge-emerald">Nationwide India Directory</span>
              <span style={{ fontSize: '0.78rem', color: '#a7f3d0' }}>
                ABDM Health Facility Registry (HFR) Connected
              </span>
            </div>
            <h2 style={{ fontSize: '1.5rem', marginTop: '6px' }}>
              Medical Facilities & Service Availability Across India
            </h2>
            <p style={{ color: '#d1fae5', fontSize: '0.88rem', maxWidth: '780px', marginTop: '4px' }}>
              Real-time directory of NABH/NABL accredited cancer hospitals, diagnostic labs, imaging suites, and biopsy centers across India with live slot freshness and Ayushman Bharat PM-JAY empanelment.
            </p>
          </div>

          <div style={{
            background: 'rgba(0, 0, 0, 0.3)',
            padding: '12px 18px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.72rem', color: '#a7f3d0', textTransform: 'uppercase' }}>Verified Centers</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#34d399' }}>
              {facilities.length}+ Institutes
            </div>
            <div style={{ fontSize: '0.68rem', color: '#d1fae5' }}>Live slot sync enabled</div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="card" style={{ marginBottom: '24px', padding: '18px' }}>
        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Search Input */}
          <div style={{ flex: 1, minWidth: '260px', position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search by hospital name, service (e.g. Biopsy, PET-CT, TrueBeam, IHC)..."
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

          {/* City Filter */}
          <div style={{ minWidth: '150px' }}>
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
                <option key={city} value={city}>{city === 'All' ? 'All Cities (India)' : city}</option>
              ))}
            </select>
          </div>

          {/* Facility Type Filter */}
          <div style={{ minWidth: '180px' }}>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
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
              {types.map((type) => (
                <option key={type} value={type}>{type === 'All' ? 'All Facility Types' : type}</option>
              ))}
            </select>
          </div>

          {/* Ayushman Bharat Toggle */}
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.82rem',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            padding: '8px 12px',
            background: schemeOnly ? 'rgba(16, 185, 129, 0.15)' : 'var(--bg-card-subtle)',
            border: schemeOnly ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)'
          }}>
            <input
              type="checkbox"
              checked={schemeOnly}
              onChange={(e) => setSchemeOnly(e.target.checked)}
              style={{ accentColor: 'var(--emerald-success)' }}
            />
            <span>PM-JAY / State Scheme Empaneled Only</span>
          </label>
        </div>
      </div>

      {/* Facilities Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '20px' }}>
        {filteredFacilities.map((fac) => (
          <div
            key={fac.id}
            className="card card-interactive"
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          >
            <div>
              {/* Card Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span className="badge badge-teal">{fac.accreditation}</span>
                    <span className="badge badge-blue">{fac.type}</span>
                  </div>
                  <h3 style={{ fontSize: '1.15rem', color: '#fff', marginTop: '6px', lineHeight: 1.3 }}>
                    {fac.name}
                  </h3>
                </div>

                <div style={{
                  textAlign: 'right',
                  padding: '6px 10px',
                  borderRadius: 'var(--radius-sm)',
                  background: fac.liveSlotStatus.includes('Available Today') ? 'rgba(16, 185, 129, 0.15)' : 'rgba(59, 130, 246, 0.15)',
                  border: fac.liveSlotStatus.includes('Available Today') ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(59, 130, 246, 0.3)',
                  flexShrink: 0
                }}>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Live Slot Status</div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: fac.liveSlotStatus.includes('Available Today') ? 'var(--emerald-success)' : 'var(--blue-light)' }}>
                    {fac.liveSlotStatus}
                  </div>
                </div>
              </div>

              {/* Address & Contact */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '10px', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                <MapPin size={13} style={{ color: 'var(--teal-light)', flexShrink: 0 }} />
                <span>{fac.address}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                <Phone size={13} style={{ flexShrink: 0 }} />
                <span>{fac.phone}</span>
              </div>

              {/* Supported Services Tags */}
              <div style={{ marginTop: '14px' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Available Services & Equipment:
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {fac.servicesOffered.map((svc, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontSize: '0.72rem',
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid var(--border-subtle)',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        color: '#e2e8f0'
                      }}
                    >
                      {svc}
                    </span>
                  ))}
                </div>
              </div>

              {/* Scheme Empanelment Badges */}
              <div style={{ marginTop: '14px' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Financial Schemes & Insurance:
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {fac.schemeAcceptance.map((sch, idx) => (
                    <span
                      key={idx}
                      className="badge badge-emerald"
                      style={{ fontSize: '0.65rem' }}
                    >
                      ✓ {sch}
                    </span>
                  ))}
                </div>
              </div>

              {/* Estimated Pricing & Waiting Times */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '16px',
                padding: '10px 12px',
                background: 'var(--bg-card-subtle)',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.78rem'
              }}>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Est. Cost: </span>
                  <strong style={{ color: '#fff' }}>{fac.estimatedCostRange}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Wait Time: </span>
                  <strong style={{ color: 'var(--teal-light)' }}>
                    {fac.waitingTimeDays === 0 ? 'Same Day' : `${fac.waitingTimeDays} Days`}
                  </strong>
                </div>
              </div>

              {/* Live Freshness Tag */}
              <div style={{ marginTop: '10px', fontSize: '0.7rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span className="pulse-dot pulse-dot-green" style={{ width: '6px', height: '6px' }} />
                <span>{fac.dataFreshnessTag}</span>
              </div>
            </div>

            {/* Book / Request Slot Button */}
            <div style={{ marginTop: '18px', borderTop: '1px solid var(--border-subtle)', paddingTop: '14px' }}>
              <button
                onClick={() => handleOpenBooking(fac)}
                className="btn btn-primary"
                style={{ width: '100%', padding: '10px', fontSize: '0.85rem' }}
              >
                <Calendar size={15} />
                <span>Book Slot or Issue Referral Requisition</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Appointment Booking Modal */}
      {bookingModalFacility && (
        <div className="modal-overlay" onClick={() => setBookingModalFacility(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '26px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '14px', marginBottom: '18px' }}>
              <div>
                <span className="badge badge-teal">Direct Booking Request</span>
                <h3 style={{ fontSize: '1.2rem', marginTop: '4px' }}>{bookingModalFacility.name}</h3>
              </div>
              <button
                onClick={() => setBookingModalFacility(null)}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '1.2rem', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.85rem' }}>
              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                  Patient Profile:
                </label>
                <div style={{ padding: '10px', background: 'var(--bg-card-subtle)', borderRadius: 'var(--radius-sm)' }}>
                  <strong>{patient.name}</strong> (Age {patient.age}, {patient.city}) • Star Health & PM-JAY Eligible
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                  Select Required Diagnostic Service:
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
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
                  {bookingModalFacility.servicesOffered.map((svc, idx) => (
                    <option key={idx} value={svc}>{svc}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                  Select Preferred Slot:
                </label>
                <select
                  value={selectedSlot}
                  onChange={(e) => setSelectedSlot(e.target.value)}
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
                  <option value="Today, 03:00 PM">Today, 03:00 PM (Emergency Triage Slot)</option>
                  <option value="Tomorrow, 10:30 AM">Tomorrow, 10:30 AM (Standard Verified Slot)</option>
                  <option value="Tomorrow, 02:00 PM">Tomorrow, 02:00 PM</option>
                  <option value="Thursday, 11:00 AM">Thursday, 11:00 AM</option>
                </select>
              </div>

              <div style={{ padding: '12px', background: 'rgba(20, 184, 166, 0.1)', border: '1px solid rgba(20, 184, 166, 0.25)', borderRadius: 'var(--radius-md)', fontSize: '0.76rem', color: '#ccfbf1' }}>
                ✓ Electronic requisition slip will be transmitted to the facility dispatch desk. SMS & WhatsApp confirmation with QR code will be dispatched to patient phone.
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => setBookingModalFacility(null)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmBooking}
                  className="btn btn-primary"
                >
                  <CheckCircle2 size={15} />
                  <span>Confirm Appointment & Transmit Referral</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
