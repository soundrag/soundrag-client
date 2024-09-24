import { useEffect, useRef } from "react";
import { toast } from "react-toastify";

import useModelStore from "../stores/useModelStore";

const useAutoSavedPosition = () => {
  const { positions, autoSetPositions } = useModelStore();

  const positionsRef = useRef(positions);

  useEffect(() => {
    const interval = setInterval(() => {
      if (positions !== positionsRef.current) {
        autoSetPositions(positions);

        positionsRef.current = positions;

        toast.success("Auto Saved!");
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [positions, autoSetPositions]);

  return null;
};

export default useAutoSavedPosition;
