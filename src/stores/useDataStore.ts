import { create } from "zustand";

import type { DataState } from "../types/store";

const useDataStore = create<DataState>((set) => ({
  userId: "",

  positionId: "",
  positionIdToDelete: "",

  userData: [],

  currentIndex: 0,

  setUserId: (userId) => set({ userId }),

  setPositionIdToDelete: (positionId) =>
    set({ positionIdToDelete: positionId }),

  setUserData: (data) =>
    set({
      userData: data,
      currentIndex: data.length > 0 ? data.length - 1 : 0,
    }),

  resetUserData: () => set({ userData: [], currentIndex: 0 }),

  setCurrentIndex: (index) =>
    set((state) => ({
      currentIndex:
        index >= 0 && index < state.userData.length
          ? index
          : state.currentIndex,
    })),
}));

export default useDataStore;
