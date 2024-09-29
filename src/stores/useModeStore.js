import { create } from "zustand";

const useModeStore = create((set, get) => ({
  mode: "View",
  modes: ["View", "Drag", "Rotate"],

  isViewMode: () => get().mode === "View",

  isDragMode: () => get().mode === "Drag",

  isRotateMode: () => get().mode === "Rotate",

  toggleMode: () => {
    const currentModeIndex = get().modes.indexOf(get().mode);
    const nextModeIndex = (currentModeIndex + 1) % get().modes.length;

    set({ mode: get().modes[nextModeIndex] });
  },

  switchMode: (newMode) => set({ mode: newMode }),
}));

export default useModeStore;
