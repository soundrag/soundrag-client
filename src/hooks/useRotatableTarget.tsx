import { useRef } from "react";
import { useGesture } from "@use-gesture/react";

import { DEFAULT_ROTATION, LISTENER_STARTING_ROTATION } from "../constants";

import useModelStore from "../stores/useModelStore";

import type { GestureHandlers } from "@use-gesture/react";

import type { ModelControlHookProps, Vector3Values } from "../types/common";

const useRotatableTarget = ({
  modelName,
  isSpeaker,
}: ModelControlHookProps) => {
  const meshRef = useRef(null);

  const { rotations, setModelRotations } = useModelStore();

  const initialRotation = isSpeaker
    ? DEFAULT_ROTATION
    : LISTENER_STARTING_ROTATION;

  const bind = useGesture<GestureHandlers>({
    onClick: () => {
      if (isSpeaker) {
        const currentRotation = rotations[modelName] || initialRotation;
        const newAngleY = (currentRotation[1] + Math.PI / 2) % (2 * Math.PI);
        const newRotation: Vector3Values = [
          currentRotation[0],
          newAngleY,
          currentRotation[2],
        ];

        setModelRotations(modelName, newRotation);
      }
    },
  });

  return {
    meshRef,
    bind,
    rotation: rotations[modelName] || initialRotation,
  };
};

export default useRotatableTarget;
