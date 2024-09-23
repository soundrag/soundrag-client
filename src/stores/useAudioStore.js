import { create } from "zustand";
import sampleFile from "../assets/sounds/sample.mp3";

const useAudioStore = create((set) => ({
  isPlaying: false,
  hasUploaded: false,

  duration: 0,
  currentTime: 0,

  file: sampleFile,
  fileName: "sample.mp3",
  fileUrl: sampleFile,

  temporaryFile: null,
  temporaryFileName: null,
  temporaryAudioUrl: null,

  togglePlayPause: () => set((state) => ({ isPlaying: !state.isPlaying })),

  setDuration: (duration) => set({ duration }),

  setCurrentTime: (currentTime) => set({ currentTime }),

  setTemporaryFile: (file) => {
    const audioUrl = URL.createObjectURL(file);

    set({
      temporaryFile: file,
      temporaryFileName: file.name,
      temporaryAudioUrl: audioUrl,
      hasUploaded: true,
    });
  },

  resetTemporaryFile: () => {
    set({
      hasUploaded: false,

      temporaryFile: null,
      temporaryFileName: null,
      temporaryAudioUrl: null,
    });
  },

  setUploadedFile: () => {
    set((state) => ({
      isPlaying: false,
      hasUploaded: false,

      file: state.temporaryFile,
      fileName: state.temporaryFileName,
      fileUrl: state.temporaryAudioUrl,

      temporaryFile: null,
      temporaryFileName: null,
      temporaryAudioUrl: null,
    }));
  },

  resetUploadedFile: () =>
    set({
      isPlaying: false,
      hasUploaded: false,

      file: sampleFile,
      fileName: "sample.mp3",
      fileUrl: sampleFile,
    }),
}));

export default useAudioStore;
