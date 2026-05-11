import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@appTypes/api.types';

interface RecentlyViewedStore {
  items: Product[];
  addItem: (product: Product) => void;
  clearItems: () => void;
}

export const useRecentlyViewedStore = create<RecentlyViewedStore>()(
  persist(
    (set) => ({
      items: [],
      addItem: (product) => set((state) => {
        // Remove the product if it already exists and add it to the front
        const filteredItems = state.items.filter((item) => item.id !== product.id);
        const newItems = [product, ...filteredItems].slice(0, 10); // Keep last 10
        return { items: newItems };
      }),
      clearItems: () => set({ items: [] }),
    }),
    {
      name: 'recently-viewed-storage',
    }
  )
);
