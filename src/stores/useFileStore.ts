import { create } from "zustand";
import sampleFile from "../../public/sounds/sample.mp3";

import type { FileState } from "../types/store";

const useFileStore = create<FileState>((set, get) => ({
  hasUploaded: false,
  fileName: "sample.mp3",
  fileUrl: sampleFile,
  showFullFileName: false,
  temporaryFileName: null,
  temporaryAudioUrl: null,

  setShowFullFileName: () =>
    set((state) => ({ showFullFileName: !state.showFullFileName })),
  setTemporaryFile: (file) => {
    const audioUrl = URL.createObjectURL(file);

    set({
      temporaryFileName: file.name,
      temporaryAudioUrl: audioUrl,
    });
  },
  resetTemporaryFile: () => {
    set({
      temporaryFileName: null,
      temporaryAudioUrl: null,
    });
  },
  setUploadedFile: () => {
    set((state) => ({
      fileName: state.temporaryFileName,
      fileUrl: state.temporaryAudioUrl,

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
      fileName: "sample.mp3",
      fileUrl: sampleFile,
    });
  },
}));

export default useFileStore;
