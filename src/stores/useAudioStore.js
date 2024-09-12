import { create } from "zustand";

const useAudioStore = create((set) => ({
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  fileName: "sample.mp3",
  togglePlayPause: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setCurrentTime: (currentTime) => set({ currentTime }),
  setDuration: (duration) => set({ duration }),
  setFileName: (fileName) => set({ fileName }),
}));

export default useAudioStore;
