import { create } from "zustand";

import type { GalleryState } from "../types/store";

const useGalleryStore = create<GalleryState>((set) => ({
  isGallery: false,

  toggleGallery: () => set((state) => ({ isGallery: !state.isGallery })),
  closeGallery: () => set({ isGallery: false }),
}));

export default useGalleryStore;
