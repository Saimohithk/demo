import React from 'react';
import { X, Sparkles, Compass, Clock, Thermometer } from 'lucide-react';
import { HeroCard } from '../types/cafe';
import { ArtImage } from './ArtImage';

interface CardDetailModalProps {
  card: HeroCard | null;
  onClose: () => void;
}

export const CardDetailModal: React.FC<CardDetailModalProps> = ({ card, onClose }) => {
  if (!card) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#201C18] border border-white/10 rounded-[32px] overflow-hidden shadow-2xl text-[#F4EBDD] my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 p-2 rounded-full bg-black/60 backdrop-blur-md text-[#F4EBDD]/70 hover:text-[#F4EBDD] hover:bg-black/90 transition-all cursor-pointer"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Visual Artwork */}
          <div className="relative aspect-[4/5] md:aspect-auto md:h-full bg-[#171411]">
            <ArtImage type={card.imageArtType} alt={card.title} />
            <div className="absolute top-4 left-4 z-10 text-[11px] uppercase tracking-widest text-[#C58B52] font-sans font-medium">
              {card.tag}
            </div>
          </div>

          {/* Details Narrative */}
          <div className="p-8 md:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#F4EBDD]/50 font-sans">
                <span>Spatial Showcase</span>
                <span aria-hidden="true">·</span>
                <span>Depth Layer</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#F4EBDD] mt-2">
                {card.title}
              </h2>
              <p className="text-xs text-[#C58B52] font-sans uppercase tracking-wider mt-1">
                {card.subtitle}
              </p>

              <p className="mt-4 text-xs sm:text-sm text-[#F4EBDD]/80 font-sans font-light leading-relaxed">
                {card.story}
              </p>

              {/* Extraction / Technical Specifications */}
              <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
                <span className="text-[11px] uppercase tracking-widest text-[#F4EBDD]/40 font-sans block">
                  Curation Parameters:
                </span>

                {card.details.origin && (
                  <div className="flex items-center gap-2 text-xs font-sans text-[#F4EBDD]/80">
                    <Compass size={14} className="text-[#C58B52] shrink-0" />
                    <span>Origin: {card.details.origin}</span>
                  </div>
                )}

                {card.details.extraction && (
                  <div className="flex items-center gap-2 text-xs font-sans text-[#F4EBDD]/80">
                    <Clock size={14} className="text-[#C58B52] shrink-0" />
                    <span>Extraction: {card.details.extraction}</span>
                  </div>
                )}

                {card.details.temp && (
                  <div className="flex items-center gap-2 text-xs font-sans text-[#F4EBDD]/80">
                    <Thermometer size={14} className="text-[#C58B52] shrink-0" />
                    <span>Temperature: {card.details.temp}</span>
                  </div>
                )}

                {card.details.notes && (
                  <div className="flex items-center gap-2 text-xs font-sans text-[#F4EBDD]/80">
                    <Sparkles size={14} className="text-[#C58B52] shrink-0" />
                    <span>Tasting Notes: {card.details.notes}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-[#F4EBDD]/40 font-sans">
                Atelier Archive № {card.id}
              </span>
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-full bg-[#F4EBDD] hover:bg-[#C58B52] text-[#171411] text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
              >
                Return to Gallery
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
