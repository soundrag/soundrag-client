import styled from "styled-components";

const UploadZoneContainer = styled.form`
  padding: 1rem;
  border: 0.2rem dashed ${({ theme }) => theme.color.buttonHoverColor};
  text-align: center;
  cursor: pointer;

  .drop-message {
    color: ${({ theme }) => theme.color.redColor};
    font-size: ${({ theme }) => theme.fontSize.large};
  }
`;

const UploadInput = styled.input``;

const UploadInputText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  color: ${({ $upload, theme }) => $upload && theme.color.mainFontColor};
  font-size: ${({ theme }) => theme.fontSize.large};
`;

const UploadSubText = styled.div`
  display: ${({ $upload }) => ($upload ? "none" : "flex")};
  flex-direction: column;
  gap: 0.3rem;

  .file-message {
    color: ${({ theme }) => theme.color.buttonHoverFontColor};
    font-size: ${({ theme }) => theme.fontSize.small};
  }

  .click-message {
    color: ${({ theme }) => theme.color.redColor};
    font-size: ${({ theme }) => theme.fontSize.small};
  }
`;

export { UploadZoneContainer, UploadInput, UploadInputText, UploadSubText };
