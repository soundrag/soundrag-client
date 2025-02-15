import { useDropzone } from "react-dropzone";
import type { DropzoneOptions } from "react-dropzone";

import useFileStore from "../stores/useFileStore";

import {
	UploadZoneContainer,
	UploadInput,
	UploadInputText,
	UploadSubText,
} from "../style/UploadZoneStyle";
import type { UploadFileProps } from "../types/components";

const UploadZone = ({ hasUploadFile, setHasUploadFile }: UploadFileProps) => {
	const { temporaryFileName, setTemporaryFile } = useFileStore();

	const handleDrop = (acceptedFiles: File[]) => {
		if (acceptedFiles.length > 0) {
			const file = acceptedFiles[0];

			setTemporaryFile(file);
			setHasUploadFile(true);
		}
	};

	const dropzoneOptions: DropzoneOptions = {
		onDrop: handleDrop,
		accept: { "audio/*": [".mp3", ".wav", ".ogg"] },
		maxFiles: 1,
	};

	const { getRootProps, getInputProps, isDragActive } =
		useDropzone(dropzoneOptions);

	return (
		<UploadZoneContainer {...getRootProps()}>
			<UploadInput {...getInputProps()} data-testid="upload-input" />
			{isDragActive ? (
				<UploadInputText className="drop-message">
					Drop It Here!
				</UploadInputText>
			) : (
				<UploadInputText $upload={hasUploadFile}>
					{hasUploadFile ? temporaryFileName : "드래그 영역"}
					<UploadSubText $upload={hasUploadFile}>
						{!hasUploadFile && (
							<p className="file-message">(오디오 파일만 가능)</p>
						)}
						{!hasUploadFile && (
							<p className="click-message">(클릭하여 업로드 가능)</p>
						)}
					</UploadSubText>
				</UploadInputText>
			)}
		</UploadZoneContainer>
	);
};

export default UploadZone;
