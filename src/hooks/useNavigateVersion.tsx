import { useEffect } from "react";

import useModelStore from "../stores/useModelStore";
import useVersionStore from "../stores/useVersionStore";

const useNavigateVersion = (): null => {
  const { userVersion, versionIndex } = useVersionStore();
  const { setModelPositions, setModelRotations } = useModelStore();

  const hasUserVersion = userVersion.length > 0;
  const isCorrectIndex = versionIndex >= 0 && versionIndex < userVersion.length;

  useEffect(() => {
    if (hasUserVersion && isCorrectIndex) {
      const currentVersion = userVersion[versionIndex];

      setModelPositions("firstSpeaker", currentVersion.firstSpeakerPosition);
      setModelPositions("secondSpeaker", currentVersion.secondSpeakerPosition);
      setModelPositions("listener", currentVersion.listenerPosition);
      setModelRotations("firstSpeaker", currentVersion.firstSpeakerRotation);
      setModelRotations("secondSpeaker", currentVersion.secondSpeakerRotation);
      setModelRotations("listener", currentVersion.listenerRotation);
    }
  }, [versionIndex, userVersion]);

  return null;
};

export default useNavigateVersion;
