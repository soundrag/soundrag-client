import { useDropzone } from "react-dropzone";
import type { DropzoneOptions } from "react-dropzone";

import useAudioStore from "../stores/useAudioStore";

const useDropFile = () => {
	const { setTemporaryFile } = useAudioStore();

	const handleDrop = (acceptedFiles: File[]) => {
		if (acceptedFiles.length > 0) {
			const file = acceptedFiles[0];

			setTemporaryFile(file);
		}
	};

	const dropzoneOptions: DropzoneOptions = {
		onDrop: handleDrop,
		accept: { "audio/*": [".mp3", ".wav", ".ogg"] },
		maxFiles: 1,
	};

	const { getRootProps, getInputProps, isDragActive } =
		useDropzone(dropzoneOptions);

	return { getRootProps, getInputProps, isDragActive };
};

export default useDropFile;
