import Button from "./Button";

import useModalStore from "../../stores/useModalStore";

import {
	ModalBackground,
	ModalContainer,
	ModalTitle,
	ModalContent,
	ModalButtonContainer,
} from "../../style/ModalStyle";

import useAudioStore from "../../stores/useAudioStore";
import useInputStore from "../../stores/useInputStore";

import type { ModalProps } from "../../types/components";

const Modal = ({
	modalId,
	modalTitle,
	content,
	firstButtonText,
	secondButtonText,
	handleFirstButton,
	handleSecondButton,
}: ModalProps) => {
	const { hasUploaded } = useAudioStore();
	const { closeModal } = useModalStore();
	const { isNameValid } = useInputStore();

	const hasSecondButton = firstButtonText && secondButtonText;

	return (
		<ModalBackground onClick={() => closeModal(modalId)}>
			<ModalContainer
				onClick={(event: React.MouseEvent<HTMLDivElement>) =>
					event.stopPropagation()
				}
			>
				<ModalTitle>{modalTitle}</ModalTitle>
				<ModalContent>{content}</ModalContent>
				<ModalButtonContainer $hasSecondButton={hasSecondButton}>
					{firstButtonText && (
						<Button text={firstButtonText} handleClick={handleFirstButton} />
					)}
					{secondButtonText && (
						<Button
							text={secondButtonText}
							handleClick={handleSecondButton}
							isDisabled={
								(modalId === "uploadModal" && !hasUploaded) ||
								(modalId === "saveModal" && !isNameValid)
							}
						/>
					)}
				</ModalButtonContainer>
			</ModalContainer>
		</ModalBackground>
	);
};

export default Modal;