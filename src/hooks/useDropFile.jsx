import { useDropzone } from "react-dropzone";

import useAudioStore from "../stores/useAudioStore";

const useDropFile = () => {
  const { setTemporaryFile } = useAudioStore();

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

  return { getRootProps, getInputProps, isDragActive };
};

export default useDropFile;
