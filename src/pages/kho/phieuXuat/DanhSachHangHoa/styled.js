import styled from "styled-components";
export const Main = styled.div`
  & .ant-table-tbody {
    .ant-table-row {
      &:nth-child(2n) {
        td {
          background-color: inherit !important;
        }
      }
      & td {
        border-bottom: 1px solid #c5cad3;
      }
      & .ant-table-cell {
        border-right: 0px;
        & .ant-input,
        & .ant-input-number {
          border: none !important;
          border-bottom: 1px solid #d9d9d9 !important;
          border-radius: 0px !important;
        }
        & input {
          padding-left: 0;
          padding-right: 0;
        }
      }
      &:hover .ant-table-cell {
        background: inherit !important;
      }
    }
  }
`;
