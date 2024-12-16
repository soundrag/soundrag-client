import { create } from "zustand";
import { produce } from "immer";

import type { ModalState } from "../types/store";

const useModalStore = create<ModalState>((set) => ({
  modals: {},

  openModal: (modalName) =>
    set(
      produce((state) => {
        state.modals[modalName] = true;
      }),
    ),
  closeModal: (modalName) =>
    set(
      produce((state) => {
        state.modals[modalName] = false;
      }),
    ),
}));

export default useModalStore;
