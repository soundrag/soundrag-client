import { create } from "zustand";

const useModeStore = create((set, get) => ({
  mode: "View",

  isViewMode: () => get().mode === "View",

  isDragMode: () => get().mode === "Drag",

  switchMode: (newMode) => set({ mode: newMode }),
}));

export default useModeStore;
