import styled from "styled-components";
import { Page } from "components";

export const MainPage = styled(Page)`
  padding: 16px;
  & .wrapper-header-container {
    & .top-level-category {
      padding: 0;
      & .home-breadcrumbs {
        height: auto;
      }
    }
  }
  & .main-page {
    padding: 0;
    & .header-page {
      display: none;
    }
    & .page-body {
      overflow: auto;
    }
  }
`;

export const Main = styled.div`
  background: #f4f5f7;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  .ant-row {
    width: 100%;
  }
  .left {
    > div {
      margin-right: 8px !important;
    }
  }
  .right {
    > div {
      margin-left: 8px !important;
    }
  }
  & .list-area {
    margin-top: 16px;
    flex: 1;
    & > .ant-col {
      height: 100%;
    }
    & .table-xet-nghiem {
      height: auto;
    }
  }
`;
