import { create } from "zustand";

import type { ModeState } from "../types/store";

const useModeStore = create<ModeState>((set, get) => ({
  mode: "View",
  modes: ["View", "Drag", "Rotate"],

  isViewMode: () => get().mode === "View",
  isDragMode: () => get().mode === "Drag",
  isRotateMode: () => get().mode === "Rotate",
  switchMode: (newMode) => set({ mode: newMode }),
}));

export default useModeStore;
