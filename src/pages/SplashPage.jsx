import { Link } from "react-router-dom";

import Button from "../components/common/Button";

import SoundragLogo from "../assets/images/logo.svg";

import {
  SplashPageContainer,
  SplashTitle,
  SubText,
  SplashLogo,
  SplashButtonContainer,
} from "../style/SplashPageStyle";

const SplashPage = () => {
  return (
    <SplashPageContainer>
      <SplashTitle>
        Soun
        <SubText>drag</SubText>
      </SplashTitle>
      <SplashLogo src={SoundragLogo} alt="Soundrag Logo" />
      <SplashButtonContainer>
        <Link to="/studio" style={{ textDecoration: "none" }}>
          <Button text="Skip" size="xLarge" />
        </Link>
      </SplashButtonContainer>
    </SplashPageContainer>
  );
};

export default SplashPage;
