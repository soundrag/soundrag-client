import { useRef } from "react";

import { HAVE_FUTURE_DATA } from "../constants";

import useAudioStore from "../stores/useAudioStore";

const useAudioControl = () => {
  const audioRef = useRef(null);

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
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleSeekChange = (e) => {
    const newTime = (e.target.value / 100) * duration;

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
    handleSeekChange,
  };
};

export default useAudioControl;
