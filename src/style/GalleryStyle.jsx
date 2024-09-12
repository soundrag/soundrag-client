import styled from "styled-components";

const GalleryContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  gap: 10rem;
`;

const DataList = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const DataListRow = styled.tr`
  &:nth-child(even) {
    color: ${({ theme }) => theme.color.blackColor};
    background-color: ${({ theme }) => theme.color.modalBackgroundColor};
  }

  .button-container {
    display: flex;
    gap: 2rem;
  }
`;

const DataListCell = styled.td`
  padding: 2rem;
`;

export { GalleryContainer, DataList, DataListRow, DataListCell };
