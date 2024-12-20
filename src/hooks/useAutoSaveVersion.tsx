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
import useVersionStore from "../stores/useVersionStore";

const useAutoSaveVersion = (delay: number): null => {
  const timeoutRef = useRef(null);

  const { isLoggedIn, isAuthChecked } = useAuthStore();
  const { userId } = useDataStore();
  const { userVersion, setUserVersion } = useVersionStore();
  const { modals } = useModalStore();
  const { positions, rotations } = useModelStore();

  const isDuplicate = isDuplicateData(userVersion, positions, rotations);
  const openSaveModal = modals.saveModal;

  const saveChanges = async () => {
    const positionId = uuidv4();
    const newVersion: UserData = {
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
        setUserVersion([...userVersion, newVersion]);
        await saveUserPosition(userId, newVersion);

        toast.success("자동 저장되었습니다!");
      } catch (autoSaveError) {
        console.error("서버에 자동 저장을 실패하였습니다: ", autoSaveError);
        toast.error("저장을 실패하였습니다.");
      }
    } else {
      try {
        localStorage.setItem(
          "localData",
          JSON.stringify([...userVersion, newVersion]),
        );
        setUserVersion([...userVersion, newVersion]);

        toast.success("자동 저장되었습니다!");
      } catch (autoSaveError) {
        console.error(
          "로컬 스토리지에 자동 저장을 실패하였습니다: ",
          autoSaveError,
        );
        toast.error("자동 저장을 실패하였습니다.");
      }
    }
  };

  useEffect(() => {
    if (!isAuthChecked || openSaveModal) {
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

export default useAutoSaveVersion;
