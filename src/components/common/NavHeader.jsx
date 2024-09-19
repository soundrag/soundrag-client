import AudioPlayer from "../AudioPlayer";
import AuthPanel from "../AuthPanel";
import Switch from "../Switch";

import soundragLogo from "../../assets/images/home-logo.svg";

import {
  NavContainer,
  NavItem,
  SoundragImage,
} from "../../style/NavHeaderStyle";

const NavHeader = () => {
  return (
    <NavContainer>
      <NavItem>
        <SoundragImage src={soundragLogo} alt="soundrag logo" />
      </NavItem>
      <NavItem>
        <AudioPlayer />
      </NavItem>
      <NavItem>
        <Switch />
      </NavItem>
      <NavItem>
        <AuthPanel />
      </NavItem>
    </NavContainer>
  );
};

export default NavHeader;
