import { Link } from "react-router-dom";

import Button from "../components/common/Button";

import SoundragLogo from "../assets/images/logo.svg";

import {
  SplashPageContainer,
  SplashTitle,
  SplashLogo,
  SplashButtonContainer,
} from "../style/SplashPageStyle";

const SplashPage = () => {
  return (
    <SplashPageContainer>
      <SplashTitle data-testid="title-text">Soundrag</SplashTitle>
      <SplashLogo
        src={SoundragLogo}
        alt="Soundrag Logo"
        data-testid="logo-image"
      />
      <SplashButtonContainer>
        <Link to="/studio" style={{ textDecoration: "none" }}>
          <Button text="Skip" size="xLarge" $testId="skip-button" />
        </Link>
      </SplashButtonContainer>
    </SplashPageContainer>
  );
};

export default SplashPage;
