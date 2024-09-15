import { create } from "zustand";

const useAuthStore = create((set) => ({
  errorMessage: "",
  setIsLoggedIn: (loggedIn) => set({ isLoggedIn: loggedIn }),
  setErrorMessage: (message) => set({ errorMessage: message }),
}));

export default useAuthStore;
