import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import {
  FIRST_SPEAKER_STARTING_POSITION,
  SECOND_SPEAKER_STARTING_POSITION,
  LISTENER_STARTING_POSITION,
} from "../constants";

const useModelStore = create((set, get) => ({
  models: {},

  scales: {},

  positions: {},
  userPositions: {},
  previousPositions: {},
  savedPositions: {
    firstSpeaker: FIRST_SPEAKER_STARTING_POSITION,
    secondSpeaker: SECOND_SPEAKER_STARTING_POSITION,
    listener: LISTENER_STARTING_POSITION,
  },

  positionId: uuidv4(),

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

  setModelPositions: (modelName, position) => {
    const positions = get().positions;
    const prevPositions = get().previousPositions;

    if (JSON.stringify(positions[modelName]) === JSON.stringify(position)) {
      return;
    }

    set({
      positions: { ...positions, [modelName]: position },
      positionId: uuidv4(),
      prevPositions: { ...prevPositions, [modelName]: position },
    });
  },

  setUserPositions: (
    firstSpeakerPosition,
    secondSpeakerPosition,
    listenerPosition,
  ) => {
    set({
      userPositions: {
        firstSpeaker: firstSpeakerPosition,
        secondSpeaker: secondSpeakerPosition,
        listener: listenerPosition,
      },
      positionId: uuidv4(),
    });
  },

  autoSetPositions: (positions) => {
    set({ savedPositions: positions });
  },

  restorePositions: () => {
    const savedPositions = get().savedPositions;

    if (savedPositions) {
      set({ positions: JSON.parse(JSON.stringify(savedPositions)) });
    }
  },
}));

export default useModelStore;
