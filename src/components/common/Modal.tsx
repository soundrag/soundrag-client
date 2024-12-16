import Button from "./Button";

import useModalStore from "../../stores/useModalStore";

import {
  ModalBackground,
  ModalContainer,
  ModalTitle,
  ModalContent,
  ModalButtonContainer,
} from "../../style/ModalStyle";

import type { ModalProps } from "../../types/components";

const Modal = ({
  modalName,
  modalTitle,
  content,
  firstButtonText,
  secondButtonText,
  handleFirstButton,
  handleSecondButton,
  isEnabled,
  $modalTestId,
  $firstButtonTestId,
  $secondButtonTestId,
}: ModalProps) => {
  const { closeModal } = useModalStore();
  const hasSecondButton = firstButtonText && secondButtonText;

  return (
    <ModalBackground onClick={() => closeModal(modalName)}>
      <ModalContainer
        onClick={(event: React.MouseEvent<HTMLDivElement>) =>
          event.stopPropagation()
        }
        data-testid={$modalTestId}
      >
        <ModalTitle>{modalTitle}</ModalTitle>
        <ModalContent>{content}</ModalContent>
        <ModalButtonContainer $hasSecondButton={hasSecondButton}>
          {firstButtonText && (
            <Button
              text={firstButtonText}
              handleClick={handleFirstButton}
              $testId={$firstButtonTestId}
            />
          )}
          {secondButtonText && (
            <Button
              text={secondButtonText}
              handleClick={handleSecondButton}
              isDisabled={!isEnabled}
              $testId={$secondButtonTestId}
            />
          )}
        </ModalButtonContainer>
      </ModalContainer>
    </ModalBackground>
  );
};

export default Modal;
