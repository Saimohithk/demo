import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Volume2, Maximize2 } from 'lucide-react';
import { EXPERIENCE_GALLERY } from '../data/cafeData';
import { ArtImage } from './ArtImage';
import { cafeSoundscape } from '../utils/audioAmbience';

export const CafeExperience: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [expandedItem, setExpandedItem] = useState<(typeof EXPERIENCE_GALLERY)[0] | null>(null);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % EXPERIENCE_GALLERY.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + EXPERIENCE_GALLERY.length) % EXPERIENCE_GALLERY.length);
  };

  const toggleSound = () => {
    const state = cafeSoundscape.toggle();
    setIsPlayingAudio(state);
  };

  return (
    <section id="experiences" className="relative w-full py-28 bg-[#171411] text-[#F4EBDD] border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#C58B52] font-sans">
              <span>Sensory Spaces</span>
              <span aria-hidden="true">·</span>
              <span>Architectural Atmosphere</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-[#F4EBDD] mt-3">
              THE CAFÉ EXPERIENCE.
            </h2>
            <p className="text-sm md:text-base text-[#F4EBDD]/70 font-sans font-light mt-3 max-w-xl">
              An acoustic sanctuary calibrated with natural smoked oak, tactile stoneware, and golden sunlight streaming through high Parisian arches.
            </p>
          </div>

          {/* Gallery Controls & Ambiance Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleSound}
              className={`px-4 py-2 text-xs uppercase tracking-wider rounded-full border transition-all flex items-center gap-2 cursor-pointer ${
                isPlayingAudio
                  ? 'border-[#C58B52] bg-[#C58B52]/10 text-[#C58B52]'
                  : 'border-white/10 text-[#F4EBDD]/60 hover:text-[#F4EBDD] hover:border-white/30'
              }`}
            >
              <Volume2 size={14} />
              {isPlayingAudio ? 'Sound On' : 'Play Room Sound'}
            </button>

            <div className="flex items-center gap-1.5 ml-2">
              <button
                onClick={handlePrev}
                className="p-2.5 rounded-full border border-white/10 hover:border-[#C58B52] text-[#F4EBDD]/70 hover:text-[#F4EBDD] transition-all cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={handleNext}
                className="p-2.5 rounded-full border border-white/10 hover:border-[#C58B52] text-[#F4EBDD]/70 hover:text-[#F4EBDD] transition-all cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Editorial Showcase Strip */}
        <div className="relative mt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {EXPERIENCE_GALLERY.slice(0, 3).map((item, idx) => (
              <div
                key={item.title}
                onClick={() => setExpandedItem(item)}
                className="group relative rounded-[28px] overflow-hidden bg-[#201C18] border border-white/10 hover:border-[#C58B52]/60 transition-all duration-500 cursor-pointer shadow-[0_15px_45px_rgba(0,0,0,0.5)]"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <ArtImage
                    type={item.artType}
                    alt={item.title}
                    className="group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Category Pill Replacement (Unboxed Text) */}
                  <div className="absolute top-4 left-4 z-10 text-[11px] uppercase tracking-widest text-[#C58B52] font-sans font-medium">
                    {item.category}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedItem(item);
                    }}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 backdrop-blur-md text-[#F4EBDD]/70 hover:text-[#F4EBDD] opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Inspect photography"
                  >
                    <Maximize2 size={14} />
                  </button>

                  {/* Vignette Bottom Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#171411]/95 via-[#171411]/70 to-transparent z-10">
                    <span className="text-xs uppercase tracking-widest text-[#F4EBDD]/50 font-sans block mb-1">
                      Scene · 0{idx + 1}
                    </span>
                    <h3 className="font-serif text-2xl text-[#F4EBDD] font-medium group-hover:text-[#C58B52] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#F4EBDD]/70 mt-1 font-sans font-light">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Secondary Editorial Strip below */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mt-6 lg:mt-8">
            {EXPERIENCE_GALLERY.slice(3, 5).map((item, idx) => (
              <div
                key={item.title}
                onClick={() => setExpandedItem(item)}
                className="group relative rounded-[28px] overflow-hidden bg-[#201C18] border border-white/10 hover:border-[#C58B52]/60 transition-all duration-500 cursor-pointer shadow-[0_15px_45px_rgba(0,0,0,0.5)]"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <ArtImage
                    type={item.artType}
                    alt={item.title}
                    className="group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-4 left-4 z-10 text-[11px] uppercase tracking-widest text-[#C58B52] font-sans font-medium">
                    {item.category}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#171411]/95 via-[#171411]/70 to-transparent z-10">
                    <span className="text-xs uppercase tracking-widest text-[#F4EBDD]/50 font-sans block mb-1">
                      Scene · 0{idx + 4}
                    </span>
                    <h3 className="font-serif text-2xl text-[#F4EBDD] font-medium group-hover:text-[#C58B52] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#F4EBDD]/70 mt-1 font-sans font-light">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Expanded Lightbox Modal */}
      {expandedItem && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="max-w-2xl w-full bg-[#201C18] border border-white/10 rounded-[32px] overflow-hidden relative shadow-2xl">
            <div className="aspect-[4/3] w-full relative">
              <ArtImage type={expandedItem.artType} alt={expandedItem.title} />
              <button
                onClick={() => setExpandedItem(null)}
                className="absolute top-4 right-4 z-20 px-4 py-2 bg-black/70 backdrop-blur-md rounded-full text-xs uppercase tracking-widest text-[#F4EBDD] hover:text-[#C58B52]"
              >
                Close View
              </button>
            </div>
            <div className="p-8">
              <span className="text-xs uppercase tracking-widest text-[#C58B52] font-sans">
                {expandedItem.category} Archive
              </span>
              <h3 className="font-serif text-3xl font-medium text-[#F4EBDD] mt-1">
                {expandedItem.title}
              </h3>
              <p className="text-sm text-[#F4EBDD]/70 font-sans font-light mt-3 leading-relaxed">
                {expandedItem.subtitle} — Photographed in natural morning light. Every element within our walls is selected for warmth, acoustic resonance, and sensory calm.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
