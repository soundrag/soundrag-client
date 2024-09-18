import { create } from "zustand";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const useModelStore = create((set, get) => ({
  models: {},
  scales: {},
  positions: {},

  loadModel: async (modelName, path) => {
    const loader = new GLTFLoader();
    const gltfFile = await loader.loadAsync(path);
    const models = get().models;

    set({ models: { ...models, [modelName]: gltfFile.scene } });
  },

  setModelScale: (modelName, scale) => {
    const scales = get().scales;

    set({ scales: { ...scales, [modelName]: scale } });
  },

  setModelPosition: (modelName, position) => {
    const positions = get().positions;

    set({ positions: { ...positions, [modelName]: position } });
  },
}));

export default useModelStore;
