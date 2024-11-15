import { useRef } from "react";

import { AUDIO_STARTING_POINT, HAVE_FUTURE_DATA } from "../constants";

import useAudioStore from "../stores/useAudioStore";

import { hasCurrentRef } from "../utils/validators";

const useAudioControl = () => {
	const audioRef = useRef<HTMLAudioElement | null>(null);

	const { isPlaying, togglePlayPause, duration, setDuration, setCurrentTime } =
		useAudioStore();

	const handlePlayPause = () => {
		const audio = audioRef.current;
		const isReadyToPlay = audio.readyState >= HAVE_FUTURE_DATA;

		if (!audio) return;

		if (isPlaying) {
			audio.pause();
		} else {
			if (isReadyToPlay) {
				audio.play();
			}
		}

		togglePlayPause();
	};

	const handleLoadedMetadata = () => {
		if (hasCurrentRef(audioRef)) {
			setDuration(audioRef.current.duration);
		}
	};

	const handleTimeUpdate = () => {
		if (hasCurrentRef(audioRef)) {
			setCurrentTime(audioRef.current.currentTime);
		}
	};

	const handleTimeEnd = () => {
		togglePlayPause();
		if (hasCurrentRef(audioRef)) {
			audioRef.current.currentTime = AUDIO_STARTING_POINT;

			setCurrentTime(AUDIO_STARTING_POINT);
		}
	};

	const handleSeekChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newTime = (Number(event.target.value) / 100) * duration;

		if (hasCurrentRef(audioRef)) {
			audioRef.current.currentTime = newTime;

			setCurrentTime(newTime);
		}
	};

	return {
		audioRef,
		handlePlayPause,
		handleLoadedMetadata,
		handleTimeUpdate,
		handleTimeEnd,
		handleSeekChange,
	};
};

export default useAudioControl;
