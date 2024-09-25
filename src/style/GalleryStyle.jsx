import styled from "styled-components";

const DataListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  gap: 5rem;
  margin-top: 5rem;

  th {
    background-color: ${({ theme }) => theme.color.menuBackgroundColor};
    padding: 1rem 0;
  }
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

export { DataListContainer, DataList, DataListRow, DataListCell };
