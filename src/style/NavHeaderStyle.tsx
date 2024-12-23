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
  padding: 2rem 2rem;
  border-bottom: 0.2rem solid ${({ theme }) => theme.color.subColor};
  color: ${({ theme }) => theme.color.mainColor};
  background-color: ${({ theme }) => theme.color.menuBackgroundColor};

  .left-nav-items {
    display: flex;
    gap: 4rem;
  }
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.color.buttonHoverSubColor};
  font-size: ${({ theme }) => theme.fontSize.large};
  font-weight: bold;
`;

const SoundragImage = styled.img`
  width: 5rem;
`;

export { NavContainer, NavItem, SoundragImage };
