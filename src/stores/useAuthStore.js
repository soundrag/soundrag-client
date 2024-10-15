import { create } from "zustand";

const useAuthStore = create((set) => ({
  setIsLoggedIn: (loggedIn) => set({ isLoggedIn: loggedIn }),
}));

export default useAuthStore;
