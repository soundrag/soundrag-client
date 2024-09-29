import styled from "styled-components";

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
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
  gap: 2rem;
  padding: 2rem;
  border-radius: 5%;
  background-color: ${({ theme }) => theme.color.modalBackgroundColor};
  box-shadow: 0 0 1rem ${({ theme }) => theme.color.modalBackgroundColor};
  cursor: auto;
`;

const ModalTitle = styled.div`
  color: ${({ theme }) => theme.color.mainColor};
  font-size: ${({ theme }) => theme.fontSize.xxLarge};
  font-weight: bold;
`;

const ModalContent = styled.div`
  color: ${({ theme }) => theme.color.mainColor};
  font-size: ${({ theme }) => theme.fontSize.xxLarge};
  text-align: center;

  .delete-rule {
    font-size: ${({ theme }) => theme.fontSize.small};

    span {
      color: ${({ theme }) => theme.color.redColor};
      font-weight: bold;
    }
  }
`;

const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: ${({ $hasSecondButton }) =>
    $hasSecondButton ? "space-between" : "center"};
  width: 100%;
`;

export {
  ModalBackground,
  ModalContainer,
  ModalTitle,
  ModalContent,
  ModalButtonContainer,
};
