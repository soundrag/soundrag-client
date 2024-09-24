import { create } from "zustand";

const useModeStore = create((set, get) => ({
  mode: "View",

  isViewMode: () => get().mode === "View",

  isDragMode: () => get().mode === "Drag",

  toggleMode: () => {
    const currentMode = get().mode;
    const newMode = currentMode === "View" ? "Drag" : "View";

    set({ mode: newMode });
  },

  switchMode: (newMode) => set({ mode: newMode }),
}));

export default useModeStore;
