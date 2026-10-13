/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero3DCollage } from './components/Hero3DCollage';
import { MenuSection } from './components/MenuSection';
import { StorySection } from './components/StorySection';
import { CafeExperience } from './components/CafeExperience';
import { VisitSection } from './components/VisitSection';
import { Footer } from './components/Footer';
import { CardDetailModal } from './components/CardDetailModal';
import { AtmosphereModal } from './components/AtmosphereModal';
import { ReservationModal } from './components/ReservationModal';
import { TastingTrayDrawer } from './components/TastingTrayDrawer';
import { HeroCard, MenuItem, TastingTrayItem } from './types/cafe';

export default function App() {
  const [selectedHeroCard, setSelectedHeroCard] = useState<HeroCard | null>(null);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isAtmosphereOpen, setIsAtmosphereOpen] = useState(false);
  const [isTrayOpen, setIsTrayOpen] = useState(false);
  const [trayItems, setTrayItems] = useState<TastingTrayItem[]>([
    {
      cartId: 'initial-1',
      item: {
        id: 'velvet-flat-white',
        name: 'Velvet Flat White',
        category: 'milk',
        price: 5.60,
        description: 'Double shot folded with micro-textured whole farm milk.',
        tastingNotes: ['Malted Toffee', 'Roasted Almond'],
        roastOrBakerNotes: 'Single Origin Blend',
        imageArtType: 'flatwhite',
        prepTime: '3 mins',
        isSignature: true,
      },
      quantity: 1,
      milkOption: 'Organic Guernsey Whole',
      tempOption: 'Standard Hot',
    },
    {
      cartId: 'initial-2',
      item: {
        id: 'pistachio-croissant',
        name: 'Pistachio Croissant',
        category: 'bakery',
        price: 5.40,
        description: 'Twice-baked butter croissant with Bronte pistachio crème.',
        tastingNotes: ['Flaky Churned Butter', 'Toasted Pistachio'],
        roastOrBakerNotes: '72 Lamination Layers',
        imageArtType: 'pastry',
        prepTime: 'Ready to serve',
        isSignature: true,
      },
      quantity: 1,
    },
  ]);

  const handleAddToCart = (
    item: MenuItem,
    options?: { milk?: string; temp?: string; sweetness?: string }
  ) => {
    const cartId = `${item.id}-${Date.now()}`;
    const newItem: TastingTrayItem = {
      cartId,
      item,
      quantity: 1,
      milkOption: options?.milk,
      tempOption: options?.temp,
      sweetness: options?.sweetness,
    };
    setTrayItems((prev) => [newItem, ...prev]);
  };

  const handleUpdateQuantity = (cartId: string, delta: number) => {
    setTrayItems((prev) =>
      prev
        .map((it) => {
          if (it.cartId === cartId) {
            const newQty = it.quantity + delta;
            return newQty > 0 ? { ...it, quantity: newQty } : null;
          }
          return it;
        })
        .filter(Boolean) as TastingTrayItem[]
    );
  };

  const handleRemoveItem = (cartId: string) => {
    setTrayItems((prev) => prev.filter((it) => it.cartId !== cartId));
  };

  const handleClearCart = () => {
    setTrayItems([]);
  };

  const totalItemCount = trayItems.reduce((acc, curr) => acc + curr.quantity, 0);

  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#171411] text-[#F4EBDD] font-sans antialiased selection:bg-[#C58B52] selection:text-[#171411] relative">
      {/* Top Navigation */}
      <Navbar
        onOpenReservation={() => setIsReservationOpen(true)}
        onOpenTray={() => setIsTrayOpen(true)}
        trayItemCount={totalItemCount}
      />

      {/* Hero Section — The Signature 3D Experience */}
      <main>
        <Hero3DCollage
          onSelectCard={(card) => setSelectedHeroCard(card)}
          onExploreMenu={scrollToMenu}
          onStepInside={() => setIsAtmosphereOpen(true)}
        />

        {/* Menu Section — Coffee as Art */}
        <MenuSection onAddToCart={handleAddToCart} />

        {/* Our Story — From Bean to Moment */}
        <StorySection />

        {/* The Café Experience */}
        <CafeExperience />

        {/* Visit Us — The Real-World Connection */}
        <VisitSection onOpenReservationModal={() => setIsReservationOpen(true)} />
      </main>

      {/* Footer & Final Statement */}
      <Footer />

      {/* Modals & Slide-over Drawers */}
      <CardDetailModal
        card={selectedHeroCard}
        onClose={() => setSelectedHeroCard(null)}
      />

      <AtmosphereModal
        isOpen={isAtmosphereOpen}
        onClose={() => setIsAtmosphereOpen(false)}
        onBookTable={() => setIsReservationOpen(true)}
      />

      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
      />

      <TastingTrayDrawer
        isOpen={isTrayOpen}
        onClose={() => setIsTrayOpen(false)}
        items={trayItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
