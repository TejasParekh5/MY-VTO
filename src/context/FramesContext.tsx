import React, { createContext, useContext, useState, useMemo, ReactNode, useEffect } from 'react';
import { GLASSES_DATASET } from '@/utils/GlassesDataset';
import { loadFramesWithRealAssets } from '@/utils/loadRealFrameAssets';

export interface ClosetItemMeta {
  id: string;
  savedAt: number;
  timesTried: number;
  favorited: boolean;
  lastTried?: number;
}

interface FramesContextValue {
  frames: any[]; // TODO: tighten typing (GlassesData[])
  loadingAssets: boolean;
  wishlist: Set<string>;
  closet: Record<string, ClosetItemMeta>;
  toggleWishlist: (id: string) => void;
  addToCloset: (id: string) => void;
  incrementTried: (id: string) => void;
  removeFromCloset: (id: string) => void;
}

const FramesContext = createContext<FramesContextValue | null>(null);

export const FramesProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [closet, setCloset] = useState<Record<string, ClosetItemMeta>>({});

  const [frames, setFrames] = useState<any[]>(() => GLASSES_DATASET.map(f => ({ ...f })));
  const [loadingAssets, setLoadingAssets] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoadingAssets(true);
    loadFramesWithRealAssets().then(res => { if (mounted) setFrames(res); }).finally(()=> mounted && setLoadingAssets(false));
    return () => { mounted = false; };
  }, []);

  const toggleWishlist = (id: string) => {
    setWishlist(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const addToCloset = (id: string) => {
    setCloset(prev => prev[id] ? prev : ({ ...prev, [id]: { id, savedAt: Date.now(), timesTried: 0, favorited: false } }));
  };

  const incrementTried = (id: string) => {
    setCloset(prev => prev[id] ? ({ ...prev, [id]: { ...prev[id], timesTried: prev[id].timesTried + 1, lastTried: Date.now() } }) : prev);
  };

  const removeFromCloset = (id: string) => {
    setCloset(prev => { const copy = { ...prev }; delete copy[id]; return copy; });
  };

  return (
    <FramesContext.Provider value={{ frames, loadingAssets, wishlist, closet, toggleWishlist, addToCloset, incrementTried, removeFromCloset }}>
      {children}
    </FramesContext.Provider>
  );
};

export const useFrames = () => {
  const ctx = useContext(FramesContext);
  if (!ctx) throw new Error('useFrames must be used within FramesProvider');
  return ctx;
};
