import styled from "styled-components";

const ButtonContainer = styled.button`
  padding: 0.6rem 1.2rem;
  font-size: ${({ size, theme }) => theme.fontSize[size]};
  font-weight: bold;
  border: none;
  border-radius: 5%;
  background-color: ${({ disabled, theme }) =>
    disabled ? theme.color.buttonDisabledColor : theme.color.mainColor};
  color: ${({ disabled, theme }) =>
    disabled ? theme.color.mainColor : theme.color.buttonMainFontColor};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};

  &:hover {
    background-color: ${({ disabled, theme }) =>
      !disabled && theme.color.buttonHoverColor};
    color: ${({ disabled, theme }) =>
      !disabled && theme.color.buttonHoverFontColor};
  }
`;

export { ButtonContainer };
