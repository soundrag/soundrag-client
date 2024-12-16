import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

import { saveUserPosition } from "../services/userService";

import useAuthStore from "../stores/useAuthStore";
import useModelStore from "../stores/useModelStore";
import useDataStore from "../stores/useDataStore";

import { isDuplicateData } from "../utils/validators";

import type { UserData } from "../types/common";

const useAutoSavedPosition = (): null => {
  const { isLoggedIn } = useAuthStore();
  const { userId, userData, setUserData } = useDataStore();
  const { positions, rotations } = useModelStore();

  const timeoutRef = useRef(null);
  const isDuplicate = isDuplicateData(userData, positions, rotations);

  const saveChanges = async () => {
    const positionId = uuidv4();
    const newUserData: UserData = {
      userId,
      positionId,
      firstSpeakerPosition: positions.firstSpeaker,
      secondSpeakerPosition: positions.secondSpeaker,
      listenerPosition: positions.listener,
      firstSpeakerRotation: rotations.firstSpeaker,
      secondSpeakerRotation: rotations.secondSpeaker,
      listenerRotation: rotations.listener,
    };

    if (isLoggedIn) {
      await saveUserPosition(userId, newUserData);
      setUserData([...userData, newUserData]);
      toast.success("자동 저장되었습니다!");
    } else {
      localStorage.setItem(
        "savedUserData",
        JSON.stringify([...userData, newUserData]),
      );
      setUserData([...userData, newUserData]);
      toast.success("자동 저장되었습니다!");
    }
  };

  useEffect(() => {
    if (!isDuplicate) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        saveChanges();
      }, 5000);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [positions, rotations]);

  return null;
};

export default useAutoSavedPosition;
