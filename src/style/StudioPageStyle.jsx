import styled from "styled-components";

const StudioContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  gap: 10rem;
`;

const SaveButtonContainer = styled.div`
  position: fixed;
  right: 10%;
  bottom: 10%;
`;

export { StudioContainer, SaveButtonContainer };
