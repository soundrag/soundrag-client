import styled, { keyframes } from "styled-components";

const SplashPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 100vh;
`;

const SplashTitle = styled.h1`
  display: flex;
  color: ${({ theme }) => theme.color.subColor};
  font-size: ${({ theme }) => theme.fontSize.title};
  font-weight: bold;
`;

const SubText = styled.p`
  color: ${({ theme }) => theme.color.mainColor};
`;

const moveAround = keyframes`
    10% {
      transform: translate(0, 0);
      opacity: 1;
    }

    20% {
      transform: translate(0, 50%);
      opacity: 0.6;
    }

    30% {
      transform: translate(0, 0);
      opacity: 0.8;
    }

    40% {
      transform: translate(50%, 0);
      opacity: 0.4;
    }

    50% {
      transform: translate(0, 0);
      opacity: 0.8;
    }

    60% {
      transform: translate(0, -50%);
      opacity: 0.4;
    }

    70% {
      transform: translate(0, 0);
      opacity: 0.8;
    }

    80% {
      transform: translate(-50%, 0);
      opacity: 0.4;
    }

    90% {
      transform: translate(0, 0);
      opacity: 0.8;
    }

    92% {
      transform: scale(1.1);
      opacity: 1;
    }

    94% {
      transform: scale(0.9);
      opacity: 1;
    }

    96% {
      transform: scale(1.1);
      opacity: 1;
    }

    98% {
      transform: scale(0.9);
      opacity: 1;
    }

    100% {
      transform: scale(1);
      opacity: 1;
    }
`;

const SplashLogo = styled.img`
  width: 12rem;
  height: 12rem;
  animation: ${moveAround} 3s ease-in-out infinite;
`;

const SplashButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 200%;
`;

export {
  SplashPageContainer,
  SplashTitle,
  SubText,
  SplashLogo,
  SplashButtonContainer,
};
