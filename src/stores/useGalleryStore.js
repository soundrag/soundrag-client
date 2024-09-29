import { create } from "zustand";

const useGalleryStore = create((set) => ({
  isGallery: false,

  toggleGallery: () => set((state) => ({ isGallery: !state.isGallery })),
  closeGallery: () => set({ isGallery: false }),
}));

export default useGalleryStore;
