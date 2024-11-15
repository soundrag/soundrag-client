import { create } from "zustand";

import type { AuthState } from "../types/store";

const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: (loggedIn) => set({ isLoggedIn: loggedIn }),
}));

export default useAuthStore;
