import { create } from "zustand";

import type { AuthState } from "../types/store";

const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  isAuthChecked: false,

  setIsLoggedIn: (loggedIn) => set({ isLoggedIn: loggedIn }),
  setIsAuthChecked: (authChecked) => set({ isAuthChecked: authChecked }),
}));

export default useAuthStore;
