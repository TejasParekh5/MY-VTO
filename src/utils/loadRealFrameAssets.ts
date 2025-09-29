// Utility to merge a runtime JSON manifest of real product images with the static dataset
// Drop a file at /frames-manifest.json in public following the structure below:
// {
//   "ray-ban-rb5154": { "thumb": "/real/rb5154/thumb.png", "front": "/real/rb5154/front.png" },
//   "oakley-crosslink": { "thumb": "/real/crosslink/thumb.png", "angleLeft": "/real/crosslink/left.png" }
// }
// Any keys inside become the GlassesData.assets map. If a thumb is present we also override imageUrl.

import { GLASSES_DATASET } from './GlassesDataset';
import type { GlassesData } from './EyeDetectionEngine';

export async function loadFramesWithRealAssets(): Promise<GlassesData[]> {
  try {
    const resp = await fetch('/frames-manifest.json', { cache: 'no-store' });
    if (!resp.ok) return GLASSES_DATASET; // Manifest optional
    const manifest = await resp.json() as Record<string, any>;
    return GLASSES_DATASET.map(item => {
      const entry = manifest[item.id];
      if (!entry) return item;
      const merged: GlassesData = { ...item, assets: { ...(item.assets||{}), ...entry } };
      if (entry.thumb) merged.imageUrl = entry.thumb; // card image
      return merged;
    });
  } catch (e) {
    console.warn('Real frame manifest load failed', e);
    return GLASSES_DATASET;
  }
}

// Helper to detect if any real assets are present (for conditional UI badges)
export function hasRealAsset(frame: GlassesData): boolean {
  return !!frame.assets && Object.values(frame.assets).some(Boolean);
}