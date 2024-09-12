import { useRef } from "react";

import sampleFile from "../assets/sample.mp3";

import useAudioStore from "../stores/useAudioStore";

import {
  PlayerContainer,
  FileName,
  RangeSlider,
  TimeTable,
  ControlButton,
  UploadButton,
} from "../style/AudioPlayerStyle";

import { formatTime } from "../utils/formatter";

const AudioPlayer = () => {
  const {
    isPlaying,
    currentTime,
    duration,
    fileName,
    togglePlayPause,
    setCurrentTime,
    setDuration,
    setFileName,
  } = useAudioStore();

  const audioRef = useRef(null);

  const handlePlayPause = () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      if (audio.readyState >= 3) {
        audio.play();
      }
    }

    togglePlayPause();
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      setFileName(fileName);
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

  return (
    <PlayerContainer>
      <audio
        ref={audioRef}
        src={sampleFile}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
      />
      <UploadButton>Upload</UploadButton>
      <RangeSlider
        type="range"
        value={(currentTime / duration) * 100 || 0}
        max="100"
        onChange={handleSeekChange}
      />
      <TimeTable>
        <span>{formatTime(currentTime)}</span> /{" "}
        <span className="duration-time">{formatTime(duration)}</span>
      </TimeTable>
      <ControlButton onClick={handlePlayPause}>
        {isPlaying ? "Pause" : "Play"}
      </ControlButton>
      <FileName>{fileName}</FileName>
    </PlayerContainer>
  );
};

export default AudioPlayer;
