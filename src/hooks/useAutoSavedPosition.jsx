import { useEffect, useRef } from "react";

import { toast } from "react-toastify";

import useNetworkStatus from "./useNetworkStatus";

import { saveUserPosition } from "../services/userService";

import useAuthStore from "../stores/useAuthStore";
import useModelStore from "../stores/useModelStore";
import useDataStore from "../stores/useDataStore";

import { deepEqual } from "../utils/validators";

const useAutoSavedPosition = () => {
  const { isLoggedIn } = useAuthStore();
  const { userId, userData, setUserData } = useDataStore();
  const { rotations, positions, positionId } = useModelStore();

  const isOnline = useNetworkStatus();

  const positionsRef = useRef(positions);
  const rotationsRef = useRef(rotations);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (
        deepEqual(positionsRef.current, positions) &&
        deepEqual(rotationsRef.current, rotations)
      ) {
        return;
      }

      const newUserData = {
        userId,
        positionId,
        firstSpeakerPosition: positions.firstSpeaker,
        secondSpeakerPosition: positions.secondSpeaker,
        listenerPosition: positions.listener,
        firstSpeakerRotation: rotations.firstSpeaker,
        secondSpeakerRotation: rotations.secondSpeaker,
        listenerRotation: rotations.listener,
      };

      if (isOnline && isLoggedIn) {
        const isDuplicate = userData.some((data) => {
          const serverPositions = {
            firstSpeaker: data.firstSpeakerPosition,
            secondSpeaker: data.secondSpeakerPosition,
            listener: data.listenerPosition,
          };

          const serverRotations = {
            firstSpeaker: data.firstSpeakerRotation,
            secondSpeaker: data.secondSpeakerRotation,
            listener: data.listenerRotation,
          };

          return (
            deepEqual(serverPositions, positions) &&
            deepEqual(serverRotations, rotations)
          );
        });

        if (!isDuplicate) {
          await saveUserPosition(userId, newUserData);

          toast.success("자동 저장되었습니다!");

          setUserData([...userData, newUserData]);
        }
      } else {
        localStorage.setItem("savedUserData", JSON.stringify(newUserData));

        setUserData([...userData, newUserData]);

        toast.success("자동 저장되었습니다!");
      }

      positionsRef.current = positions;
      rotationsRef.current = rotations;
    }, 5000);

    return () => clearInterval(interval);
  }, [
    rotations,
    positions,
    isOnline,
    isLoggedIn,
    userId,
    positionId,
    userData,
    setUserData,
  ]);

  return null;
};

export default useAutoSavedPosition;
