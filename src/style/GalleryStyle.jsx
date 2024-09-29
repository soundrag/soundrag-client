import styled from "styled-components";

const DataListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 2rem;
  gap: 5rem;
  z-index: 9999;

  th {
    background-color: ${({ theme }) => theme.color.menuBackgroundColor};
    color: ${({ theme }) => theme.color.whiteColor};
    padding: 1rem 0;
    font-size: ${({ theme }) => theme.fontSize.xSmall};
  }
`;

const DataList = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const DataListRow = styled.tr`
  .button-container {
    display: flex;
    gap: 2rem;
  }
`;

const DataListCell = styled.td`
  padding: 0.5rem;
  color: ${({ theme }) => theme.color.galleryNameColor};
  font-size: ${({ theme }) => theme.fontSize.small};
`;

export { DataListContainer, DataList, DataListRow, DataListCell };
