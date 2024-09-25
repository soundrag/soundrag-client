import styled from "styled-components";

const StudioPageContainer = styled.div``;

const StudioContainer = styled.div`
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

const SaveButtonContainer = styled.div`
  position: fixed;
  right: 10%;
  bottom: 10%;
`;

export { StudioPageContainer, StudioContainer, SaveButtonContainer };
