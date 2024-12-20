import { create } from "zustand";

import type { DataState } from "../types/store";

const useDataStore = create<DataState>((set) => ({
  userId: "",
  userData: [],

  setUserId: (userId) => set({ userId }),
  setUserData: (data) =>
    set({
      userData: data,
    }),
}));

export default useDataStore;
