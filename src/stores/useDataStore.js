import { create } from "zustand";

const useDataStore = create((set) => ({
  userId: "",
  positionId: "",
  positionIdToDelete: "",
  userData: [],

  speakers: [],

  listenerPosition: [],

  setUserId: (userId) => set({ userId }),

  setPositionIdToDelete: (positionId) =>
    set({ positionIdToDelete: positionId }),

  setUserData: (data) => set({ userData: data }),

  setSpeakers: (speakers) => set({ speakers }),

  setListenerPosition: (position) => set({ listenerPosition: position }),

  resetUserData: () =>
    set({ userData: [], speakers: [], listenerPosition: [] }),
}));

export default useDataStore;
