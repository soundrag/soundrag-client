import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import { STANDARD_SPEAKER_SCALE } from "../constants";

import {
  FIRST_SPEAKER_STARTING_POSITION,
  SECOND_SPEAKER_STARTING_POSITION,
  LISTENER_STARTING_POSITION,
} from "../constants";
import { toast } from "react-toastify";

const useModelStore = create((set, get) => ({
  models: {},

  scales: {},
  rotations: {},

  positions: {},
  userPositions: {},
  previousPositions: {},
  savedPositions: {
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

  setModelPositions: (modelName, position) => {
    set((state) => {
      if (
        JSON.stringify(state.positions[modelName]) === JSON.stringify(position)
      ) {
        return state;
      }
      return {
        positions: { ...state.positions, [modelName]: position },
        positionId: uuidv4(),
        previousPositions: {
          ...state.previousPositions,
          [modelName]: position,
        },
      };
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

  setRotation: (id, rotation) =>
    set((state) => ({ rotations: { ...state.rotations, [id]: rotation } })),

  addSpeaker: () => {
    const currentLength = get().speakers.length;
    if (currentLength > 6) {
      toast.info("Maximum number of speakers reached");
      return;
    }

    const newSpeakerName = `Speaker${currentLength + 1}`;
    set((state) => {
      const lastSpeakerPosition =
        state.speakers.length > 0
          ? state.positions[state.speakers[state.speakers.length - 1]]
          : [0, 0, 0];
      const newPosition = [
        lastSpeakerPosition[0] + 2,
        lastSpeakerPosition[1],
        lastSpeakerPosition[2],
      ];

      return {
        speakers: [...state.speakers, newSpeakerName],
        positions: { ...state.positions, [newSpeakerName]: newPosition },
        scales: { ...state.scales, [newSpeakerName]: STANDARD_SPEAKER_SCALE },
        isDragging: { ...state.isDragging, [newSpeakerName]: false },
      };
    });

    get().loadModel(newSpeakerName, "/models/speaker.gltf");
  },

  removeSpeaker: () => {
    set((state) => {
      if (state.speakers.length <= 2) return state;

      const speakers = state.speakers.slice(0, -1);
      const lastSpeaker = state.speakers[state.speakers.length - 1];

      const newPositions = { ...state.positions };
      delete newPositions[lastSpeaker];

      const newScales = { ...state.scales };
      delete newScales[lastSpeaker];

      const newIsDragging = { ...state.isDragging };
      delete newIsDragging[lastSpeaker];

      return {
        speakers,
        positions: newPositions,
        scales: newScales,
        isDragging: newIsDragging,
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
