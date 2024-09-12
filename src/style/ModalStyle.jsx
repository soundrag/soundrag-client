import styled from "styled-components";

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 5rem;
  width: 14%;
  padding: 3rem 3rem;
  border-radius: 5%;
  background-color: ${({ theme }) => theme.color.modalBackgroundColor};
  box-shadow: 0 0 1rem ${({ theme }) => theme.color.modalBackgroundColor};
`;

const ModalContent = styled.div`
  font-size: ${({ theme }) => theme.fontSize.large};
`;

const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export { ModalBackground, ModalContainer, ModalContent, ModalButtonContainer };
