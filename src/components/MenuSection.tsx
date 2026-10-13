import React, { useState, useEffect } from 'react';
import { Plus, Check } from 'lucide-react';
import { MENU_ITEMS } from '../data/cafeData';
import { MenuItem } from '../types/cafe';
import { ArtImage } from './ArtImage';
import { api } from '../services/api';

interface MenuSectionProps {
  onAddToCart: (item: MenuItem, options?: { milk?: string; temp?: string; sweetness?: string }) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ onAddToCart }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'espresso' | 'milk' | 'cold' | 'bakery'>('all');
  const [itemsList, setItemsList] = useState<MenuItem[]>(MENU_ITEMS);
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);

  // Synchronize menu from backend API
  useEffect(() => {
    let isMounted = true;
    api.getMenu()
      .then((res) => {
        if (isMounted && res.success && res.items && res.items.length > 0) {
          setItemsList(res.items);
        }
      })
      .catch((err) => {
        console.warn('Connected to fallback menu state:', err);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // Customization state
  const [selectedMilk, setSelectedMilk] = useState('Oat Milk (+€0.50)');
  const [selectedTemp, setSelectedTemp] = useState('Standard Hot');
  const [selectedSweetness, setSelectedSweetness] = useState('Unsweetened');

  const filteredItems = activeFilter === 'all'
    ? itemsList
    : itemsList.filter((item) => item.category === activeFilter);

  const handleQuickAdd = (item: MenuItem, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(item);
    setAddedItemIds((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [item.id]: false }));
    }, 1500);
  };

  const handleConfirmCustomization = () => {
    if (!customizingItem) return;
    onAddToCart(customizingItem, {
      milk: selectedMilk,
      temp: selectedTemp,
      sweetness: selectedSweetness,
    });
    setCustomizingItem(null);
  };

  return (
    <section id="menu" className="relative w-full py-28 bg-[#171411] text-[#F4EBDD] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#C58B52] font-sans">
              <span>Collection · 2026</span>
              <span aria-hidden="true">·</span>
              <span>Daily Harvest & Bakehouse</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-[#F4EBDD] mt-3">
              COFFEE AS ART.
            </h2>
            <p className="text-sm md:text-base text-[#F4EBDD]/70 font-sans font-light mt-3 max-w-xl">
              Micro-lots sourced at high elevations, roasted with restraint, and paired with butter-laminated viennoiserie baked fresh before sunrise.
            </p>
          </div>

          {/* Interactive Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#211C18] border border-white/5 rounded-full">
            {[
              { id: 'all', label: 'All Items' },
              { id: 'espresso', label: 'Espresso' },
              { id: 'milk', label: 'Velvet & Milk' },
              { id: 'cold', label: 'Slow Cold' },
              { id: 'bakery', label: 'Bakery' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as typeof activeFilter)}
                className={`px-4 py-2 text-xs font-medium uppercase tracking-wider rounded-full transition-all cursor-pointer ${
                  activeFilter === tab.id
                    ? 'bg-[#C58B52] text-[#171411] font-semibold'
                    : 'text-[#F4EBDD]/60 hover:text-[#F4EBDD]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Asymmetrical Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => {
            // Asymmetrical grid styling: make the first and fourth card stand out
            const isFeatured = index === 0 || index === 3;

            return (
              <div
                key={item.id}
                onClick={() => setCustomizingItem(item)}
                className={`group relative rounded-[28px] overflow-hidden bg-[#201C18] border border-white/10 hover:border-[#C58B52]/60 transition-all duration-500 cursor-pointer flex flex-col justify-between ${
                  isFeatured ? 'md:col-span-2 lg:col-span-1 shadow-[0_15px_40px_rgba(0,0,0,0.5)]' : ''
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Visual Art Area with 3D hover tilt */}
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#1B1714]">
                  <ArtImage
                    type={item.imageArtType}
                    alt={item.name}
                    className="group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Price Tag in Tabular Numerals */}
                  <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-[#171411]/85 backdrop-blur-md rounded-full border border-white/10 text-xs font-mono tabular-nums text-[#F4EBDD]">
                    €{item.price.toFixed(2)}
                  </div>

                  {/* Kicker Tag */}
                  {item.isSignature && (
                    <div className="absolute top-4 left-4 z-10 text-[11px] uppercase tracking-widest text-[#C58B52] font-sans font-medium">
                      Atelier Signature
                    </div>
                  )}
                </div>

                {/* Content Details */}
                <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Unboxed Metadata with separators */}
                    <div className="flex items-center gap-2 text-xs text-[#F4EBDD]/50 font-sans uppercase tracking-wider mb-2">
                      <span>{item.roastOrBakerNotes}</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.prepTime}</span>
                    </div>

                    <h3 className="font-serif text-2xl md:text-3xl text-[#F4EBDD] font-medium group-hover:text-[#C58B52] transition-colors">
                      {item.name}
                    </h3>

                    <p className="mt-3 text-xs md:text-sm text-[#F4EBDD]/70 font-sans font-light leading-relaxed">
                      {item.description}
                    </p>

                    {/* Tasting Notes as clean unboxed inline text */}
                    <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-[#C58B52] font-sans">
                      {item.tastingNotes.map((note, nIdx) => (
                        <React.Fragment key={note}>
                          <span>{note}</span>
                          {nIdx < item.tastingNotes.length - 1 && <span aria-hidden="true">·</span>}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="mt-6 pt-5 border-t border-white/5 flex items-center justify-between">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCustomizingItem(item);
                      }}
                      className="text-xs uppercase tracking-widest text-[#F4EBDD]/70 hover:text-[#C58B52] transition-colors"
                    >
                      Customize Notes
                    </button>

                    <button
                      onClick={(e) => handleQuickAdd(item, e)}
                      className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-full flex items-center gap-1.5 transition-all cursor-pointer ${
                        addedItemIds[item.id]
                          ? 'bg-[#74765A] text-white'
                          : 'bg-[#F4EBDD] text-[#171411] hover:bg-[#C58B52]'
                      }`}
                      aria-label={`Add ${item.name} to order tray`}
                    >
                      {addedItemIds[item.id] ? (
                        <>
                          <Check size={14} /> Added
                        </>
                      ) : (
                        <>
                          <Plus size={14} /> Add to Tray
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Item Customization Modal */}
      {customizingItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#201C18] border border-white/10 rounded-[32px] max-w-lg w-full p-8 text-[#F4EBDD] shadow-2xl relative">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#C58B52] font-sans">
                  Crafting Specifications
                </span>
                <h3 className="font-serif text-3xl font-medium mt-1">{customizingItem.name}</h3>
              </div>
              <button
                onClick={() => setCustomizingItem(null)}
                className="text-sm uppercase tracking-wider text-[#F4EBDD]/60 hover:text-[#F4EBDD]"
              >
                Close
              </button>
            </div>

            <p className="text-xs text-[#F4EBDD]/70 mt-3 font-sans leading-relaxed">
              {customizingItem.description}
            </p>

            {/* Customization Options */}
            <div className="mt-6 space-y-5">
              {customizingItem.category !== 'bakery' && (
                <>
                  <div>
                    <label className="text-xs uppercase tracking-wider text-[#F4EBDD]/60 block mb-2 font-sans">
                      Milk Selection
                    </label>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {['Organic Guernsey Whole', 'Minor Figures Oat', 'Raw Almond', 'No Milk (Black)'].map((m) => (
                        <button
                          key={m}
                          onClick={() => setSelectedMilk(m)}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            selectedMilk === m
                              ? 'border-[#C58B52] bg-[#C58B52]/10 text-[#F4EBDD]'
                              : 'border-white/5 bg-[#171411] text-[#F4EBDD]/70 hover:border-white/20'
                          }`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-wider text-[#F4EBDD]/60 block mb-2 font-sans">
                      Temperature & Extraction
                    </label>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {['Standard Hot (62°C)', 'Extra Warm (68°C)', 'Over Sphere Ice', 'Room Temperature'].map((t) => (
                        <button
                          key={t}
                          onClick={() => setSelectedTemp(t)}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            selectedTemp === t
                              ? 'border-[#C58B52] bg-[#C58B52]/10 text-[#F4EBDD]'
                              : 'border-white/5 bg-[#171411] text-[#F4EBDD]/70 hover:border-white/20'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="text-xs uppercase tracking-wider text-[#F4EBDD]/60 block mb-2 font-sans">
                  Sweetness Profile
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {['Unsweetened', 'Light Demerara', 'Bourbon Vanilla'].map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSweetness(s)}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        selectedSweetness === s
                          ? 'border-[#C58B52] bg-[#C58B52]/10 text-[#F4EBDD]'
                          : 'border-white/5 bg-[#171411] text-[#F4EBDD]/70 hover:border-white/20'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
              <div>
                <span className="text-xs text-[#F4EBDD]/50 uppercase tracking-widest block font-sans">Configured Price</span>
                <span className="text-xl font-mono tabular-nums font-semibold text-[#F4EBDD]">
                  €{customizingItem.price.toFixed(2)}
                </span>
              </div>
              <button
                onClick={handleConfirmCustomization}
                className="px-6 py-3 bg-[#C58B52] hover:bg-[#F4EBDD] text-[#171411] text-xs uppercase tracking-widest font-semibold rounded-full transition-all"
              >
                Confirm & Add to Tray
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
