import { useEffect } from "react";

import useModelStore from "../stores/useModelStore";

import { isValidatePosition } from "../utils/validators";

import {
  STANDARD_SPEAKER_SCALE,
  STANDARD_LISTENER_SCALE,
  FIRST_SPEAKER_STARTING_POSITION,
  SECOND_SPEAKER_STARTING_POSITION,
  LISTENER_STARTING_POSITION,
} from "../constants";

const useLoadedModel = () => {
  const { loadModel, setModelScale, setModelPositions, userPositions } =
    useModelStore();

  useEffect(() => {
    loadModel("firstSpeaker", "/models/speaker.gltf");
    setModelScale("firstSpeaker", STANDARD_SPEAKER_SCALE);

    loadModel("secondSpeaker", "/models/speaker.gltf");
    setModelScale("secondSpeaker", STANDARD_SPEAKER_SCALE);

    loadModel("listener", "/models/listener.gltf");
    setModelScale("listener", STANDARD_LISTENER_SCALE);

    if (isValidatePosition(userPositions.firstSpeaker)) {
      setModelPositions("firstSpeaker", userPositions.firstSpeaker);
    } else {
      setModelPositions("firstSpeaker", FIRST_SPEAKER_STARTING_POSITION);
    }

    if (isValidatePosition(userPositions.secondSpeaker)) {
      setModelPositions("secondSpeaker", userPositions.secondSpeaker);
    } else {
      setModelPositions("secondSpeaker", SECOND_SPEAKER_STARTING_POSITION);
    }

    if (isValidatePosition(userPositions.listener)) {
      setModelPositions("listener", userPositions.listener);
    } else {
      setModelPositions("listener", LISTENER_STARTING_POSITION);
    }
  }, [loadModel, setModelScale, setModelPositions, userPositions]);
};

export default useLoadedModel;
