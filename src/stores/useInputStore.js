import { create } from "zustand";

const useInputStore = create((set) => ({
  name: "",

  description: "",

  setName: (name) => set({ name }),

  setDescription: (description) => set({ description }),
}));

export default useInputStore;
