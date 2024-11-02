import { create } from "zustand";
import { produce } from "immer";

const useModalStore = create((set) => ({
  modals: {},

  openModal: (id) =>
    set(
      produce((state) => {
        state.modals[id] = true;
      }),
    ),

  closeModal: (id) =>
    set(
      produce((state) => {
        state.modals[id] = false;
      }),
    ),
}));

export default useModalStore;
