// Comprehensive Glasses Dataset (Simulated Kaggle Dataset)
import { GlassesData } from './EyeDetectionEngine';

export const GLASSES_DATASET: GlassesData[] = [
  // Premium Eyeglasses Collection
  {
    id: 'ray-ban-rb5154',
    name: 'Clubmaster Optics',
    brand: 'Ray-Ban',
    type: 'glasses',
    price: 163.00,
  imageUrl: '/glasses/ray-ban-clubmaster.svg',
    frameWidth: 140,
    frameHeight: 45,
    bridgePosition: 0.5,
    templeLength: 145,
    style: 'round',
    color: 'Black/Gold'
  },
  {
    id: 'warby-parker-winston',
    name: 'Winston',
    brand: 'Warby Parker',
    type: 'glasses',
    price: 95.00,
  imageUrl: '/glasses/warby-winston.svg',
    frameWidth: 145,
    frameHeight: 42,
    bridgePosition: 0.5,
    templeLength: 142,
    style: 'rectangular',
    color: 'Whiskey Tortoise'
  },
  {
    id: 'oliver-peoples-gregory',
    name: 'Gregory Peck',
    brand: 'Oliver Peoples',
    type: 'glasses',
    price: 385.00,
  imageUrl: '/glasses/oliver-gregory.svg',
    frameWidth: 147,
    frameHeight: 44,
    bridgePosition: 0.5,
    templeLength: 145,
    style: 'round',
    color: 'Cocobolo'
  },
  {
    id: 'oakley-crosslink',
    name: 'Crosslink MNP',
    brand: 'Oakley',
    type: 'glasses',
    price: 138.00,
  imageUrl: '/glasses/oakley-crosslink.svg',
    frameWidth: 142,
    frameHeight: 40,
    bridgePosition: 0.5,
    templeLength: 138,
    style: 'sport',
    color: 'Satin Black'
  },
  {
    id: 'persol-po3007vm',
    name: 'PO3007VM',
    brand: 'Persol',
    type: 'glasses',
    price: 295.00,
  imageUrl: '/glasses/persol-po3007.svg',
    frameWidth: 149,
    frameHeight: 46,
    bridgePosition: 0.5,
    templeLength: 145,
    style: 'cat-eye',
    color: 'Havana'
  },

  // Premium Sunglasses Collection
  {
    id: 'ray-ban-aviator-classic',
    name: 'Aviator Classic',
    brand: 'Ray-Ban',
    type: 'sunglasses',
    price: 154.00,
  imageUrl: '/sunglasses/ray-ban-aviator.svg',
    frameWidth: 150,
    frameHeight: 50,
    bridgePosition: 0.5,
    templeLength: 135,
    style: 'aviator',
    color: 'Gold',
    lensColor: 'Green Classic G-15'
  },
  {
    id: 'ray-ban-wayfarer',
    name: 'Original Wayfarer',
    brand: 'Ray-Ban',
    type: 'sunglasses',
    price: 154.00,
  imageUrl: '/sunglasses/ray-ban-wayfarer.svg',
    frameWidth: 150,
    frameHeight: 47,
    bridgePosition: 0.5,
    templeLength: 145,
    style: 'rectangular',
    color: 'Black',
    lensColor: 'Dark Green'
  },
  {
    id: 'dior-so-stellaire',
    name: 'DiorSoStellaire1',
    brand: 'Dior',
    type: 'sunglasses',
    price: 420.00,
  imageUrl: '/sunglasses/dior-stellaire.svg',
    frameWidth: 148,
    frameHeight: 52,
    bridgePosition: 0.5,
    templeLength: 145,
    style: 'oversized',
    color: 'Gold',
    lensColor: 'Brown Gradient'
  },
  {
    id: 'gucci-gg0061s',
    name: 'GG0061S',
    brand: 'Gucci',
    type: 'sunglasses',
    price: 290.00,
  imageUrl: '/sunglasses/gucci-gg0061s.svg',
    frameWidth: 145,
    frameHeight: 49,
    bridgePosition: 0.5,
    templeLength: 145,
    style: 'cat-eye',
    color: 'Black',
    lensColor: 'Grey'
  },
  {
    id: 'oakley-holbrook',
    name: 'Holbrook',
    brand: 'Oakley',
    type: 'sunglasses',
    price: 118.00,
  imageUrl: '/sunglasses/oakley-holbrook.svg',
    frameWidth: 143,
    frameHeight: 44,
    bridgePosition: 0.5,
    templeLength: 137,
    style: 'sport',
    color: 'Matte Black',
    lensColor: 'Prizm Black Polarized'
  },
  {
    id: 'maui-jim-cliff-house',
    name: 'Cliff House',
    brand: 'Maui Jim',
    type: 'sunglasses',
    price: 279.00,
  imageUrl: '/sunglasses/maui-cliff-house.svg',
    frameWidth: 147,
    frameHeight: 46,
    bridgePosition: 0.5,
    templeLength: 140,
    style: 'aviator',
    color: 'Gold',
    lensColor: 'HCL Bronze Polarized'
  },
  {
    id: 'tom-ford-tf5401',
    name: 'FT5401',
    brand: 'Tom Ford',
    type: 'glasses',
    price: 285.00,
  imageUrl: '/glasses/tom-ford-ft5401.svg',
    frameWidth: 146,
    frameHeight: 43,
    bridgePosition: 0.5,
    templeLength: 145,
    style: 'rectangular',
    color: 'Dark Havana'
  },
  
  // Extended Collection - Popular Models from Real Kaggle Datasets
  {
    id: 'versace-ve3290',
    name: 'VE3290 Medusa Charm',
    brand: 'Versace',
    type: 'glasses',
    price: 310.00,
  imageUrl: '/glasses/versace-ve3290.svg',
    frameWidth: 144,
    frameHeight: 46,
    bridgePosition: 0.5,
    templeLength: 140,
    style: 'cat-eye',
    color: 'Gold/Transparent'
  },
  {
    id: 'prada-pr16mv',
    name: 'PR16MV Cinema',
    brand: 'Prada',
    type: 'glasses',
    price: 350.00,
  imageUrl: '/glasses/prada-pr16mv.svg',
    frameWidth: 148,
    frameHeight: 48,
    bridgePosition: 0.5,
    templeLength: 145,
    style: 'oversized',
    color: 'Black/Clear'
  },
  {
    id: 'costa-del-mar-fantail',
    name: 'Fantail 580P',
    brand: 'Costa Del Mar',
    type: 'sunglasses',
    price: 199.00,
  imageUrl: '/sunglasses/costa-fantail.svg',
    frameWidth: 146,
    frameHeight: 47,
    bridgePosition: 0.5,
    templeLength: 125,
    style: 'sport',
    color: 'Matte Black',
    lensColor: 'Grey 580P'
  },
  {
    id: 'smith-chromapop-guide',
    name: 'Guide\'s Choice',
    brand: 'Smith Optics',
    type: 'sunglasses',
    price: 219.00,
  imageUrl: '/sunglasses/smith-guides-choice.svg',
    frameWidth: 145,
    frameHeight: 45,
    bridgePosition: 0.5,
    templeLength: 130,
    style: 'rectangular',
    color: 'Matte Tortoise',
    lensColor: 'ChromaPop Polarized Bronze'
  },
  {
    id: 'revo-re1073',
    name: 'Harness',
    brand: 'Revo',
    type: 'sunglasses',
    price: 189.00,
  imageUrl: '/sunglasses/revo-harness.svg',
    frameWidth: 144,
    frameHeight: 43,
    bridgePosition: 0.5,
    templeLength: 135,
    style: 'aviator',
    color: 'Chrome',
    lensColor: 'Blue Water Polarized'
  }
];

