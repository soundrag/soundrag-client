import Button from "./Button";

import useModalStore from "../../stores/useModalStore";

import {
  ModalBackground,
  ModalContainer,
  ModalContent,
  ModalButtonContainer,
} from "../../style/ModalStyle";

import useAudioStore from "../../stores/useAudioStore";

const Modal = ({
  modalId,
  content,
  firstButtonText,
  secondButtonText,
  handleFirstButton,
  handleSecondButton,
}) => {
  const { hasUploaded } = useAudioStore();
  const { closeModal } = useModalStore();

  const hasSecondButton = firstButtonText && secondButtonText;

  return (
    <ModalBackground onClick={() => closeModal(modalId)}>
      <ModalContainer onClick={(event) => event.stopPropagation()}>
        <ModalContent>{content}</ModalContent>
        <ModalButtonContainer $hasSecondButton={hasSecondButton}>
          {firstButtonText && (
            <Button text={firstButtonText} handleClick={handleFirstButton} />
          )}
          {secondButtonText && (
            <Button
              text={secondButtonText}
              handleClick={handleSecondButton}
              isDisabled={modalId === "uploadModal" && !hasUploaded}
            />
          )}
        </ModalButtonContainer>
      </ModalContainer>
    </ModalBackground>
  );
};

export default Modal;
