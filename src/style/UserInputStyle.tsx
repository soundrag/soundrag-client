import styled from "styled-components";

interface UserInputStyleProps {
	maxLength?: string;
}

const UserForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const UserLabel = styled.label`
  .name-rule {
    font-size: ${({ theme }) => theme.fontSize.small};

    span {
      color: ${({ theme }) => theme.color.redColor};
      font-weight: bold;
    }
  }
`;

const UserInputTag = styled.input<UserInputStyleProps>`
  padding: 0.3rem;
  border: 0.1rem solid ${({ theme }) => theme.color.buttonMainFontColor};
  border-radius: 0.4rem;
  color: ${({ theme }) => theme.color.buttonDisabledSubColor};
  font-size: ${({ theme }) => theme.fontSize.large};
  outline: none;
`;

export { UserForm, UserLabel, UserInputTag };
