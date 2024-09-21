import { useDropzone } from "react-dropzone";

import useAudioStore from "../stores/useAudioStore";

import {
  UploadZoneContainer,
  UploadInput,
  UploadInputText,
} from "../style/UploadZoneStyle";

const UploadZone = () => {
  const { hasUploaded, temporaryFileName, setTemporaryFile } = useAudioStore();

  const handleDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];

      setTemporaryFile(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: { "audio/*": [".mp3", ".wav", ".ogg"] },
    maxFiles: 1,
  });

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
