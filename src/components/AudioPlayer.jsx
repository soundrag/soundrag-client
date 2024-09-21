import Modal from "./common/Modal";
import UploadZone from "./UploadZone";

import useAudioControl from "../hooks/useAudioControl";

import useAudioStore from "../stores/useAudioStore";
import useModalStore from "../stores/useModalStore";

import {
  PlayerContainer,
  RangeSlider,
  TimeTable,
  FileName,
  ResetButton,
  UploadButton,
  ControlButton,
} from "../style/AudioPlayerStyle";

import { formatDuration, formatSilderValue } from "../utils/formatters";

const AudioPlayer = () => {
  const {
    audioRef,
    handlePlayPause,
    handleLoadedMetadata,
    handleTimeUpdate,
    handleSeekChange,
  } = useAudioControl();

  const {
    isPlaying,
    duration,
    currentTime,
    fileName,
    fileUrl,
    resetTemporaryFile,
    resetUploadedFile,
    setUploadedFile,
  } = useAudioStore();
  const { modals, openModal, closeModal } = useModalStore();

  const handleCloseButton = () => {
    resetTemporaryFile();
    closeModal("uploadModal");
  };

  const handleUploadButton = () => {
    setUploadedFile();
    closeModal("uploadModal");
  };

  return (
    <PlayerContainer>
      <audio
        ref={audioRef}
        src={fileUrl}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
      />
      <ResetButton onClick={resetUploadedFile}>Reset</ResetButton>
      <UploadButton onClick={() => openModal("uploadModal")}>
        Upload
      </UploadButton>
      <RangeSlider
        type="range"
        value={formatSilderValue(currentTime, duration)}
        max="100"
        onChange={handleSeekChange}
      />
      <TimeTable>
        <span>{formatDuration(currentTime, duration)}</span>
      </TimeTable>
      <ControlButton onClick={handlePlayPause}>
        {isPlaying ? "Pause" : "Play"}
      </ControlButton>
      <FileName>{fileName}</FileName>
      {modals.uploadModal && (
        <Modal
          modalId="uploadModal"
          content={<UploadZone />}
          firstButtonText="Cancel"
          secondButtonText="Upload"
          handleFirstButton={handleCloseButton}
          handleSecondButton={handleUploadButton}
        />
      )}
    </PlayerContainer>
  );
};

export default AudioPlayer;
