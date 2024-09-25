import styled from "styled-components";

const UserForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const UserLabel = styled.label`
  margin-bottom: 0.5rem;

  font-size: ${({ theme }) => theme.fontSize.small};
`;

const UserInput = styled.input`
  padding: 0.5rem;
  border: 0.1rem solid ${({ theme }) => theme.color.buttonMainFontColor};
  border-radius: 0.4rem;
  color: ${({ theme }) => theme.color.buttonDisabledSubColor};
  font-size: ${({ theme }) => theme.fontSize.large};
  outline: none;
`;

export { UserForm, UserLabel, UserInput };
