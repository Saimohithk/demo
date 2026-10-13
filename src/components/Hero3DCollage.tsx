import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowDown, Compass, Sparkles, Eye } from 'lucide-react';
import { HERO_CARDS } from '../data/cafeData';
import { HeroCard } from '../types/cafe';
import { ArtImage } from './ArtImage';

interface Hero3DCollageProps {
  onSelectCard: (card: HeroCard) => void;
  onExploreMenu: () => void;
  onStepInside: () => void;
}

type CompositionMode = 'drift' | 'curated' | 'arc';

export const Hero3DCollage: React.FC<Hero3DCollageProps> = ({
  onSelectCard,
  onExploreMenu,
  onStepInside,
}) => {
  const [mode, setMode] = useState<CompositionMode>('drift');
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  // Smooth lerp mouse coordinates
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const [mouseRender, setMouseRender] = useState({ x: 0, y: 0 });
  const [tick, setTick] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Check reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Pointer move handler with normalized -1 to 1 coordinates
  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const normX = (clientX / innerWidth - 0.5) * 2;
    const normY = (clientY / innerHeight - 0.5) * 2;
    mouseRef.current.targetX = normX;
    mouseRef.current.targetY = normY;
  }, [prefersReducedMotion]);

  // Animation frame loop for continuous smooth floating and mouse damping
  useEffect(() => {
    if (prefersReducedMotion) return;

    let animId: number;
    let startTime = performance.now();

    const loop = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      setTick(elapsed);

      // Lerp mouse
      const m = mouseRef.current;
      m.x += (m.targetX - m.x) * 0.05;
      m.y += (m.targetY - m.y) * 0.05;
      setMouseRender({ x: m.x, y: m.y });

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [prefersReducedMotion]);

  // Separate cards by column
  const col1Cards = HERO_CARDS.filter((c) => c.column === 1);
  const col2Cards = HERO_CARDS.filter((c) => c.column === 2);
  const col3Cards = HERO_CARDS.filter((c) => c.column === 3);

  // Calculate dynamic 3D transform for a card
  const getCardTransform = (card: HeroCard, index: number) => {
    if (prefersReducedMotion) {
      return 'none';
    }

    const { x: mx, y: my } = mouseRender;
    const t = tick;

    // Subtle sinusoidal breathing drift
    const driftY = Math.sin(t * card.driftSpeed + index * 1.4) * 12;
    const driftX = Math.cos(t * card.driftSpeed * 0.8 + index) * 6;
    const driftRot = Math.sin(t * 0.6 + index * 0.9) * 1.5;

    // Mode-specific perspective modifications
    let baseDepth = card.depthZ;
    let baseRotX = card.rotX;
    let baseRotY = card.rotY;

    if (mode === 'arc') {
      if (card.column === 1) {
        baseRotY = 14;
        baseDepth += 30;
      } else if (card.column === 3) {
        baseRotY = -14;
        baseDepth += 30;
      } else {
        baseDepth += 80;
      }
    } else if (mode === 'curated') {
      baseDepth *= 0.5;
      baseRotX *= 0.3;
      baseRotY *= 0.3;
    }

    // Parallax response to mouse
    const parallaxZ = baseDepth + (hoveredCardId === card.id ? 60 : 0);
    const parallaxX = mx * (card.depthZ > 0 ? 30 : 15) + driftX;
    const parallaxY = my * (card.depthZ > 0 ? 25 : 12) + driftY;
    const rotX = baseRotX - my * 8;
    const rotY = baseRotY + mx * 10;
    const rotZ = card.rotZ + driftRot;

    return `translate3d(${parallaxX.toFixed(2)}px, ${parallaxY.toFixed(2)}px, ${parallaxZ.toFixed(2)}px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) rotateZ(${rotZ.toFixed(2)}deg)`;
  };

  return (
    <section
      ref={containerRef}
      onPointerMove={handlePointerMove}
      className="relative w-full min-h-screen bg-[#171411] text-[#F4EBDD] overflow-hidden flex flex-col justify-between pt-24 pb-12 select-none"
      style={{ perspective: '1400px' }}
      aria-label="Hero Showcase"
    >
      {/* Cinematic Ambient Lighting Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#6F4935]/25 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[400px] bg-[#C58B52]/15 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[350px] bg-[#74765A]/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Layer 1: Background Oversized Brand Watermark Layer (Deep in Z-space, strictly legible) */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
        style={{
          transform: `translate3d(${(-mouseRender.x * 12).toFixed(1)}px, ${(-mouseRender.y * 8).toFixed(1)}px, -180px)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        <span className="font-serif text-[14vw] md:text-[18vw] leading-none text-[#F4EBDD]/[0.035] tracking-tight whitespace-nowrap font-light select-none">
          ATELIER D'OR
        </span>
      </div>

      {/* Top Status & Composition Mode Controls */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-6 md:px-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-[#F4EBDD]/60 font-sans">
          <span className="text-[#C58B52]">PARIS VII</span>
          <span aria-hidden="true">·</span>
          <span>74 BOULEVARD SAINT-GERMAIN</span>
          <span aria-hidden="true">·</span>
          <span>08:00 — 18:30</span>
        </div>

        {/* Composition Arrangement Switcher */}
        <div className="flex items-center gap-1 p-1 bg-white/[0.04] border border-white/10 rounded-full backdrop-blur-md">
          <button
            onClick={() => setMode('drift')}
            className={`px-3 py-1 text-[11px] uppercase tracking-wider rounded-full transition-all flex items-center gap-1.5 cursor-pointer ${
              mode === 'drift'
                ? 'bg-[#C58B52] text-[#171411] font-semibold shadow-sm'
                : 'text-[#F4EBDD]/60 hover:text-[#F4EBDD]'
            }`}
            title="Continuous spatial drift"
          >
            <Compass size={12} />
            Spatial Drift
          </button>
          <button
            onClick={() => setMode('curated')}
            className={`px-3 py-1 text-[11px] uppercase tracking-wider rounded-full transition-all flex items-center gap-1.5 cursor-pointer ${
              mode === 'curated'
                ? 'bg-[#C58B52] text-[#171411] font-semibold shadow-sm'
                : 'text-[#F4EBDD]/60 hover:text-[#F4EBDD]'
            }`}
            title="Curated editorial balance"
          >
            <Sparkles size={12} />
            Editorial Grid
          </button>
          <button
            onClick={() => setMode('arc')}
            className={`px-3 py-1 text-[11px] uppercase tracking-wider rounded-full transition-all flex items-center gap-1.5 cursor-pointer ${
              mode === 'arc'
                ? 'bg-[#C58B52] text-[#171411] font-semibold shadow-sm'
                : 'text-[#F4EBDD]/60 hover:text-[#F4EBDD]'
            }`}
            title="Amphitheater focus curve"
          >
            <Eye size={12} />
            Focus Arc
          </button>
        </div>
      </div>

      {/* Layer 2: Centerpiece 3D Spatial Image Collage (3-Column Layout with Preserve-3D) */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 md:px-8 my-auto py-8">
        <div
          className="preserve-3d grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-center"
          style={{
            transformStyle: 'preserve-3d',
            transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Column 1 (Left): Extreme Extraction & Terroir */}
          <div className="preserve-3d flex flex-col gap-6 md:gap-8">
            {col1Cards.map((card, idx) => (
              <div
                key={card.id}
                onMouseEnter={() => setHoveredCardId(card.id)}
                onMouseLeave={() => setHoveredCardId(null)}
                onClick={() => onSelectCard(card)}
                style={{
                  transform: getCardTransform(card, idx),
                  transformStyle: 'preserve-3d',
                  transition: hoveredCardId === card.id ? 'transform 0.2s ease-out' : 'transform 0.15s linear',
                }}
                className="group relative cursor-pointer rounded-[24px] overflow-hidden bg-[#201C18] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] hover:border-[#C58B52]/50 transition-colors"
              >
                <div className={`w-full ${card.aspectRatio} relative overflow-hidden`}>
                  <ArtImage type={card.imageArtType} alt={card.title} />
                  {/* Subtle Card Header Kickers */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-[11px] uppercase tracking-widest text-[#F4EBDD]/80 z-10">
                    <span className="font-sans font-medium">{card.tag}</span>
                    <span className="text-[#C58B52] opacity-0 group-hover:opacity-100 transition-opacity">Inspect</span>
                  </div>
                  {/* Bottom Caption Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-[#171411]/95 via-[#171411]/70 to-transparent z-10">
                    <h3 className="font-serif text-xl text-[#F4EBDD] font-medium leading-snug group-hover:text-[#C58B52] transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-xs text-[#F4EBDD]/60 mt-0.5 font-sans">
                      {card.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Column 2 (Center): The Ritual & Emulsion (Prominent Depth & Scale) */}
          <div className="preserve-3d flex flex-col gap-6 md:gap-8">
            {col2Cards.map((card, idx) => (
              <div
                key={card.id}
                onMouseEnter={() => setHoveredCardId(card.id)}
                onMouseLeave={() => setHoveredCardId(null)}
                onClick={() => onSelectCard(card)}
                style={{
                  transform: getCardTransform(card, idx + 2),
                  transformStyle: 'preserve-3d',
                  transition: hoveredCardId === card.id ? 'transform 0.2s ease-out' : 'transform 0.15s linear',
                }}
                className="group relative cursor-pointer rounded-[28px] overflow-hidden bg-[#201C18] border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.7)] hover:border-[#C58B52]/60 transition-colors"
              >
                <div className={`w-full ${card.aspectRatio} relative overflow-hidden`}>
                  <ArtImage type={card.imageArtType} alt={card.title} />
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-[11px] uppercase tracking-widest text-[#F4EBDD]/80 z-10">
                    <span className="font-sans font-medium">{card.tag}</span>
                    <span className="text-[#C58B52] opacity-0 group-hover:opacity-100 transition-opacity">Inspect</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-[#171411]/95 via-[#171411]/70 to-transparent z-10">
                    <h3 className="font-serif text-2xl text-[#F4EBDD] font-medium leading-snug group-hover:text-[#C58B52] transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-xs text-[#F4EBDD]/60 mt-0.5 font-sans">
                      {card.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Column 3 (Right): Viennoiserie, Space & Ceramics */}
          <div className="preserve-3d flex flex-col gap-6 md:gap-8">
            {col3Cards.map((card, idx) => (
              <div
                key={card.id}
                onMouseEnter={() => setHoveredCardId(card.id)}
                onMouseLeave={() => setHoveredCardId(null)}
                onClick={() => onSelectCard(card)}
                style={{
                  transform: getCardTransform(card, idx + 4),
                  transformStyle: 'preserve-3d',
                  transition: hoveredCardId === card.id ? 'transform 0.2s ease-out' : 'transform 0.15s linear',
                }}
                className="group relative cursor-pointer rounded-[24px] overflow-hidden bg-[#201C18] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] hover:border-[#C58B52]/50 transition-colors"
              >
                <div className={`w-full ${card.aspectRatio} relative overflow-hidden`}>
                  <ArtImage type={card.imageArtType} alt={card.title} />
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-[11px] uppercase tracking-widest text-[#F4EBDD]/80 z-10">
                    <span className="font-sans font-medium">{card.tag}</span>
                    <span className="text-[#C58B52] opacity-0 group-hover:opacity-100 transition-opacity">Inspect</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-[#171411]/95 via-[#171411]/70 to-transparent z-10">
                    <h3 className="font-serif text-xl text-[#F4EBDD] font-medium leading-snug group-hover:text-[#C58B52] transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-xs text-[#F4EBDD]/60 mt-0.5 font-sans">
                      {card.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Layer 3: Editorial Typography & Call-To-Action Anchor */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-6 md:px-12 mt-4 text-center">
        {/* Main headline: “A LITTLE MORE THAN COFFEE.” */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-[#F4EBDD] max-w-5xl mx-auto leading-[1.05] text-balance">
          A LITTLE MORE THAN COFFEE.
        </h1>

        {/* Supporting text */}
        <p className="mt-4 text-sm sm:text-base md:text-lg text-[#F4EBDD]/75 font-sans font-light tracking-wide max-w-2xl mx-auto">
          Slow mornings. Thoughtful brews. Beautifully unexpected moments.
        </p>

        {/* Action CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onExploreMenu}
            className="px-8 py-3.5 text-xs uppercase tracking-widest font-semibold text-[#171411] bg-[#F4EBDD] hover:bg-[#C58B52] rounded-full transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] shadow-lg cursor-pointer"
          >
            EXPLORE OUR MENU
          </button>
          <button
            onClick={onStepInside}
            className="px-8 py-3.5 text-xs uppercase tracking-widest font-medium text-[#F4EBDD] border border-white/20 hover:border-[#C58B52] hover:text-[#C58B52] rounded-full transition-all duration-300 backdrop-blur-sm cursor-pointer"
          >
            STEP INSIDE
          </button>
        </div>

        {/* Tasteful Scroll Cue */}
        <a
          href="#menu"
          className="inline-flex flex-col items-center gap-2 mt-10 text-[11px] uppercase tracking-widest text-[#F4EBDD]/40 hover:text-[#C58B52] transition-colors"
          aria-label="Scroll down to menu section"
        >
          <span>Scroll to Discover</span>
          <ArrowDown size={14} className="animate-bounce" />
        </a>
      </div>
    </section>
  );
};
