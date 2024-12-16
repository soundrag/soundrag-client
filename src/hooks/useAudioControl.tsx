import { useState, useRef } from "react";

import { AUDIO_STARTING_POINT, HAVE_FUTURE_DATA } from "../constants";

import { hasCurrentRef } from "../utils/validators";

const useAudioControl = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

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

    setIsPlaying(!isPlaying);
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
    setIsPlaying(!isPlaying);
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
    isPlaying,
    setIsPlaying,
    duration,
    currentTime,
  };
};

export default useAudioControl;
