import { create } from "zustand";

import type { VersionState } from "../types/store";

const useVersionStore = create<VersionState>((set) => ({
  userVersion: [],
  versionIndex: 0,

  setUserVersion: (version) =>
    set({
      userVersion: version,
      versionIndex: version.length > 0 ? version.length - 1 : 0,
    }),
  setVersionIndex: (index) =>
    set((state) => ({
      versionIndex:
        index >= 0 && index < state.userVersion.length
          ? index
          : state.versionIndex,
    })),
}));

export default useVersionStore;
