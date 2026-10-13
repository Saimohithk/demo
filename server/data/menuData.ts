export interface ServerMenuItem {
  id: string;
  name: string;
  category: 'espresso' | 'milk' | 'cold' | 'bakery';
  price: number;
  description: string;
  tastingNotes: string[];
  roastOrBakerNotes: string;
  imageArtType: string;
  prepTime: string;
  isSignature?: boolean;
}

export const TRUSTED_MENU_ITEMS: ServerMenuItem[] = [
  {
    id: 'signature-espresso',
    name: 'Signature Espresso',
    category: 'espresso',
    price: 4.80,
    description: 'Double ristretto pull using our Colombia Huila Pink Bourbon. Thick golden crema with sparkling citrus vibrancy.',
    tastingNotes: ['Candied Blood Orange', '70% Dark Cocoa', 'Wild Berry'],
    roastOrBakerNotes: 'Light-Medium Roast · Finca El Mirador',
    imageArtType: 'espresso',
    prepTime: '2 mins',
    isSignature: true,
  },
  {
    id: 'velvet-flat-white',
    name: 'Velvet Flat White',
    category: 'milk',
    price: 5.60,
    description: 'Double shot folded with micro-textured whole farm milk or steamed organic oat. Velvety body with lingering caramel sweetness.',
    tastingNotes: ['Malted Toffee', 'Roasted Almond', 'Milk Chocolate'],
    roastOrBakerNotes: 'Single Origin Blend · 62°C Microfoam',
    imageArtType: 'flatwhite',
    prepTime: '3 mins',
    isSignature: true,
  },
  {
    id: 'brown-butter-latte',
    name: 'Brown Butter Latte',
    category: 'milk',
    price: 6.80,
    description: 'Infused with slow-cooked French hazelnut butter, raw Demerara caramel, bourbon vanilla, and grated Ceylon nutmeg.',
    tastingNotes: ['Toasted Hazelnut', 'Burnt Sugar', 'Tahitian Vanilla'],
    roastOrBakerNotes: 'House Specialty · Natural Butter Infusion',
    imageArtType: 'brownbutter',
    prepTime: '4 mins',
    isSignature: true,
  },
  {
    id: 'kyoto-cold-brew',
    name: 'Kyoto Cold Drip',
    category: 'cold',
    price: 6.20,
    description: 'Slow 18-hour cold glass tower extraction using washed Ethiopian heirloom beans. Served over a single crystal ice sphere.',
    tastingNotes: ['White Jasmine', 'Ripe Peach', 'Earl Grey Bergamot'],
    roastOrBakerNotes: '18-Hour Slow Tower · Gedeb Yirgacheffe',
    imageArtType: 'coldbrew',
    prepTime: 'Instant / Poured',
    isSignature: true,
  },
  {
    id: 'pistachio-croissant',
    name: 'Pistachio Croissant',
    category: 'bakery',
    price: 5.40,
    description: 'Twice-baked butter croissant generously filled with Sicilian Bronte pistachio crème and topped with crushed roasted nuts.',
    tastingNotes: ['Flaky Churned Butter', 'Toasted Pistachio', 'Maldon Flake'],
    roastOrBakerNotes: 'Baked at 06:00 Daily · 72 Lamination Layers',
    imageArtType: 'pastry',
    prepTime: 'Ready to serve',
    isSignature: true,
  },
  {
    id: 'cardamom-bun-tart',
    name: 'Artisan Cardamom Bun',
    category: 'bakery',
    price: 4.90,
    description: 'Traditional Swedish twisted brioche enriched with freshly cracked green cardamom seeds, brown sugar butter, and pearl crunch.',
    tastingNotes: ['Fragrant Cardamom', 'Caramelized Edge', 'Golden Pearl Sugar'],
    roastOrBakerNotes: 'Slow 24h Cold Fermentation · Sourdough Starter',
    imageArtType: 'pastry',
    prepTime: 'Ready to serve',
    isSignature: false,
  },
];
