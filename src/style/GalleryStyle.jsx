import styled from "styled-components";

const DataListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 20rem;
  gap: 4rem;
  z-index: 9999;

  th {
    background-color: ${({ theme }) => theme.color.menuBackgroundColor};
    color: ${({ theme }) => theme.color.whiteColor};
    padding: 1rem 0;
    font-size: ${({ theme }) => theme.fontSize.xSmall};
  }

  @media (max-height: 840px) {
    width: 16rem;
  }
`;

const DataList = styled.table`
  border-collapse: collapse;
`;

const DataListRow = styled.tr`
  .button-container {
    display: flex;
    gap: 2rem;
  }

  @media (max-height: 840px) {
    .button-container {
      display: flex;
      gap: 2rem;
    }
  }
`;

const DataListCell = styled.td`
  padding: 0.5rem 1rem;
  color: ${({ theme }) => theme.color.galleryNameColor};
  font-size: ${({ theme }) => theme.fontSize.small};
`;

const DeleteButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;

  img {
    width: 1.2rem;
  }

  img:hover {
    border-radius: 50%;
    box-shadow: 0 0 1rem red;
  }
`;

export { DataListContainer, DataList, DataListRow, DataListCell, DeleteButton };
