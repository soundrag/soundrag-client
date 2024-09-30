import { useRef, useState } from "react";
import { useGesture } from "@use-gesture/react";

import { ROTATE_Y_MINUS_90_DEGREES } from "../constants";

const useRotatableTarget = (
  initialRotation = [0, 0, 0],
  isListener = false,
  isOnCeiling = false,
) => {
  const initialRot = isListener
    ? [0, ROTATE_Y_MINUS_90_DEGREES[1], 0]
    : initialRotation;
  const [rotation, setRotation] = useState(initialRot);
  const [isTilted, setIsTilted] = useState(false);
  const meshRef = useRef(null);

  const bind = useGesture({
    onClick: () => {
      if (isOnCeiling) {
        setRotation((prev) => {
          if (!isTilted) {
            setIsTilted(true);

            return [prev[0], prev[1], -45];
          } else {
            setIsTilted(false);

            return [prev[0], prev[1], 0];
          }
        });
      } else {
        setRotation((prev) => {
          const newAngleY = (prev[1] + 90) % 360;

          return [prev[0], newAngleY, prev[2]];
        });
      }
    },
  });

  return { meshRef, rotation, bind };
};

export default useRotatableTarget;
