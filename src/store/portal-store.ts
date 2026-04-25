"use client";

import { create } from "zustand";

type PortalState = {
  theme: "dark" | "light";
  searchQuery: string;
  isMobileMenuOpen: boolean;
  isMobileSearchOpen: boolean;
  isSubmitModalOpen: boolean;
  setTheme: (theme: "dark" | "light") => void;
  setSearchQuery: (query: string) => void;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  toggleMobileSearch: () => void;
  closeMobileSearch: () => void;
  openSubmitModal: () => void;
  closeSubmitModal: () => void;
};

export const usePortalStore = create<PortalState>((set) => ({
  theme: "dark",
  searchQuery: "",
  isMobileMenuOpen: false,
  isMobileSearchOpen: false,
  isSubmitModalOpen: false,
  setTheme: (theme) => set({ theme }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  toggleMobileMenu: () =>
    set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  toggleMobileSearch: () =>
    set((state) => ({ isMobileSearchOpen: !state.isMobileSearchOpen })),
  closeMobileSearch: () => set({ isMobileSearchOpen: false }),
  openSubmitModal: () => set({ isSubmitModalOpen: true }),
  closeSubmitModal: () => set({ isSubmitModalOpen: false }),
}));
