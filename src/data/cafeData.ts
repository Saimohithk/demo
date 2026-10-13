import { HeroCard, MenuItem, OriginStory } from '../types/cafe';

export const HERO_CARDS: HeroCard[] = [
  // COLUMN 1 (Left): Extreme close-up extraction & textures
  {
    id: 'extraction',
    title: 'Extraction 09 Bar',
    subtitle: 'Heirloom washed · 93.4°C',
    column: 1,
    aspectRatio: 'aspect-[3/4]',
    imageArtType: 'espresso',
    depthZ: 40,
    rotX: 3.5,
    rotY: 6,
    rotZ: -2,
    driftSpeed: 1.2,
    tag: 'Tasting Note · 01',
    story: 'Bottomless extraction reveals the amber micro-crema emulsion, capturing pure aromatic essential oils before contact with air.',
    details: {
      origin: 'Huila, Colombia · Finca El Mirador',
      extraction: '1:2.2 ratio in 27.5s',
      temp: '93.4°C at 9.0 bar',
      notes: 'Blood orange, roasted hazelnut, dark cocoa',
      elevation: '1,850m MASL'
    }
  },
  {
    id: 'beans',
    title: 'Bourbon & Typica',
    subtitle: 'Volcanic soil · Slow roast',
    column: 1,
    aspectRatio: 'aspect-square',
    imageArtType: 'beans',
    depthZ: -30,
    rotX: -2,
    rotY: 8,
    rotZ: 1.5,
    driftSpeed: 0.9,
    tag: 'Terroir · 02',
    story: 'Hand-sorted high altitude beans roasted on our cast iron 1968 Probat batch drum to a delicate light-medium caramelization.',
    details: {
      origin: 'Tarrazú & Sidama estates',
      temp: 'Max drum temp 208°C',
      notes: 'Jasmine blossom, apricot, toffee',
      elevation: '1,900m–2,150m'
    }
  },

  // COLUMN 2 (Center): The Ritual & Swirling Crema
  {
    id: 'pour',
    title: 'The Hand Pour',
    subtitle: 'Ceramic Origami · 45s bloom',
    column: 2,
    aspectRatio: 'aspect-[4/5]',
    imageArtType: 'barista',
    depthZ: 120,
    rotX: -1.5,
    rotY: 0,
    rotZ: 0.5,
    driftSpeed: 1.0,
    tag: 'Precision · 03',
    story: 'Continuous spiral pouring with 94°C remineralized spring water coaxing crisp florals and juicy stone fruit acidity from the grounds.',
    details: {
      origin: 'Yirgacheffe Gedeb, Ethiopia',
      extraction: 'V60 ceramic · 300ml',
      temp: '94°C slow pulse',
      notes: 'Bergamot, white peach, elderflower',
      elevation: '2,200m'
    }
  },
  {
    id: 'crema',
    title: 'Crema & Guernsey Milk',
    subtitle: 'Silky microfoam vortex',
    column: 2,
    aspectRatio: 'aspect-[1/1]',
    imageArtType: 'crema',
    depthZ: 70,
    rotX: 4,
    rotY: -2,
    rotZ: -1,
    driftSpeed: 1.1,
    tag: 'Emulsion · 04',
    story: 'Silky textured foam poured at 62°C onto a double ristretto base creates seamless sweetness without added sugars.',
    details: {
      origin: 'Estate blend & Jersey dairy',
      temp: 'Steamed to exactly 62°C',
      notes: 'Crème brûlée, marzipan, honeycomb',
      elevation: 'Artisan craft'
    }
  },

  // COLUMN 3 (Right): Viennoiserie, Architecture & Ceramic Warmth
  {
    id: 'croissant',
    title: 'Pistachio Viennoiserie',
    subtitle: '72-layer laminated butter',
    column: 3,
    aspectRatio: 'aspect-square',
    imageArtType: 'pastry',
    depthZ: 20,
    rotX: -3,
    rotY: -7,
    rotZ: 2,
    driftSpeed: 0.85,
    tag: 'Pâtisserie · 05',
    story: 'Handcrafted daily by our master baker using Montaigu churned butter and filled with pure Sicilian Bronte pistachio praline.',
    details: {
      origin: 'Normandy butter & Bronte pistachios',
      temp: 'Baked at dawn in deck ovens',
      notes: 'Flaky fleur de sel, toasted nut crunch'
    }
  },
  {
    id: 'sanctuary',
    title: 'Morning Sanctuary',
    subtitle: 'Natural smoked oak & amber sun',
    column: 3,
    aspectRatio: 'aspect-[3/4]',
    imageArtType: 'interior',
    depthZ: -50,
    rotX: 2,
    rotY: -8,
    rotZ: -1.5,
    driftSpeed: 1.3,
    tag: 'Space · 06',
    story: 'Designed with acoustically damped plaster, brass details, and oversized steel windows welcoming soft Parisian morning light.',
    details: {
      origin: '74 Boulevard Saint-Germain',
      notes: 'Warm light, vinyl acoustics, quiet mornings'
    }
  },
  {
    id: 'ceramics',
    title: 'Handmade Stoneware',
    subtitle: 'Fired in Burgundy kilns',
    column: 3,
    aspectRatio: 'aspect-[4/3]',
    imageArtType: 'cups',
    depthZ: 90,
    rotX: -1,
    rotY: -4,
    rotZ: 1,
    driftSpeed: 0.95,
    tag: 'Tactility · 07',
    story: 'Every vessel is thrown individually with local iron-rich clay, engineered with thermal retention rims that optimize aromatics.',
    details: {
      origin: 'La Borne pottery guild',
      temp: 'Wood-fired at 1,300°C',
      notes: 'Tactile unglazed exterior, smooth interior'
    }
  }
];

