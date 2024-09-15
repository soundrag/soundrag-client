import Button from "./Button";

import useModalStore from "../../stores/useModalStore";

import {
  ModalBackground,
  ModalContainer,
  ModalContent,
  ModalButtonContainer,
} from "../../style/ModalStyle";

const Modal = ({
  modalId,
  content,
  firstButtonText,
  secondButtonText,
  handleFirstButton,
  handleSecondButton,
}) => {
  const { closeModal } = useModalStore();

  return (
    <ModalBackground onClick={() => closeModal(modalId)}>
      <ModalContainer onClick={(event) => event.stopPropagation()}>
        <ModalContent>{content}</ModalContent>
        <ModalButtonContainer hasSecondButton={secondButtonText}>
          {firstButtonText && (
            <Button text={firstButtonText} handleClick={handleFirstButton} />
          )}
          {secondButtonText && (
            <Button text={secondButtonText} handleClick={handleSecondButton} />
          )}
        </ModalButtonContainer>
      </ModalContainer>
    </ModalBackground>
  );
};

export default Modal;
