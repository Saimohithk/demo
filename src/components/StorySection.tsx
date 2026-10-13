import React, { useState } from 'react';
import { ORIGIN_STORIES } from '../data/cafeData';
import { ArtImage } from './ArtImage';

export const StorySection: React.FC = () => {
  const [selectedOrigin, setSelectedOrigin] = useState(ORIGIN_STORIES[0]);

  return (
    <section id="story" className="relative w-full py-28 bg-[#171411] text-[#F4EBDD] border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Split Screen Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Artwork & Terroir Spotlight (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-[32px] overflow-hidden bg-[#201C18] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] aspect-[4/5]">
              <ArtImage
                type={
                  selectedOrigin.id === 'ethiopia'
                    ? 'barista'
                    : selectedOrigin.id === 'colombia'
                    ? 'espresso'
                    : 'beans'
                }
                alt={`${selectedOrigin.country} harvest terroir`}
              />

              {/* Terroir Floating Info Card */}
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-[24px] bg-[#171411]/90 backdrop-blur-md border border-white/10">
                <div className="flex items-center justify-between text-xs text-[#C58B52] uppercase tracking-widest font-sans">
                  <span>Elevation</span>
                  <span className="font-mono tabular-nums text-[#F4EBDD]">{selectedOrigin.altitude}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-[#C58B52] uppercase tracking-widest font-sans mt-2">
                  <span>Cupping Score</span>
                  <span className="font-mono tabular-nums text-[#F4EBDD] font-bold">
                    {selectedOrigin.cuppingScore} / 100
                  </span>
                </div>
                <div className="mt-3 pt-3 border-t border-white/10 text-xs text-[#F4EBDD]/70 font-sans">
                  {selectedOrigin.varietal} · {selectedOrigin.process}
                </div>
              </div>
            </div>

            {/* Accent badge behind */}
            <div className="absolute -top-6 -left-6 w-32 h-32 border border-[#C58B52]/20 rounded-full pointer-events-none -z-10" />
          </div>

          {/* Right Column: Editorial Narrative & Origin Explorer (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#C58B52] font-sans">
                <span>Direct Trade Philosophy</span>
                <span aria-hidden="true">·</span>
                <span>Zero Compromise</span>
              </div>

              {/* Headline: “GOOD COFFEE. NO SHORTCUTS.” */}
              <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-[#F4EBDD] mt-3 leading-[1.08] text-balance">
                GOOD COFFEE. NO SHORTCUTS.
              </h2>

              <p className="mt-6 text-base md:text-lg text-[#F4EBDD]/80 font-sans font-light leading-relaxed">
                Great coffee begins thousands of meters above sea level, in mineral soils where temperature swings force cherries to mature slowly. We bypass commodity brokers, paying upwards of 300% above market minimums directly to families who cultivate rare heirloom cultivars.
              </p>

              <p className="mt-4 text-sm md:text-base text-[#F4EBDD]/60 font-sans font-light leading-relaxed">
                In our atelier, water is remineralized with calcium and magnesium to exact micro-specifications before it touches coffee grounds. Roast profiles are monitored down to the tenth of a degree, highlighting floral brightness rather than dark bitterness.
              </p>
            </div>

            {/* Interactive Terroir Origin Selector */}
            <div className="mt-10 pt-8 border-t border-white/5">
              <span className="text-xs uppercase tracking-widest text-[#F4EBDD]/40 font-sans block mb-4">
                Explore Current Seasonal Single Origins:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {ORIGIN_STORIES.map((origin) => (
                  <button
                    key={origin.id}
                    onClick={() => setSelectedOrigin(origin)}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                      selectedOrigin.id === origin.id
                        ? 'border-[#C58B52] bg-[#C58B52]/10 shadow-md'
                        : 'border-white/5 bg-[#201C18] hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-lg font-medium text-[#F4EBDD]">
                        {origin.country}
                      </span>
                      <span className="text-xs font-mono text-[#C58B52] tabular-nums font-semibold">
                        {origin.cuppingScore}
                      </span>
                    </div>
                    <p className="text-xs text-[#F4EBDD]/60 mt-1 font-sans truncate">
                      {origin.region}
                    </p>
                  </button>
                ))}
              </div>

              {/* Active Origin Note Detail */}
              <div className="mt-6 p-5 rounded-2xl bg-[#201C18] border border-white/5">
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#C58B52] font-sans mb-2">
                  <span className="font-semibold">{selectedOrigin.farm}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedOrigin.region}</span>
                </div>
                <p className="text-xs sm:text-sm text-[#F4EBDD]/70 font-sans leading-relaxed">
                  {selectedOrigin.description}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-[#F4EBDD]/50 font-sans">
                  <span>Flavor profile:</span>
                  {selectedOrigin.notes.map((n, i) => (
                    <React.Fragment key={n}>
                      <span className="text-[#F4EBDD]/90">{n}</span>
                      {i < selectedOrigin.notes.length - 1 && <span aria-hidden="true">·</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
