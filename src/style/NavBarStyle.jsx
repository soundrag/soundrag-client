import { Link } from "react-router-dom";
import styled from "styled-components";

const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 5rem;
  padding: 1rem;
  border-bottom: 0.2rem solid ${({ theme }) => theme.color.subColor};
  color: ${({ theme }) => theme.color.mainColor};
  background-color: ${({ theme }) => theme.color.menuBackgroundColor};
`;

const UserMenuContainer = styled.div`
  display: flex;
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  margin-right: 2rem;
  color: ${({ theme }) => theme.color.mainColor};
  font-size: ${({ theme }) => theme.fontSize.large};
  font-weight: bold;
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.color.buttonHoverColor};
  }
`;

const SoundragImage = styled.img`
  width: 5rem;
`;

const GoogleImage = styled.img`
  width: 2rem;
  margin-right: 0.5rem;
`;

export {
  NavContainer,
  UserMenuContainer,
  StyledLink,
  SoundragImage,
  GoogleImage,
};
