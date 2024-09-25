import { create } from "zustand";

const useAuthStore = create((set) => ({
  userId: "",

  userData: [],

  errorMessage: "",

  setIsLoggedIn: (loggedIn) => set({ isLoggedIn: loggedIn }),

  setUserId: (id) => set({ userId: id }),

  setUserData: (data) => set({ userData: data }),
  resetUserData: () => set({ userData: [] }),

  setErrorMessage: (message) => set({ errorMessage: message }),
}));

export default useAuthStore;
