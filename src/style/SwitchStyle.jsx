import styled from "styled-components";

const SwitchContainer = styled.div`
  display: flex;
  gap: 2rem;
`;

const SwitchButton = styled.button`
  padding: 0.7rem;
  border: none;
  background-color: ${({ theme, $active }) =>
    $active ? theme.color.buttonHoverColor : theme.color.mainColor};
  color: ${({ theme, $active }) =>
    $active ? theme.color.blackColor : theme.color.whiteColor};
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.color.buttonHoverColor};
    color: ${({ theme }) => theme.color.blackColor};
  }
`;

export { SwitchContainer, SwitchButton };
