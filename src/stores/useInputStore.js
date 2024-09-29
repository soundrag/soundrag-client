import { create } from "zustand";

const useInputStore = create((set) => ({
  name: "",
  isNameValid: false,

  setName: (name) => {
    set({ name, isNameValid: name.length > 0 && name.length <= 20 });
  },
}));

export default useInputStore;