export const MENU_ITEMS: MenuItem[] = [
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
    isSignature: true
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
    isSignature: true
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
    isSignature: true
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
    isSignature: true
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
    isSignature: true
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
    isSignature: false
  }
];

export const ORIGIN_STORIES: OriginStory[] = [
  {
    id: 'ethiopia',
    country: 'Ethiopia',
    region: 'Yirgacheffe, Gedeb',
    farm: 'Banko Gotiti Smallholders',
    altitude: '2,150m – 2,300m',
    varietal: 'Indigenous Kurume & Dega Heirlooms',
    process: 'Washed with 48h fermentation & raised bed drying',
    cuppingScore: 91.5,
    notes: ['Bergamot Blossom', 'White Peach', 'Meyer Lemon Marmalade'],
    description: 'Grown on steep mist-veiled terraced slopes in southern Ethiopia. Handpicked cherries deliver an ethereal tea-like clarity and aromatic jasmine perfumed aroma.'
  },
  {
    id: 'colombia',
    country: 'Colombia',
    region: 'Huila, San Adolfo',
    farm: 'Finca El Mirador · Rodrigo Sanchez',
    altitude: '1,750m – 1,850m',
    varietal: 'Pink Bourbon (Natural Mutation)',
    process: 'Double Thermal Shock & Anaerobic Fermentation',
    cuppingScore: 90.0,
    notes: ['Candied Blood Orange', 'Papaya', '70% Dark Chocolate'],
    description: 'A prized rare hybrid combining the sweetness of Yellow Bourbon with the resilience of Red Bourbon. High natural sugars develop an intoxicating juicy sweetness.'
  },
  {
    id: 'costa-rica',
    country: 'Costa Rica',
    region: 'Tarrazú Valley',
    farm: 'Hacienda La Minita Estate',
    altitude: '1,600m – 1,800m',
    varietal: 'Red Caturra & Catuai',
    process: 'White Honey Process · Shade Grown',
    cuppingScore: 89.2,
    notes: ['Toffee Crisp', 'Honeycrisp Apple', 'Roasted Pecan'],
    description: 'Nourished by volcanic mineral soil and cool Pacific mountain breezes. Clean, balanced, and round with a buttery body that anchors our milk-based creations.'
  }
];

export const EXPERIENCE_GALLERY = [
  {
    title: 'The Morning Extraction',
    subtitle: 'First pull of the day at 07:30',
    artType: 'espresso',
    category: 'Ritual'
  },
  {
    title: 'Smoked Oak Architecture',
    subtitle: 'Natural materials & Parisian limestone',
    artType: 'interior',
    category: 'Atmosphere'
  },
  {
    title: 'Direct-Trade Farm Lots',
    subtitle: 'Direct sourcing with smallholder producers',
    artType: 'beans',
    category: 'Sourcing'
  },
  {
    title: '72-Layer Viennoiserie',
    subtitle: 'Laminated by hand every morning',
    artType: 'pastry',
    category: 'Bakehouse'
  },
  {
    title: 'Stoneware & Ceramic Craft',
    subtitle: 'Custom thrown cups for optimal crema retention',
    artType: 'cups',
    category: 'Craft'
  }
];
