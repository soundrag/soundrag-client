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

import { isEqualPosition } from "../utils/validators";

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

  userPositions: {},

  savedPositions: {
    firstSpeaker: FIRST_SPEAKER_STARTING_POSITION,
    secondSpeaker: SECOND_SPEAKER_STARTING_POSITION,
    listener: LISTENER_STARTING_POSITION,
  },
  savedRotations: {
    firstSpeaker: DEFAULT_ROTATION,
    secondSpeaker: DEFAULT_ROTATION,
    listener: LISTENER_STARTING_ROTATION,
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

  setModelRotation: (modelName, rotation) => {
    set((state) => ({
      rotations: { ...state.rotations, [modelName]: rotation },
    }));
  },

  setModelPositions: (modelName, position) => {
    set((state) => {
      const currentPosition = state.positions[modelName];

      if (currentPosition && isEqualPosition(currentPosition, position)) {
        return state;
      }

      return {
        positions: { ...state.positions, [modelName]: position },
        positionId: uuidv4(),
      };
    });
  },

  setUserPositions: (
    firstSpeakerPosition,
    secondSpeakerPosition,
    listenerPosition,
    firstSpeakerRotation,
    secondSpeakerRotation,
    listenerRotation,
  ) => {
    set({
      userPositions: {
        firstSpeaker: firstSpeakerPosition,
        secondSpeaker: secondSpeakerPosition,
        listener: listenerPosition,
      },
      rotations: {
        firstSpeaker: firstSpeakerRotation,
        secondSpeaker: secondSpeakerRotation,
        listener: listenerRotation,
      },
      positionId: uuidv4(),
    });
  },

  autoSetPositions: (positions, rotations) => {
    set({
      savedPositions: positions,
      savedRotations: rotations,
    });
  },

  restorePositions: () => {
    const { savedPositions, savedRotations } = get();

    set({
      positions: { ...savedPositions },
      rotations: { ...savedRotations },
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
