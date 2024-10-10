import { useEffect, useRef } from "react";
import { toast } from "react-toastify";

import useModelStore from "../stores/useModelStore";

const useAutoSavedPosition = () => {
  const { rotations, positions, autoSetPositions } = useModelStore();

  useEffect(() => {
    const savedPositions = JSON.parse(localStorage.getItem("positions"));
    const savedRotations = JSON.parse(localStorage.getItem("rotations"));

    if (savedPositions && savedRotations) {
      autoSetPositions(savedPositions, savedRotations);
    }
  }, [autoSetPositions]);

  const positionsRef = useRef(positions);
  const rotationsRef = useRef(rotations);

  useEffect(() => {
    const interval = setInterval(() => {
      if (
        positions !== positionsRef.current ||
        rotations !== rotationsRef.current
      ) {
        autoSetPositions(positions, rotations);

        localStorage.setItem("positions", JSON.stringify(positions));
        localStorage.setItem("rotations", JSON.stringify(rotations));

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
