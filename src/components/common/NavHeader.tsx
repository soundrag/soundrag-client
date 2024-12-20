import AudioPlayer from "../AudioPlayer";
import AuthPanel from "../AuthPanel";

import soundragLogo from "../../assets/images/home-logo.svg";

import {
  NavContainer,
  NavItem,
  SoundragImage,
} from "../../style/NavHeaderStyle";

const NavHeader = () => {
  return (
    <NavContainer data-testid="nav-header">
      <NavItem className="left-nav-items">
        <SoundragImage
          src={soundragLogo}
          alt="soundrag logo"
          data-testid="soundrag-logo"
        />
      </NavItem>
      <NavItem>
        <AudioPlayer />
      </NavItem>
      <NavItem>
        <AuthPanel />
      </NavItem>
    </NavContainer>
  );
};

export default NavHeader;
