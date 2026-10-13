import React, { useState } from 'react';
import { MapPin, Clock, Phone, Mail, Instagram, ArrowUpRight, Calendar, Check, Loader2, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { api } from '../services/api';

interface VisitSectionProps {
  onOpenReservationModal: () => void;
}

export const VisitSection: React.FC<VisitSectionProps> = ({ onOpenReservationModal }) => {
  const [mapZoom, setMapZoom] = useState(false);
  const [inquirySent, setInquirySent] = useState(false);
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [inquiryMessage, setInquiryMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryEmail) return;

    setIsLoading(true);
    setErrorMessage(null);
    setInquiryMessage(null);

    try {
      const response = await api.subscribeNewsletter(inquiryEmail);
      if (response.success) {
        setInquirySent(true);
        setInquiryMessage(response.message || 'Thank you for joining the Atelier Dispatch.');
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#C58B52', '#F4EBDD', '#6F4935'],
        });
        setTimeout(() => {
          setInquirySent(false);
          setInquiryEmail('');
          setInquiryMessage(null);
        }, 5000);
      } else {
        setErrorMessage(response.error || 'Subscription failed.');
      }
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Unable to connect to the server.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="visit" className="relative w-full py-28 bg-[#171411] text-[#F4EBDD] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#C58B52] font-sans">
            <span>Location & Sanctuaries</span>
            <span aria-hidden="true">·</span>
            <span>Saint-Germain-des-Prés</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-[#F4EBDD] mt-3">
            VISIT US.
          </h2>
          <p className="text-sm md:text-base text-[#F4EBDD]/70 font-sans font-light mt-3 max-w-xl">
            A sanctuary tucked away from Parisian avenue noise. Come for dawn espresso, afternoon pour-overs, or weekend cupping flights.
          </p>
        </div>

        {/* 2-Column Layout: Contact & Hours Info + Stylized Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Info Card (5 cols) */}
          <div className="lg:col-span-5 rounded-[32px] bg-[#201C18] border border-white/10 p-8 md:p-10 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
            <div className="space-y-8">
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full border border-[#C58B52]/30 flex items-center justify-center shrink-0 text-[#C58B52] mt-0.5">
                  <MapPin size={18} />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#F4EBDD]/50 font-sans block">
                    Address
                  </span>
                  <p className="font-serif text-xl text-[#F4EBDD] mt-1">
                    74 Boulevard Saint-Germain
                  </p>
                  <p className="text-xs text-[#F4EBDD]/70 font-sans mt-0.5">
                    75005 Paris, France (Metro Maubert-Mutualité)
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full border border-[#C58B52]/30 flex items-center justify-center shrink-0 text-[#C58B52] mt-0.5">
                  <Clock size={18} />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#F4EBDD]/50 font-sans block">
                    Opening Hours
                  </span>
                  <div className="mt-1 space-y-1 text-xs font-sans">
                    <div className="flex items-center justify-between gap-6">
                      <span className="text-[#F4EBDD]/80">Monday — Friday</span>
                      <span className="font-mono tabular-nums text-[#F4EBDD]">07:30 — 18:30</span>
                    </div>
                    <div className="flex items-center justify-between gap-6">
                      <span className="text-[#F4EBDD]/80">Saturday — Sunday</span>
                      <span className="font-mono tabular-nums text-[#F4EBDD]">08:30 — 19:00</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full border border-[#C58B52]/30 flex items-center justify-center shrink-0 text-[#C58B52] mt-0.5">
                  <Mail size={18} />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#F4EBDD]/50 font-sans block">
                    Inquiries & Cupping
                  </span>
                  <p className="font-serif text-lg text-[#F4EBDD] mt-1">
                    concierge@atelierdor.coffee
                  </p>
                  <div className="flex items-center gap-4 text-xs text-[#F4EBDD]/60 mt-1 font-sans">
                    <span>+33 1 42 68 50 12</span>
                    <span aria-hidden="true">·</span>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#C58B52] hover:underline flex items-center gap-1"
                    >
                      <Instagram size={12} /> @atelierdor.paris
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Reservation Callout */}
            <div className="mt-10 pt-8 border-t border-white/5">
              <button
                onClick={onOpenReservationModal}
                className="w-full py-4 px-6 rounded-full bg-[#C58B52] hover:bg-[#F4EBDD] text-[#171411] font-semibold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:scale-[1.01] active:scale-[0.99]"
              >
                <Calendar size={16} />
                Reserve a Table or Cupping Session
              </button>
            </div>
          </div>

          {/* Interactive Stylized Map Preview (7 cols) */}
          <div className="lg:col-span-7 rounded-[32px] overflow-hidden bg-[#201C18] border border-white/10 relative shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col justify-between min-h-[420px]">
            {/* Custom Dark Vector Stylized Parisian Map */}
            <div className="relative w-full h-full min-h-[380px] bg-[#1A1613] overflow-hidden flex items-center justify-center">
              <svg viewBox="0 0 800 500" className="w-full h-full object-cover select-none">
                <rect width="800" height="500" fill="#181512" />
                {/* River Seine Curve */}
                <path
                  d="M0,80 C200,60 400,140 600,100 C700,80 750,90 800,110 L800,170 C750,150 700,140 600,160 C400,200 200,120 0,140 Z"
                  fill="#2A241F"
                  stroke="#3A322C"
                  strokeWidth="2"
                />
                <text x="360" y="145" fill="#4E4237" fontSize="13" fontFamily="sans-serif" letterSpacing="4">
                  LA SEINE
                </text>

                {/* Major Streets Grid */}
                <path d="M0,280 L800,220" stroke="#362E27" strokeWidth="18" fill="none" />
                <path d="M0,280 L800,220" stroke="#251E19" strokeWidth="14" fill="none" />
                <text x="240" y="270" fill="#C58B52" opacity="0.6" fontSize="11" fontFamily="sans-serif" letterSpacing="3" transform="rotate(-4 240 270)">
                  BD SAINT-GERMAIN
                </text>

                <path d="M120,0 L260,500" stroke="#2B241E" strokeWidth="10" fill="none" />
                <path d="M380,0 L420,500" stroke="#2B241E" strokeWidth="12" fill="none" />
                <text x="390" y="440" fill="#6A5A4A" fontSize="10" fontFamily="sans-serif" letterSpacing="2">
                  RUE SAINT-JACQUES
                </text>

                <path d="M580,0 L530,500" stroke="#2B241E" strokeWidth="10" fill="none" />
                <path d="M0,380 L800,380" stroke="#26201B" strokeWidth="8" fill="none" />

                {/* Notre Dame / Latin Quarter Landmark labels */}
                <circle cx="340" cy="115" r="16" fill="#332A22" stroke="#5E4E3F" strokeWidth="1.5" />
                <text x="365" y="118" fill="#7D6B5A" fontSize="10" fontFamily="serif">
                  Île de la Cité
                </text>

                {/* Metro Stations */}
                <circle cx="310" cy="265" r="5" fill="#74765A" />
                <text x="320" y="260" fill="#8E9171" fontSize="9" fontFamily="sans-serif">
                  M4 Saint-Germain
                </text>
                <circle cx="510" cy="245" r="5" fill="#74765A" />
                <text x="520" y="240" fill="#8E9171" fontSize="9" fontFamily="sans-serif">
                  M10 Maubert
                </text>

                {/* Atelier d'Or Pin Marker */}
                <g transform="translate(420, 240)">
                  <circle cx="0" cy="0" r="32" fill="#C58B52" opacity="0.15" className="animate-ping" />
                  <circle cx="0" cy="0" r="14" fill="#C58B52" />
                  <circle cx="0" cy="0" r="6" fill="#171411" />
                  {/* Pin Callout Box */}
                  <rect x="-85" y="-55" width="170" height="38" rx="8" fill="#171411" stroke="#C58B52" strokeWidth="1.5" />
                  <text x="0" y="-36" fill="#F4EBDD" fontSize="11" fontFamily="serif" fontWeight="bold" textAnchor="middle">
                    ATELIER D'OR
                  </text>
                  <text x="0" y="-23" fill="#C58B52" fontSize="9" fontFamily="sans-serif" textAnchor="middle">
                    74 BD SAINT-GERMAIN
                  </text>
                </g>
              </svg>

              {/* Map Floating Actions */}
              <div className="absolute top-4 right-4 z-10 flex gap-2">
                <a
                  href="https://maps.google.com/?q=74+Boulevard+Saint-Germain+Paris"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full bg-[#171411]/90 backdrop-blur-md border border-white/10 text-xs font-sans uppercase tracking-widest text-[#F4EBDD] hover:text-[#C58B52] hover:border-[#C58B52] transition-all flex items-center gap-1.5 shadow-lg"
                >
                  <span>Open in Google Maps</span>
                  <ArrowUpRight size={12} />
                </a>
              </div>
            </div>

            {/* Quick newsletter inquiry bar at bottom of map */}
            <div className="p-6 bg-[#1A1613] border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="font-serif text-lg text-[#F4EBDD] block">
                  Join the Atelier Dispatch
                </span>
                <span className="text-xs text-[#F4EBDD]/60 font-sans">
                  Monthly releases of rare micro-lots & private tasting invitations.
                </span>
              </div>
              <div className="flex flex-col sm:items-end gap-2 w-full sm:w-auto">
                <form onSubmit={handleInquiry} className="flex items-center gap-2 w-full sm:w-auto">
                  <input
                    type="email"
                    required
                    disabled={isLoading}
                    value={inquiryEmail}
                    onChange={(e) => setInquiryEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="px-4 py-2.5 rounded-full bg-[#171411] border border-white/10 text-xs text-[#F4EBDD] placeholder:text-[#F4EBDD]/40 focus:outline-none focus:border-[#C58B52] w-full sm:w-56 disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-5 py-2.5 rounded-full bg-[#F4EBDD] hover:bg-[#C58B52] text-[#171411] text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer shrink-0 disabled:opacity-50 flex items-center gap-1.5"
                  >
                    {isLoading && <Loader2 size={12} className="animate-spin" />}
                    <span>{inquirySent ? 'Joined' : isLoading ? 'Joining...' : 'Subscribe'}</span>
                  </button>
                </form>

                {inquiryMessage && (
                  <p className="text-[11px] text-[#C58B52] font-sans">
                    {inquiryMessage}
                  </p>
                )}
                {errorMessage && (
                  <p className="text-[11px] text-red-400 font-sans">
                    {errorMessage}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
