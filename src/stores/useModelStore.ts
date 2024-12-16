import { create } from "zustand";
import { produce } from "immer";
import {
  STANDARD_SPEAKER_SCALE,
  STANDARD_LISTENER_SCALE,
  FIRST_SPEAKER_STARTING_POSITION,
  SECOND_SPEAKER_STARTING_POSITION,
  LISTENER_STARTING_POSITION,
  DEFAULT_ROTATION,
  LISTENER_STARTING_ROTATION,
} from "../constants";

import type { ModelState } from "../types/store";

const useModelStore = create<ModelState>((set) => ({
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

  setModelName: (modelName, scene) => {
    set(
      produce((state) => {
        state.models[modelName] = scene;
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
      }),
    );
  },
}));

export default useModelStore;
