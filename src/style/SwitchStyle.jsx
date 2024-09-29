import styled from "styled-components";

const SwitchContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const SwitchButton = styled.button`
  width: 50%;
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

export { SwitchContainer, SwitchButton };
