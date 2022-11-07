import styled from "styled-components";

export const Main = styled.div`
  margin-top: 10px;
  background-color: #ffffff;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  padding: 10px;
  & > h1 {
    padding: 12px 2px;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    border-bottom: 1px solid rgba(34, 54, 69, 0.1);
  }
  & .ant-table-thead > tr > th {
    background: #eff1f2;
  }

  .ant-table-thead
    > tr
    > th:not(:last-child):not(.ant-table-selection-column):not(.ant-table-row-expand-icon-cell):not([colspan])::before {
    background: transparent !important;
  }
  .ant-table-thead > tr > th,
  .ant-table-tbody > tr > td {
    font-weight: 700 !important;
  }
`;
