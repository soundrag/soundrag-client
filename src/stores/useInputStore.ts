import { create } from "zustand";

import type { InputState } from "../types/store";

const useInputStore = create<InputState>((set) => ({
  name: "",
  isNameValid: false,

  setName: (name) => {
    set({ name, isNameValid: name.length > 0 && name.length <= 20 });
  },
}));

export default useInputStore;
