import styled from "styled-components";

const MessageBoxContainer = styled.div`
  width: ${({ $keyboard }) => !$keyboard && "25rem"};
`;

const MessageBoxMode = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ $keyboard }) => ($keyboard ? "1rem" : "2rem")};
  background-color: ${({ theme }) => theme.color.menuBackgroundColor};
  color: ${({ theme }) => theme.color.whiteColor};
  padding: 0.5rem 0;
  font-size: ${({ theme }) => theme.fontSize.small};
`;

const MessageBoxModeImage = styled.img`
  width: 1.5rem;
`;

const MessageBoxTitle = styled.div`
  color: ${({ theme }) => theme.color.mainColor};
  font-size: ${({ theme }) => theme.fontSize.small};
  font-weight: bold;
  text-align: center;
  margin: 0.5rem 0;
`;

const MessageBoxDescription = styled.div`
  padding: 0.5rem;
  color: ${({ theme }) => theme.color.galleryNameColor};
  font-size: ${({ theme }) => theme.fontSize.small};
`;

export {
  MessageBoxContainer,
  MessageBoxMode,
  MessageBoxModeImage,
  MessageBoxTitle,
  MessageBoxDescription,
};
