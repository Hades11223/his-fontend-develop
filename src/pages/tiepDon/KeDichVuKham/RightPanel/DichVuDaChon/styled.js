import styled, { createGlobalStyle } from "styled-components";
import { Col } from "antd";

export const Main = styled.div`
  padding: 8px;
  padding-top: 0px;
  height: 50%;
  .ant-table-placeholder {
    // display: none;
    .ant-table-cell {
      height: 278px;
    }
  }
  th.ant-table-cell.ant-table-cell-fix-right.ant-table-cell-fix-right-first {
    right: 0 !important;
  }
  td.ant-table-cell.ant-table-cell-fix-right.ant-table-cell-fix-right-first {
    right: -6px !important;
  }
  .col-action {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  & .main-table-wrapper {
    flex: 1;
    overflow: hidden;
    box-shadow: 0px 0px 15px rgb(9 30 66 / 7%);
    & .main__container {
      height: 100%;
      & .custome-header {
        & .title-box {
          border-bottom: none !important;
        }
      }
      & .ant-input-number,
      & .ant-select,
      & .ant-select-selector {
        border-radius: 0 !important;
      }
      .ant-select-single {
        margin: 0px !important;
      }
    }
  }
  & .pagination {
    padding: 0px;
    margin: 5px;
  }
  & svg.ic-action {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
`;
export const GlobalStyle = createGlobalStyle`
  .tiep-don-select-1{
    width: 270px !important;
  }
  .tiep-don-select-2{
    width: 350px !important;
  }
`;
