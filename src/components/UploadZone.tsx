import useDropFile from "../hooks/useDropFile";

import useAudioStore from "../stores/useAudioStore";

import {
	UploadZoneContainer,
	UploadInput,
	UploadInputText,
	UploadSubText,
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
					{hasUploaded ? temporaryFileName : "드래그 영역"}
					<UploadSubText $upload={hasUploaded}>
						{!hasUploaded && (
							<p className="file-message">(오디오 파일만 가능)</p>
						)}
						{!hasUploaded && (
							<p className="click-message">(클릭하여 업로드 가능)</p>
						)}
					</UploadSubText>
				</UploadInputText>
			)}
		</UploadZoneContainer>
	);
};

export default UploadZone;
