import styled from "styled-components";

const ButtonContainer = styled.button`
  padding: 0.6rem 1.2rem;
  font-size: ${({ size, theme }) => theme.fontSize[size]};
  font-weight: bold;
  border: none;
  border-radius: 5%;
  border-right: 0.3rem solid
    ${({ disabled, theme }) =>
      disabled ? theme.color.buttonDisabledSubColor : theme.color.subColor};
  border-bottom: 0.3rem solid
    ${({ disabled, theme }) =>
      disabled ? theme.color.buttonDisabledSubColor : theme.color.subColor};
  background-color: ${({ disabled, theme }) =>
    disabled ? theme.color.buttonDisabledColor : theme.color.mainColor};
  color: ${({ disabled, theme }) =>
    disabled ? theme.color.mainColor : theme.color.buttonMainFontColor};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};

  &:hover {
    background-color: ${({ disabled, theme }) =>
      !disabled && theme.color.buttonHoverColor};
    border-right: ${({ disabled, theme }) =>
      !disabled && `0.1rem solid ${theme.color.buttonHoverSubColor}`};
    border-bottom: ${({ disabled, theme }) =>
      !disabled && `0.1rem solid ${theme.color.buttonHoverSubColor}`};
    color: ${({ disabled, theme }) =>
      !disabled && theme.color.buttonHoverFontColor};
  }
`;

export { ButtonContainer };
