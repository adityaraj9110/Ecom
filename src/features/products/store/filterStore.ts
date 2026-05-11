import { create } from 'zustand';

interface FilterState {
  category: string;
  searchQuery: string;
  sortBy: string;
  setCategory: (category: string) => void;
  setSearchQuery: (query: string) => void;
  setSortBy: (sort: string) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  category: '',
  searchQuery: '',
  sortBy: '',
  setCategory: (category) => set({ category }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSortBy: (sortBy) => set({ sortBy }),
  resetFilters: () => set({ category: '', searchQuery: '', sortBy: '' }),
}));
