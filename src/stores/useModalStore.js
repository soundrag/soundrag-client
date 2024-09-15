import { create } from "zustand";

const useModalStore = create((set) => ({
  modals: {},
  openModal: (id) =>
    set((state) => ({ modals: { ...state.modals, [id]: true } })),
  closeModal: (id) =>
    set((state) => ({ modals: { ...state.modals, [id]: false } })),
}));

export default useModalStore;
