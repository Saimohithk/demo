import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full bg-[#120F0D] text-[#F4EBDD] border-t border-white/5 pt-20 pb-12 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Final Brand Statement */}
        <div className="mb-20 text-center">
          <span className="text-xs uppercase tracking-widest text-[#C58B52] font-sans block mb-4">
            The Atelier Creed
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-[#F4EBDD] max-w-4xl mx-auto leading-tight text-balance">
            “MAKE ROOM FOR A BETTER MOMENT.”
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-[#F4EBDD]/60 font-sans font-light max-w-lg mx-auto">
            Pause the pace of the city. Breathe in the aroma of blooming floral grounds, listen to warm acoustic vinyl, and savor slow mornings.
          </p>
        </div>

        {/* 4-Column Editorial Directory */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-t border-b border-white/5 text-xs font-sans">
          {/* Brand Col */}
          <div className="col-span-2 md:col-span-1">
            <span className="font-serif text-2xl tracking-wide text-[#F4EBDD] block mb-3">
              ATELIER D'OR
            </span>
            <p className="text-[#F4EBDD]/60 leading-relaxed max-w-xs font-light">
              Contemporary specialty coffee roastery, artisanal pâtisserie, and sensory listening salon located in Saint-Germain, Paris.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <span className="text-xs uppercase tracking-widest text-[#C58B52] block mb-4">
              Explore
            </span>
            <ul className="space-y-2.5 text-[#F4EBDD]/70 font-light">
              <li>
                <a href="#menu" className="hover:text-[#F4EBDD] transition-colors">
                  Signature Menu
                </a>
              </li>
              <li>
                <a href="#story" className="hover:text-[#F4EBDD] transition-colors">
                  Our Direct Trade Story
                </a>
              </li>
              <li>
                <a href="#experiences" className="hover:text-[#F4EBDD] transition-colors">
                  Sensory Spaces
                </a>
              </li>
              <li>
                <a href="#visit" className="hover:text-[#F4EBDD] transition-colors">
                  Location & Hours
                </a>
              </li>
            </ul>
          </div>

          {/* Hours & Sourcing */}
          <div>
            <span className="text-xs uppercase tracking-widest text-[#C58B52] block mb-4">
              Sanctuary Hours
            </span>
            <ul className="space-y-2 text-[#F4EBDD]/70 font-light">
              <li>Mon–Fri: 07:30 — 18:30</li>
              <li>Sat–Sun: 08:30 — 19:00</li>
              <li className="pt-2 text-[#F4EBDD]/50">
                Fresh bakehouse batches pulled at 07:30 & 13:00 daily.
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <span className="text-xs uppercase tracking-widest text-[#C58B52] block mb-4">
              Direct Contact
            </span>
            <ul className="space-y-2 text-[#F4EBDD]/70 font-light">
              <li>74 Boulevard Saint-Germain</li>
              <li>75005 Paris, France</li>
              <li>concierge@atelierdor.coffee</li>
              <li className="pt-1">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C58B52] hover:underline"
                >
                  Instagram @atelierdor.paris
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#F4EBDD]/50 font-sans uppercase tracking-widest">
          <div>
            © 2026 Atelier d'Or Specialty Coffee. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Direct Trade Verified</span>
            <span aria-hidden="true">·</span>
            <span>Single Origin Only</span>
            <span aria-hidden="true">·</span>
            <button
              onClick={scrollToTop}
              className="hover:text-[#F4EBDD] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp size={12} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
