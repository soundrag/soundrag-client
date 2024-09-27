import styled from "styled-components";

const IconContainer = styled.div`
  width: 2rem;
  border-radius: 50%;

  &:hover {
    box-shadow: 0 0 10px ${({ theme }) => theme.color.whiteColor};
  }
`;

const IconImage = styled.img`
  width: 100%;
  height: 100%;
`;

export { IconContainer, IconImage };
