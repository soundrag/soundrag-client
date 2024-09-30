import { useRef, useEffect } from "react";
import { Vector3, ArrowHelper } from "three";

const useTargetArrow = (
  position,
  isDragging,
  isListener,
  isOnFloor,
  isOnCeiling,
  MODEL_HEIGHT,
) => {
  const arrowRefs = useRef([]);

  useEffect(() => {
    if (isDragging) {
      const baseDirections = [
        new Vector3(1, 0, 0),
        new Vector3(-1, 0, 0),
        new Vector3(0, 0, 1),
        new Vector3(0, 0, -1),
      ];

      const arrowOffsetY = !isListener
        ? isOnFloor
          ? MODEL_HEIGHT
          : isOnCeiling
            ? MODEL_HEIGHT * 2
            : 0
        : MODEL_HEIGHT / 2;

      const directions = isListener
        ? baseDirections
        : [
            ...baseDirections,
            new Vector3(0, isOnFloor ? 1 : isOnCeiling ? -1 : 0, 0),
          ];

      const arrowHelpers = directions.map((dir) => {
        const arrowOriginY =
          position[1] +
          arrowOffsetY -
          (!isListener && isOnCeiling && dir.y < 0 ? MODEL_HEIGHT : 0);

        const arrowOrigin = new Vector3(position[0], arrowOriginY, position[2]);
        const arrowColor = isListener ? 0x0000ff : 0xff0000;

        return new ArrowHelper(dir, arrowOrigin, 2, arrowColor);
      });

      arrowRefs.current = arrowHelpers;
    } else {
      arrowRefs.current = [];
    }
  }, [isDragging, isListener, isOnFloor, isOnCeiling, position, MODEL_HEIGHT]);

  return arrowRefs.current;
};

export default useTargetArrow;
