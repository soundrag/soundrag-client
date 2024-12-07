import { useEffect } from "react";
import useDataStore from "../stores/useDataStore";
import useModelStore from "../stores/useModelStore";

const useNavigateData = (): null => {
  const { userData, currentIndex } = useDataStore();
  const { setModelPositions, setModelRotations } = useModelStore();

  const isUserData = userData.length > 0;
  const isCorrectIndex = currentIndex >= 0 && currentIndex < userData.length;

  useEffect(() => {
    if (isUserData && isCorrectIndex) {
      const currentData = userData[currentIndex];

      setModelPositions("firstSpeaker", currentData.firstSpeakerPosition);
      setModelPositions("secondSpeaker", currentData.secondSpeakerPosition);
      setModelPositions("listener", currentData.listenerPosition);
      setModelRotations("firstSpeaker", currentData.firstSpeakerRotation);
      setModelRotations("secondSpeaker", currentData.secondSpeakerRotation);
      setModelRotations("listener", currentData.listenerRotation);
    }
  }, [currentIndex, userData]);

  return null;
};

export default useNavigateData;
