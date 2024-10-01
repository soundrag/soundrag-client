import styled from "styled-components";

const SwitchContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const SwitchNumber = styled.div`
  position: absolute;
  top: -20%;
  left: -1%;
  width: 0.8rem;
  height: 0.8rem;
  background-color: ${({ theme }) => theme.color.subColor};
  color: ${({ theme }) => theme.color.modalBackgroundColor};
  border: 0.08rem solid ${({ theme }) => theme.color.modalBackgroundColor};
  border-radius: 50%;
  font-size: ${({ theme }) => theme.fontSize.xSmall};
`;

const SwitchImage = styled.img`
  width: 2rem;
`;

const SwitchButton = styled.button`
  position: relative;
  width: 50%;
  padding: 0.2rem 0.5rem;
  background-color: ${({ theme }) => theme.color.mainColor};
  box-shadow: 0 0 2rem
    ${({ theme, $active }) => $active && theme.color.whiteColor};
  border: none;
  border-radius: 50%;
  font-size: ${({ theme }) => theme.fontSize.small};
  font-weight: ${({ $active }) => ($active ? "bold" : "bold")};
  cursor: pointer;
  transition: color 0.3s;

  &:focus {
    outline: none;
  }

  &:hover {
    box-shadow: 0 0 2rem ${({ theme }) => theme.color.whiteColor};
  }
`;

export { SwitchContainer, SwitchNumber, SwitchImage, SwitchButton };
