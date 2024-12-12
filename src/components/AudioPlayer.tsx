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

import { formatDuration, formatFileName } from "../utils/formatters";
import { calculateSliderValue } from "../utils/calculators";

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
    <PlayerContainer data-testid="audio-player">
      <audio
        ref={audioRef}
        src={fileUrl}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleTimeEnd}
        data-testid="audio"
      />
      <ResetButton onClick={resetUploadedFile} data-testid="reset-button">
        <Icon imageSrc={ResetButtonImage} imageAlt="Reset Button" />
      </ResetButton>
      <UploadButton onClick={handleOpenUploadModal} data-testid="upload-button">
        <Icon imageSrc={UploadButtonImage} imageAlt="Upload Button" />
      </UploadButton>
      <RangeSlider
        type="range"
        value={calculateSliderValue(currentTime, duration)}
        max="100"
        onChange={handleSeekChange}
        data-testid="range-slider"
      />
      <TimeTable>
        <span>{formatDuration(currentTime, duration)}</span>
      </TimeTable>
      <ControlButton onClick={handlePlayButton} data-testid="control-button">
        <Icon
          imageSrc={isPlaying ? PauseButtonImage : PlayButtonImage}
          imageAlt={isPlaying ? "Pause Button" : "Play Button"}
          $control={true}
        />
      </ControlButton>
      <FileName onClick={toggleFileName} data-testid="file-name-text">
        {formatFileName(fileName, showFullFileName)}
      </FileName>
      {modals.uploadModal && (
        <Modal
          modalId="uploadModal"
          modalTitle="업로드"
          content={<UploadZone />}
          firstButtonText="취소"
          secondButtonText="업로드"
          handleFirstButton={handleCloseUploadModal}
          handleSecondButton={handleUploadButton}
          $modalTestId="audio-modal"
          $firstButtonTestId="cancel-button"
          $secondButtonTestId="confirm-button"
        />
      )}
    </PlayerContainer>
  );
};

export default AudioPlayer;
