import styled from "styled-components";

const ButtonContainer = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.4rem 1.2rem;
  font-size: ${({ size, theme }) => theme.fontSize[size]};
  font-weight: bold;
  border: none;
  border-radius: 5%;
  background-color: ${({ disabled, theme }) =>
    disabled
      ? theme.color.buttonDisabledColor
      : theme.color.buttonHoverSubColor};
  color: ${({ disabled, theme }) =>
    disabled ? theme.color.mainColor : theme.color.menuBackgroundColor};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};

  &:hover {
    background-color: ${({ disabled, theme }) =>
      !disabled && theme.color.galleryNameColor};
    color: ${({ disabled, theme }) => !disabled && theme.color.blackColor};
  }
`;

export { ButtonContainer };
