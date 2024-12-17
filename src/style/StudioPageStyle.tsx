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
  @media (max-width: 1010px) {
    flex-direction: column;
  }
`;

const GalleryButtons = styled.div`
  display: flex;
  gap: 2rem;
`;

const VersionContainer = styled.div`
  display: flex;
  align-items: center;
  width: 20rem;
  gap: 2rem;
  font-size: ${({ theme }) => theme.fontSize.large};
  color: ${({ theme }) => theme.color.galleryNameColor};
`;

const VersionShortCut = styled.div`
  display: flex;
  padding: 0.5rem;
  gap: 1rem;
  font-size: ${({ theme }) => theme.fontSize.small};
  border: 1px dashed ${({ theme }) => theme.color.galleryNameColor};
`;

const MyGalleryContainer = styled.div`
  position: absolute;
  top: 3.3rem;
  right: 3rem;

  @media (max-width: 1010px) {
    top: 7.3rem;
    right: 5.7rem;
  }
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
  GalleryButtons,
  VersionContainer,
  VersionShortCut,
  MyGalleryContainer,
  SwitchButtonContainer,
  TutorialContainer,
};
