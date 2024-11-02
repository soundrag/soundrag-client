import { create } from "zustand";
import { produce } from "immer";
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

    set(
      produce((state) => {
        state.models[modelName] = gltfFile.scene;
      }),
    );
  },

  setModelScale: (modelName, scale) => {
    set(
      produce((state) => {
        state.scales[modelName] = scale;
      }),
    );
  },

  setModelRotations: (modelName, rotation) => {
    set(
      produce((state) => {
        state.rotations[modelName] = rotation;
      }),
    );
  },

  setModelPositions: (modelName, position) => {
    set(
      produce((state) => {
        state.positions[modelName] = position;
        state.positionId = uuidv4();
      }),
    );
  },

  setModelDragState: (modelName, dragging) => {
    set(
      produce((state) => {
        state.isDragging[modelName] = dragging;
      }),
    );
  },

  getModelDragState: (modelName) => {
    return get().isDragging[modelName] || false;
  },
}));

export default useModelStore;
