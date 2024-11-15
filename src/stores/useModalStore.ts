import { create } from "zustand";
import { produce } from "immer";

import type { ModalState } from "../types/store";

const useModalStore = create<ModalState>((set) => ({
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
