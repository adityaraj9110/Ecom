import { create } from 'zustand';
import { Product } from '@appTypes/api.types';

interface ComparisonStore {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  clear: () => void;
  isInComparison: (productId: number) => boolean;
}

export const useComparisonStore = create<ComparisonStore>((set, get) => ({
  items: [],
  addItem: (product) => {
    const { items } = get();
    if (items.length >= 4) return;
    if (items.some((item) => item.id === product.id)) return;
    set({ items: [...items, product] });
  },
  removeItem: (productId) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== productId),
    }));
  },
  clear: () => set({ items: [] }),
  isInComparison: (productId) => {
    return get().items.some((item) => item.id === productId);
  },
}));
