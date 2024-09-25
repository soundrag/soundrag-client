import useDropFile from "../hooks/useDropFile";

import useAudioStore from "../stores/useAudioStore";

import {
  UploadZoneContainer,
  UploadInput,
  UploadInputText,
} from "../style/UploadZoneStyle";

const UploadZone = () => {
  const { getRootProps, getInputProps, isDragActive } = useDropFile();

  const { hasUploaded, temporaryFileName } = useAudioStore();

  return (
    <UploadZoneContainer {...getRootProps()}>
      <UploadInput {...getInputProps()} />
      {isDragActive ? (
        <UploadInputText className="drop-message">
          Drop It Here!
        </UploadInputText>
      ) : (
        <UploadInputText $upload={hasUploaded}>
          {hasUploaded ? temporaryFileName : "Drag Zone"}
          <br />
          <p className="file-message">(audio files only)</p>
        </UploadInputText>
      )}
    </UploadZoneContainer>
  );
};

export default UploadZone;
