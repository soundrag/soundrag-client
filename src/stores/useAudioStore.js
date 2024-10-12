import { create } from "zustand";
import sampleFile from "../assets/sounds/sample.mp3";

const useAudioStore = create((set, get) => ({
  isPlaying: false,
  hasUploaded: false,

  duration: 0,
  currentTime: 0,

  file: sampleFile,
  fileName: "sample.mp3",
  fileUrl: sampleFile,
  showFullFileName: false,

  temporaryFile: null,
  temporaryFileName: null,
  temporaryAudioUrl: null,

  togglePlayPause: () => set((state) => ({ isPlaying: !state.isPlaying })),

  setDuration: (duration) => set({ duration }),

  setCurrentTime: (currentTime) => set({ currentTime }),

  setShowFullFileName: () =>
    set((state) => ({ showFullFileName: !state.showFullFileName })),

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

  resetUploadedFile: () => {
    const { fileName } = get();

    if (fileName === "sample.mp3") {
      return;
    }
    set({
      isPlaying: false,
      hasUploaded: false,

      file: sampleFile,
      fileName: "sample.mp3",
      fileUrl: sampleFile,
    });
  },
}));

export default useAudioStore;
