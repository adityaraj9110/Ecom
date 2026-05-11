import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UiStore {
  isCartOpen: boolean;
  isMenuOpen: boolean;
  theme: 'light' | 'dark';
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  openMenu: () => void;
  closeMenu: () => void;
  toggleMenu: () => void;
  toggleTheme: () => void;
}

export const useUiStore = create<UiStore>()(
  persist(
    (set) => ({
      isCartOpen: false,
      isMenuOpen: false,
      theme: 'light',
      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
      openMenu: () => set({ isMenuOpen: true }),
      closeMenu: () => set({ isMenuOpen: false }),
      toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
      toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
    }),

    {
      name: 'ui-storage',
    }
  )
);

