import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const handleHomeButton = () => {
    navigate("/studio");
  };

  return (
    <NavContainer>
      <NavItem>
        <SoundragImage
          src={soundragLogo}
          alt="soundrag logo"
          onClick={handleHomeButton}
        />
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
