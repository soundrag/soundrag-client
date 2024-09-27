import styled from "styled-components";

const SwitchContainer = styled.div`
  position: relative;
  width: 6rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.color.mainColor};
  border-radius: 50px;
  padding: 0.2rem;
`;

const SwitchButton = styled.button`
  width: 50%;
  background-color: transparent;
  border: none;
  font-size: ${({ theme }) => theme.fontSize.small};
  color: ${({ theme, $active }) =>
    $active ? theme.color.blackColor : theme.color.buttonMainFontColor};
  font-weight: ${({ $active }) => ($active ? "bold" : "bold")};
  cursor: pointer;
  transition: color 0.3s;

  &:focus {
    outline: none;
  }
`;

const SwitchSlider = styled.div`
  position: absolute;
  top: 50%;
  left: ${({ $active }) => ($active ? "5%" : "50%")};
  width: 45%;
  height: 80%;
  background-color: ${({ theme }) => theme.color.buttonMainFontColor};
  border-radius: 2rem;
  transition: left 0.3s;
  transform: translateY(-50%);
`;

export { SwitchContainer, SwitchButton, SwitchSlider };
