import { useState, useRef } from "react";

import { AUDIO_STARTING_POINT, HAVE_FUTURE_DATA } from "../constants";

const useAudioControl = () => {
	const [isPlaying, setIsPlaying] = useState(false);
	const [duration, setDuration] = useState(0);
	const [currentTime, setCurrentTime] = useState(0);

	const audioRef = useRef<HTMLAudioElement | null>(null);

	const handlePlayPause = () => {
		const audio = audioRef.current;
		if (!audio) return;
		const isReadyToPlay = audio.readyState >= HAVE_FUTURE_DATA;

		if (isPlaying) {
			audio.pause();
		} else {
			if (isReadyToPlay) {
				audio.play();
			}
		}

		setIsPlaying(!isPlaying);
	};

	const handleLoadedMetadata = () => {
		if (audioRef.current) {
			setDuration(audioRef.current.duration);
		}
	};

	const handleTimeUpdate = () => {
		if (audioRef.current) {
			setCurrentTime(audioRef.current.currentTime);
		}
	};

	const handleTimeEnd = () => {
		setIsPlaying(!isPlaying);
		if (audioRef.current) {
			audioRef.current.currentTime = AUDIO_STARTING_POINT;

			setCurrentTime(AUDIO_STARTING_POINT);
		}
	};

	const handleSeekChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newTime = (Number(event.target.value) / 100) * duration;

		if (audioRef.current) {
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
		isPlaying,
		setIsPlaying,
		duration,
		currentTime,
	};
};

export default useAudioControl;
