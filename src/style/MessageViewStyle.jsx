import styled from "styled-components";

const ViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 100vh;
`;

const MessageContainer = styled.div`
  color: ${({ theme }) => theme.color.mainColor};
  font-size: ${({ theme }) => theme.fontSize.title};
  font-weight: bold;
`;

export { ViewContainer, MessageContainer };
