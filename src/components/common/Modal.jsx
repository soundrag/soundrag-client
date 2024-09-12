import Button from "./Button";

import useModalStore from "../../stores/useModalStore";

import {
  ModalBackground,
  ModalContainer,
  ModalContent,
  ModalButtonContainer,
} from "../../style/ModalStyle";

const Modal = ({ content, firstButtonText, secondButtonText }) => {
  const closeModal = useModalStore((state) => state.closeModal);

  return (
    <ModalBackground onClick={closeModal}>
      <ModalContainer onClick={(event) => event.stopPropagation()}>
        <ModalContent>{content}</ModalContent>
        <ModalButtonContainer>
          {firstButtonText && <Button text={firstButtonText} />}
          {secondButtonText && <Button text={secondButtonText} />}
        </ModalButtonContainer>
      </ModalContainer>
    </ModalBackground>
  );
};

export default Modal;