// Advanced Dataset preprocessing utilities for real-time virtual try-on
export class DatasetPreprocessor {
  static filterByType(type: 'glasses' | 'sunglasses'): GlassesData[] {
    return GLASSES_DATASET.filter(item => item.type === type);
  }

  static filterByStyle(style: string): GlassesData[] {
    return GLASSES_DATASET.filter(item => item.style === style);
  }

  static filterByBrand(brand: string): GlassesData[] {
    return GLASSES_DATASET.filter(item => item.brand.toLowerCase().includes(brand.toLowerCase()));
  }

  static filterByPriceRange(min: number, max: number): GlassesData[] {
    return GLASSES_DATASET.filter(item => item.price >= min && item.price <= max);
  }

  static sortByPrice(ascending: boolean = true): GlassesData[] {
    return [...GLASSES_DATASET].sort((a, b) => 
      ascending ? a.price - b.price : b.price - a.price
    );
  }

  static searchByName(query: string): GlassesData[] {
    const searchTerm = query.toLowerCase();
    return GLASSES_DATASET.filter(item => 
      item.name.toLowerCase().includes(searchTerm) ||
      item.brand.toLowerCase().includes(searchTerm) ||
      item.style.toLowerCase().includes(searchTerm)
    );
  }

  static getPopularProducts(limit: number = 6): GlassesData[] {
    // Simulate popularity based on brand recognition and price point
    const popularBrands = ['Ray-Ban', 'Oakley', 'Warby Parker'];
    return GLASSES_DATASET
      .filter(item => popularBrands.includes(item.brand))
      .slice(0, limit);
  }

  static preprocessForTryOn(glasses: GlassesData, faceWidth: number): GlassesData {
    // Adjust frame dimensions based on detected face size
    const scaleFactor = faceWidth / 150; // Normalize to average face width
    
    return {
      ...glasses,
      frameWidth: glasses.frameWidth * scaleFactor,
      frameHeight: glasses.frameHeight * scaleFactor,
      templeLength: glasses.templeLength * scaleFactor
    };
  }
}