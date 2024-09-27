import { toast } from "react-toastify";

import Icon from "./common/Icon";
import Modal from "./common/Modal";
import UploadZone from "./UploadZone";

import PlayButtonImage from "../assets/images/play-button.png";
import PauseButtonImage from "../assets/images/pause-button.png";
import UploadButtonImage from "../assets/images/upload-button.png";
import ResetButtonImage from "../assets/images/reset-button.png";

import useAudioControl from "../hooks/useAudioControl";
import useSpatialAudio from "../hooks/useSpatialAudio";

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
    handleTimeEnd,
    handleSeekChange,
  } = useAudioControl();
  const { startAudioContext } = useSpatialAudio(audioRef);

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

  const handleOpenUploadModal = () => {
    openModal("uploadModal");
  };

  const handleCloseUploadModal = () => {
    resetTemporaryFile();
    closeModal("uploadModal");
  };

  const handleUploadButton = () => {
    setUploadedFile();
    closeModal("uploadModal");
    toast.success("Complete! (Upload)");
  };

  const handlePlayButton = async () => {
    await startAudioContext();
    handlePlayPause();
  };

  return (
    <PlayerContainer>
      <audio
        ref={audioRef}
        src={fileUrl}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleTimeEnd}
      />
      <ResetButton onClick={resetUploadedFile}>
        <Icon imageSrc={ResetButtonImage} />
      </ResetButton>
      <UploadButton onClick={handleOpenUploadModal}>
        <Icon imageSrc={UploadButtonImage} />
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
      <ControlButton onClick={handlePlayButton}>
        <Icon imageSrc={isPlaying ? PauseButtonImage : PlayButtonImage} />
      </ControlButton>
      <FileName>{fileName}</FileName>
      {modals.uploadModal && (
        <Modal
          modalId="uploadModal"
          content={<UploadZone />}
          firstButtonText="Cancel"
          secondButtonText="Upload"
          handleFirstButton={handleCloseUploadModal}
          handleSecondButton={handleUploadButton}
        />
      )}
    </PlayerContainer>
  );
};

export default AudioPlayer;
