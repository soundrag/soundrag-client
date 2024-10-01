import { useRef } from "react";
import { useGesture } from "@use-gesture/react";

import { DEFAULT_ROTATION, LISTENER_STARTING_ROTATION } from "../constants";

import useModelStore from "../stores/useModelStore";

const useRotatableTarget = (modelName, isListener = false, isSpeaker) => {
  const meshRef = useRef(null);

  const { rotations, setModelRotation } = useModelStore();

  const initialRotation = isListener
    ? LISTENER_STARTING_ROTATION
    : DEFAULT_ROTATION;

  const bind = useGesture({
    onClick: () => {
      if (isSpeaker) {
        const currentRotation = rotations[modelName] || initialRotation;
        const newAngleY = (currentRotation[1] + Math.PI / 2) % (2 * Math.PI);
        const newRotation = [currentRotation[0], newAngleY, currentRotation[2]];

        setModelRotation(modelName, newRotation);
      }
    },
  });

  return {
    meshRef,
    rotation: rotations[modelName] || initialRotation,
    bind,
  };
};

export default useRotatableTarget;
