import styled from "styled-components";

const GalleryContainer = styled.div`
  position: absolute;
  top: 10rem;
  right: 2rem;
`;

const StudioPageContainer = styled.div``;

const StudioContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  gap: 10rem;
  background: radial-gradient(
    circle,
    rgba(55, 55, 54, 1) 0%,
    rgba(0, 0, 0, 1) 30%
  );
`;

const GalleryButtonContainer = styled.div`
  display: flex;
  gap: 2rem;
  width: 100%;
`;

const MyGalleryContainer = styled.div`
  position: absolute;
  top: 3.3rem;
  right: 3rem;
`;

const KeyboardTutorialContainer = styled.div`
  position: absolute;
  top: 12rem;
  left: 2rem;
  color: ${({ theme }) => theme.color.whiteColor};
`;

const SwitchButtonContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  bottom: 2rem;
  left: 24rem;
  gap: 1rem;
  color: ${({ theme }) => theme.color.whiteColor};
  z-index: 9999;

  @media (max-height: 840px) {
    bottom: 2.5rem;
    left: 26rem;
  }
`;

const TutorialContainer = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 2rem;

  @media (max-height: 840px) {
    left: 2rem;
  }
`;

export {
  GalleryContainer,
  KeyboardTutorialContainer,
  StudioPageContainer,
  StudioContainer,
  GalleryButtonContainer,
  MyGalleryContainer,
  SwitchButtonContainer,
  TutorialContainer,
};
