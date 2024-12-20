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
  top: 4rem;
`;

const SwitchButtonContainer = styled.div`
  position: absolute;
  bottom: 3rem;
  right: 2rem;
`;

export {
  GalleryContainer,
  StudioPageContainer,
  StudioContainer,
  GalleryButtonContainer,
  MyGalleryContainer,
  SwitchButtonContainer,
};
