import { useRef, useEffect, RefObject } from "react";
import { Vector3, Euler, PointLight } from "three";

import { ModelInformationProps } from "../types/common";

const useSpeakerLight = ({
  position,
  rotation,
}: ModelInformationProps): RefObject<PointLight> => {
  const lightRef = useRef(null);

  useEffect(() => {
    if (lightRef.current) {
      const frontDirection = new Vector3(5, 4, 1).applyEuler(
        new Euler(...rotation),
      );
      const lightPosition = new Vector3(...position).add(
        frontDirection.multiplyScalar(0.5),
      );
      lightRef.current.position.copy(lightPosition);
    }
  }, [position, rotation]);

  return lightRef;
};

export default useSpeakerLight;
