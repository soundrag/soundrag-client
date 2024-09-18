import { Link } from "react-router-dom";

import Button from "../components/common/Button";

import SoundragLogo from "../assets/images/logo.svg";

import {
  SplashContainer,
  SplashTitle,
  SubText,
  SplashLogo,
  SplashButtonContainer,
} from "../style/SplashPageStyle";

const SplashPage = () => {
  return (
    <SplashContainer>
      <SplashTitle>
        Soun
        <SubText>drag</SubText>
      </SplashTitle>
      <SplashLogo src={SoundragLogo} alt="Soundrag Logo" />
      <SplashButtonContainer>
        <Button text="Tutorial" size="xLarge" isDisabled />
        <Link to="/studio">
          <Button text="Skip" size="xLarge" />
        </Link>
      </SplashButtonContainer>
    </SplashContainer>
  );
};

export default SplashPage;
