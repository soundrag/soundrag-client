import styled from "styled-components";

const AuthPanelContainer = styled.div``;

const AuthContainer = styled.div`
  display: flex;
`;

const GalleryButton = styled.button`
  padding: 0.5rem 1rem;
  margin-right: 2rem;
  color: ${({ theme }) => theme.color.mainColor};
  font-size: ${({ theme }) => theme.fontSize.large};
  font-weight: bold;
  border: none;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.color.buttonHoverColor};
  }
`;

const LogoutButton = styled.button`
  padding: 0.5rem 1rem;
  margin-right: 2rem;
  color: ${({ theme }) => theme.color.mainColor};
  font-size: ${({ theme }) => theme.fontSize.large};
  font-weight: bold;
  border: none;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.color.buttonHoverColor};
  }
`;

const UnAuthContainer = styled.button`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  margin-right: 2rem;
  color: ${({ theme }) => theme.color.mainColor};
  font-size: ${({ theme }) => theme.fontSize.large};
  font-weight: bold;
  border: none;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.color.buttonHoverColor};
  }
`;

const GoogleImage = styled.img`
  width: 2rem;
  margin-right: 0.5rem;
`;

export {
  AuthPanelContainer,
  AuthContainer,
  GalleryButton,
  LogoutButton,
  UnAuthContainer,
  GoogleImage,
};
