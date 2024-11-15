import { useEffect } from "react";

import useModelStore from "../stores/useModelStore";
import useDataStore from "../stores/useDataStore";

import {
	STANDARD_SPEAKER_SCALE,
	STANDARD_LISTENER_SCALE,
	FIRST_SPEAKER_STARTING_POSITION,
	SECOND_SPEAKER_STARTING_POSITION,
	LISTENER_STARTING_POSITION,
	DEFAULT_ROTATION,
	LISTENER_STARTING_ROTATION,
} from "../constants";

const useLoadedModel = (): null => {
	const { userData, currentIndex } = useDataStore();
	const { loadModel, setModelScale, setModelPositions, setModelRotations } =
		useModelStore();

	const isUserData = userData.length > 0;
	const isCorrectIndex = currentIndex >= 0 && currentIndex < userData.length;

	useEffect(() => {
		loadModel("firstSpeaker", "/models/speaker.gltf");
		setModelScale("firstSpeaker", STANDARD_SPEAKER_SCALE);
		loadModel("secondSpeaker", "/models/speaker.gltf");
		setModelScale("secondSpeaker", STANDARD_SPEAKER_SCALE);
		loadModel("listener", "/models/listener.gltf");
		setModelScale("listener", STANDARD_LISTENER_SCALE);

		if (isUserData && isCorrectIndex) {
			const currentData = userData[currentIndex];

			setModelPositions("firstSpeaker", currentData.firstSpeakerPosition);
			setModelPositions("secondSpeaker", currentData.secondSpeakerPosition);
			setModelPositions("listener", currentData.listenerPosition);
			setModelRotations("firstSpeaker", currentData.firstSpeakerRotation);
			setModelRotations("secondSpeaker", currentData.secondSpeakerRotation);
			setModelRotations("listener", currentData.listenerRotation);
		} else {
			setModelPositions("firstSpeaker", FIRST_SPEAKER_STARTING_POSITION);
			setModelPositions("secondSpeaker", SECOND_SPEAKER_STARTING_POSITION);
			setModelPositions("listener", LISTENER_STARTING_POSITION);
			setModelRotations("firstSpeaker", DEFAULT_ROTATION);
			setModelRotations("secondSpeaker", DEFAULT_ROTATION);
			setModelRotations("listener", LISTENER_STARTING_ROTATION);
		}
	}, [currentIndex, userData]);

	return null;
};

export default useLoadedModel;
