import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import {
  STANDARD_SPEAKER_SCALE,
  STANDARD_LISTENER_SCALE,
  FIRST_SPEAKER_STARTING_POSITION,
  SECOND_SPEAKER_STARTING_POSITION,
  LISTENER_STARTING_POSITION,
  DEFAULT_ROTATION,
  LISTENER_STARTING_ROTATION,
} from "../constants";

const useModelStore = create((set, get) => ({
  models: {},

  scales: {
    firstSpeaker: STANDARD_SPEAKER_SCALE,
    secondSpeaker: STANDARD_SPEAKER_SCALE,
    listener: STANDARD_LISTENER_SCALE,
  },
  rotations: {
    firstSpeaker: DEFAULT_ROTATION,
    secondSpeaker: DEFAULT_ROTATION,
    listener: LISTENER_STARTING_ROTATION,
  },
  positions: {
    firstSpeaker: FIRST_SPEAKER_STARTING_POSITION,
    secondSpeaker: SECOND_SPEAKER_STARTING_POSITION,
    listener: LISTENER_STARTING_POSITION,
  },

  positionId: uuidv4(),

  isDragging: {},
  speakers: ["firstSpeaker", "secondSpeaker"],

  loadModel: async (modelName, path) => {
    const loader = new GLTFLoader();
    const gltfFile = await loader.loadAsync(path);
    const models = get().models;

    set({ models: { ...models, [modelName]: gltfFile.scene } });
  },

  setModelScale: (modelName, scale) => {
    set((state) => ({ scales: { ...state.scales, [modelName]: scale } }));
  },

  setModelRotations: (modelName, rotation) => {
    set((state) => ({
      rotations: { ...state.rotations, [modelName]: rotation },
    }));
  },

  setModelPositions: (modelName, position) => {
    set((state) => {
      return {
        positions: { ...state.positions, [modelName]: position },
        positionId: uuidv4(),
      };
    });
  },

  setModelDragState: (modelName, dragging) => {
    set((state) => ({
      isDragging: { ...state.isDragging, [modelName]: dragging },
    }));
  },

  getModelDragState: (modelName) => {
    return get().isDragging[modelName] || false;
  },
}));

export default useModelStore;
