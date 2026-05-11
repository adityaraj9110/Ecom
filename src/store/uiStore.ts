import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UiStore {
  isCartOpen: boolean;
  theme: 'light' | 'dark';
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  toggleTheme: () => void;
}

export const useUiStore = create<UiStore>()(
  persist(
    (set) => ({
      isCartOpen: false,
      theme: 'light',
      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
      toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
    }),
    {
      name: 'ui-storage',
    }
  )
);

