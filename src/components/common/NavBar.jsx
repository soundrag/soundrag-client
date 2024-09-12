import AudioPlayer from "../AudioPlayer";

import soundragLogo from "../../assets/home-logo.svg";
import googleLogo from "../../assets/google-logo.svg";

import useAuthStore from "../../stores/useAuthStore";

import {
  NavContainer,
  UserMenuContainer,
  StyledLink,
  SoundragImage,
  GoogleImage,
} from "../../style/NavBarStyle";

const NavBar = () => {
  const { isLoggedIn, toggleLogin } = useAuthStore();

  return (
    <NavContainer>
      <StyledLink to="/studio">
        <SoundragImage src={soundragLogo} alt="soundrag logo" />
      </StyledLink>
      <AudioPlayer />
      <UserMenuContainer>
        {isLoggedIn ? (
          <>
            <StyledLink to="/user">My Gallery</StyledLink>
            <StyledLink onClick={toggleLogin}>Log out</StyledLink>
          </>
        ) : (
          <StyledLink to="/studio" onClick={toggleLogin}>
            <GoogleImage src={googleLogo} alt="google logo" />
            Log in
          </StyledLink>
        )}
      </UserMenuContainer>
    </NavContainer>
  );
};

export default NavBar;
