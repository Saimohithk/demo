export interface HeroCard {
  id: string;
  title: string;
  subtitle: string;
  column: 1 | 2 | 3;
  aspectRatio: string;
  imageArtType: 'espresso' | 'crema' | 'barista' | 'pastry' | 'interior' | 'beans' | 'cups';
  depthZ: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  driftSpeed: number;
  tag: string;
  story: string;
  details: {
    origin?: string;
    extraction?: string;
    temp?: string;
    notes?: string;
    elevation?: string;
  };
}

export interface MenuItem {
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

export interface OriginStory {
  id: string;
  country: string;
  region: string;
  farm: string;
  altitude: string;
  varietal: string;
  process: string;
  cuppingScore: number;
  notes: string[];
  description: string;
}

export interface TastingTrayItem {
  cartId: string;
  item: MenuItem;
  quantity: number;
  milkOption?: string;
  tempOption?: string;
  sweetness?: string;
}
