import React, { useState, useEffect } from 'react';
import { ShoppingBag, Volume2, VolumeX, Menu as MenuIcon, X } from 'lucide-react';
import { cafeSoundscape } from '../utils/audioAmbience';

interface NavbarProps {
  onOpenReservation: () => void;
  onOpenTray: () => void;
  trayItemCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenReservation,
  onOpenTray,
  trayItemCount,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleSound = () => {
    const newState = cafeSoundscape.toggle();
    setIsSoundOn(newState);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#171411]/90 backdrop-blur-md border-b border-white/5 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            className="font-serif text-2xl md:text-3xl font-normal tracking-wide text-[#F4EBDD] hover:text-[#C58B52] transition-colors whitespace-nowrap shrink-0"
          >
            ATELIER D'OR
          </a>

          {/* Zone 2: 4-5 clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest text-[#F4EBDD]/70 font-sans">
            <a
              href="#menu"
              className="hover:text-[#F4EBDD] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8"
            >
              Menu
            </a>
            <a
              href="#story"
              className="hover:text-[#F4EBDD] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8"
            >
              Our Story
            </a>
            <a
              href="#experiences"
              className="hover:text-[#F4EBDD] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8"
            >
              Experiences
            </a>
            <a
              href="#visit"
              className="hover:text-[#F4EBDD] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8"
            >
              Visit Us
            </a>
          </nav>

          {/* Zone 3: 1 primary action + subtle functional tray & audio controls */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Audio Ambience Toggle */}
            <button
              onClick={handleToggleSound}
              className={`p-2 rounded-full border transition-all ${
                isSoundOn
                  ? 'border-[#C58B52] text-[#C58B52] bg-[#C58B52]/10'
                  : 'border-white/10 text-[#F4EBDD]/60 hover:text-[#F4EBDD] hover:border-white/30'
              }`}
              title={isSoundOn ? 'Mute ambient cafe sound' : 'Listen to ambient cafe sound'}
              aria-label="Toggle cafe ambiance audio"
            >
              {isSoundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>

            {/* Tasting Tray Trigger */}
            <button
              onClick={onOpenTray}
              className="relative p-2 rounded-full border border-white/10 text-[#F4EBDD]/80 hover:text-[#F4EBDD] hover:border-white/30 transition-all"
              title="Open tasting tray"
              aria-label="View tasting tray"
            >
              <ShoppingBag size={16} />
              {trayItemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#C58B52] text-[#171411] text-[10px] font-bold rounded-full flex items-center justify-center tabular-nums">
                  {trayItemCount}
                </span>
              )}
            </button>

            {/* Primary Action Button */}
            <button
              onClick={onOpenReservation}
              className="hidden sm:inline-block px-5 py-2.5 text-xs uppercase tracking-widest font-medium text-[#171411] bg-[#F4EBDD] hover:bg-[#C58B52] rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap shrink-0 cursor-pointer"
            >
              Reserve a Table
            </button>

            {/* Mobile menu burger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#F4EBDD] hover:text-[#C58B52] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <MenuIcon size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#171411]/98 backdrop-blur-xl md:hidden flex flex-col pt-28 px-8">
          <nav className="flex flex-col gap-6 text-lg font-serif">
            <a
              href="#menu"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#F4EBDD] hover:text-[#C58B52] transition-colors border-b border-white/5 pb-3"
            >
              Menu & Offerings
            </a>
            <a
              href="#story"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#F4EBDD] hover:text-[#C58B52] transition-colors border-b border-white/5 pb-3"
            >
              Our Story & Terroir
            </a>
            <a
              href="#experiences"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#F4EBDD] hover:text-[#C58B52] transition-colors border-b border-white/5 pb-3"
            >
              The Café Experience
            </a>
            <a
              href="#visit"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#F4EBDD] hover:text-[#C58B52] transition-colors border-b border-white/5 pb-3"
            >
              Visit Us & Hours
            </a>
          </nav>
          <div className="mt-8 flex flex-col gap-4">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReservation();
              }}
              className="w-full py-3 text-xs uppercase tracking-widest font-medium text-[#171411] bg-[#F4EBDD] hover:bg-[#C58B52] rounded-full text-center transition-all"
            >
              Reserve a Table
            </button>
            <p className="text-xs text-[#F4EBDD]/40 text-center uppercase tracking-widest mt-4">
              74 Boulevard Saint-Germain · Paris
            </p>
          </div>
        </div>
      )}
    </>
  );
};
