import { useEffect, useRef } from "react";
import { toast } from "react-toastify";

import useModelStore from "../stores/useModelStore";

const useAutoSavedPosition = () => {
  const { rotations, positions, autoSetPositions } = useModelStore();

  const positionsRef = useRef(positions);
  const rotationsRef = useRef(rotations);

  useEffect(() => {
    const interval = setInterval(() => {
      if (
        positions !== positionsRef.current &&
        rotations !== rotationsRef.current
      ) {
        autoSetPositions(positions, rotations);

        positionsRef.current = positions;
        rotationsRef.current = rotations;

        toast.success("Auto Saved!");
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [rotations, positions, autoSetPositions]);

  return null;
};

export default useAutoSavedPosition;
