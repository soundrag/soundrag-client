import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

import { saveUserPosition } from "../services/userService";

import useAuthStore from "../stores/useAuthStore";
import useDataStore from "../stores/useDataStore";
import useModalStore from "../stores/useModalStore";
import useModelStore from "../stores/useModelStore";

import { isDuplicateData } from "../utils/validators";

import type { UserData } from "../types/common";

const useAutoSavePosition = (delay: number): null => {
  const timeoutRef = useRef(null);

  const { isLoggedIn } = useAuthStore();
  const { userId, userData, setUserData } = useDataStore();
  const { modals } = useModalStore();
  const { positions, rotations } = useModelStore();

  const isDuplicate = isDuplicateData(userData, positions, rotations);
  const openSaveModal = modals.saveModal;

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
      try {
        setUserData([...userData, newUserData]);
        await saveUserPosition(userId, newUserData);

        toast.success("자동 저장되었습니다!");
      } catch (error) {
        console.error("서버에 저장을 실패하였습니다: ", error);
        toast.error("서버에 저장을 실패하였습니다.");
      }
    } else {
      try {
        localStorage.setItem(
          "savedUserData",
          JSON.stringify([...userData, newUserData]),
        );
        setUserData([...userData, newUserData]);

        toast.success("자동 저장되었습니다!");
      } catch (error) {
        console.error("로컬 스토리지에 저장을 실패하였습니다: ", error);
        toast.error("자동 저장을 실패하였습니다.");
      }
    }
  };

  useEffect(() => {
    if (openSaveModal) {
      return;
    }

    if (!isDuplicate) {
      timeoutRef.current = setTimeout(() => {
        saveChanges();
      }, delay);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [positions, rotations, openSaveModal]);

  return null;
};

export default useAutoSavePosition;
