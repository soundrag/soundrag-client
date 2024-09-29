import { toast } from "react-toastify";

import Icon from "./common/Icon";
import Modal from "./common/Modal";
import UploadZone from "./UploadZone";

import PlayButtonImage from "../assets/images/play-button.svg";
import PauseButtonImage from "../assets/images/pause-button.svg";
import UploadButtonImage from "../assets/images/upload-button.svg";
import ResetButtonImage from "../assets/images/reset-button.svg";

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

import {
  formatDuration,
  formatFileName,
  formatSilderValue,
} from "../utils/formatters";

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
    showFullFileName,
    setShowFullFileName,
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

  const toggleFileName = () => {
    setShowFullFileName(!showFullFileName);
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
        <Icon
          imageSrc={isPlaying ? PauseButtonImage : PlayButtonImage}
          $control={true}
        />
      </ControlButton>
      <FileName onClick={toggleFileName}>
        {formatFileName(fileName, showFullFileName)}
      </FileName>
      {modals.uploadModal && (
        <Modal
          modalId="uploadModal"
          modalTitle="Upload"
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
