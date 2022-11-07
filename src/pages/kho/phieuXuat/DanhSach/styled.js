import { Page } from "components";
import styled from "styled-components";
export const MainPage = styled(Page)`
  background: #f4f5f7;
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;

  & .danh-sach-phieu-xuat {
    display: flex;
    flex-flow: column;
    flex: 1;
    & .mn-card {
      display: flex;
      flex-flow: column;
      flex: 1;
      & .main-table-wrapper {
        flex: 1;
      }
      & .pagination {
        flex: 0 !important;
      }
    }
  }
  .ant-table-body {
    overflow: auto !important;
  }

  & .page-body {
    display: flex;
    flex-flow: column;
    & .my-card {
      display: flex;
      flex-flow: column;
      flex: 1;
    }
  }

  & .main-page {
    height: 100%;
    overflow: auto;
    display: flex;
    flex-direction: column;
  }

  .ant-row {
    width: 100%;
  }
  .left {
    > div {
      margin-right: 15px !important;
    }
  }
  .right {
    > div {
      margin-left: 15px !important;
    }
  }
`;
