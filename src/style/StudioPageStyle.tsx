import styled from "styled-components";

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

const VersionContainer = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  width: 40rem;
  gap: 2rem;
  font-size: ${({ theme }) => theme.fontSize.large};
  color: ${({ theme }) => theme.color.buttonHoverSubColor};
  position: relative;
`;

const VersionTutorial = styled.div`
  padding: 0.5rem;
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSize.small};
  z-index: 99999;
  text-decoration: underline;
`;

const VersionContent = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 10rem;
  padding: 0.5rem;
  top: 50%;
  right: 80%;
  font-size: ${({ theme }) => theme.fontSize.small};

  .auto-save {
    display: inline;
    color: ${({ theme }) => theme.color.redColor};
  }
`;

const VersionShortCut = styled.div`
  display: flex;
  padding: 0.5rem;
  gap: 1rem;
  font-size: ${({ theme }) => theme.fontSize.small};
  border: 1px dashed ${({ theme }) => theme.color.buttonHoverSubColor};
`;

const VersionText = styled.div`
  min-width: 6rem;
  text-align: center;
`;

const GalleryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: absolute;
  top: 10rem;
  right: 2rem;
`;

const GalleryButtonContainer = styled.div`
  display: flex;
  justify-content: end;
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

const MyGalleryContainer = styled.div`
  position: absolute;
  top: 6.3rem;
  right: 4.3rem;

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
  VersionTutorial,
  VersionShortCut,
  VersionText,
  VersionContent,
  MyGalleryContainer,
  SwitchButtonContainer,
  TutorialContainer,
};
