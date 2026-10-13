import React, { useState } from 'react';
import { X, Volume2, VolumeX, Sun, Sunset, Sunrise, Sparkles } from 'lucide-react';
import { ArtImage } from './ArtImage';
import { cafeSoundscape } from '../utils/audioAmbience';

interface AtmosphereModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookTable: () => void;
}

export const AtmosphereModal: React.FC<AtmosphereModalProps> = ({ isOpen, onClose, onBookTable }) => {
  const [timeOfDay, setTimeOfDay] = useState<'dawn' | 'midday' | 'sunset'>('dawn');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  if (!isOpen) return null;

  const toggleSound = () => {
    const active = cafeSoundscape.toggle();
    setIsPlayingAudio(active);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#1D1815] border border-white/10 rounded-[36px] overflow-hidden shadow-2xl text-[#F4EBDD] my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-30 p-2.5 rounded-full bg-black/60 backdrop-blur-md text-[#F4EBDD]/70 hover:text-[#F4EBDD] hover:bg-black/90 transition-all cursor-pointer"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Ambient Top Bar */}
        <div className="p-6 md:px-10 border-b border-white/5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#C58B52] font-sans">
              <Sparkles size={12} />
              <span>Spatial Atmosphere Tour</span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-normal text-[#F4EBDD] mt-1">
              Step Inside 74 Boulevard Saint-Germain
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Audio Toggle */}
            <button
              onClick={toggleSound}
              className={`px-4 py-2 text-xs uppercase tracking-wider rounded-full border transition-all flex items-center gap-2 cursor-pointer ${
                isPlayingAudio
                  ? 'border-[#C58B52] bg-[#C58B52]/10 text-[#C58B52]'
                  : 'border-white/10 text-[#F4EBDD]/70 hover:text-[#F4EBDD]'
              }`}
            >
              {isPlayingAudio ? <Volume2 size={14} /> : <VolumeX size={14} />}
              {isPlayingAudio ? 'Sound Active' : 'Start Audio'}
            </button>
          </div>
        </div>

        {/* Visual Environment Simulator */}
        <div className="relative aspect-[16/9] w-full bg-[#120F0D] overflow-hidden">
          <ArtImage
            type="interior"
            alt="Atelier interior sanctuary"
            className={`transition-all duration-1000 ${
              timeOfDay === 'sunset'
                ? 'brightness-90 sepia-[0.3]'
                : timeOfDay === 'midday'
                ? 'brightness-110 contrast-105'
                : 'brightness-100'
            }`}
          />

          {/* Time of Day Mood Lighting Overlay */}
          <div
            className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${
              timeOfDay === 'sunset'
                ? 'bg-amber-950/20'
                : timeOfDay === 'midday'
                ? 'bg-yellow-100/5'
                : 'bg-orange-950/10'
            }`}
          />

          {/* Lighting Presets Selector */}
          <div className="absolute bottom-6 left-6 right-6 z-20 flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#171411]/85 backdrop-blur-md border border-white/10">
            <span className="text-xs uppercase tracking-widest text-[#F4EBDD]/60 font-sans">
              Daylight Simulation:
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setTimeOfDay('dawn')}
                className={`px-3 py-1.5 rounded-full text-xs font-sans flex items-center gap-1.5 transition-all cursor-pointer ${
                  timeOfDay === 'dawn'
                    ? 'bg-[#C58B52] text-[#171411] font-semibold'
                    : 'text-[#F4EBDD]/70 hover:text-[#F4EBDD]'
                }`}
              >
                <Sunrise size={13} />
                08:00 Dawn
              </button>
              <button
                onClick={() => setTimeOfDay('midday')}
                className={`px-3 py-1.5 rounded-full text-xs font-sans flex items-center gap-1.5 transition-all cursor-pointer ${
                  timeOfDay === 'midday'
                    ? 'bg-[#C58B52] text-[#171411] font-semibold'
                    : 'text-[#F4EBDD]/70 hover:text-[#F4EBDD]'
                }`}
              >
                <Sun size={13} />
                12:30 Midday
              </button>
              <button
                onClick={() => setTimeOfDay('sunset')}
                className={`px-3 py-1.5 rounded-full text-xs font-sans flex items-center gap-1.5 transition-all cursor-pointer ${
                  timeOfDay === 'sunset'
                    ? 'bg-[#C58B52] text-[#171411] font-semibold'
                    : 'text-[#F4EBDD]/70 hover:text-[#F4EBDD]'
                }`}
              >
                <Sunset size={13} />
                17:30 Amber Haze
              </button>
            </div>
          </div>
        </div>

        {/* Narrative & Action */}
        <div className="p-6 md:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span className="font-serif text-xl text-[#F4EBDD] block">
              Slow mornings without haste.
            </span>
            <p className="text-xs sm:text-sm text-[#F4EBDD]/70 font-sans font-light mt-1 max-w-xl">
              We designed this space with no loud blenders or fluorescent tubes. Only analog turntables playing ambient jazz, the scent of fresh cardamom pastries, and the soft hiss of steam wands.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                onClose();
                onBookTable();
              }}
              className="px-6 py-3 bg-[#F4EBDD] hover:bg-[#C58B52] text-[#171411] text-xs uppercase tracking-widest font-semibold rounded-full transition-all cursor-pointer shadow-lg"
            >
              Reserve a Table
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
