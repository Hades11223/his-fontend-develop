import styled from "styled-components";
import { Page } from "components";

export const MainPage = styled(Page)`
  padding: 10px 16px;
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
      width: 100%;
      padding-bottom: 0;
    }
  }
`;
export const Main = styled.div`
  background: #f4f5f7;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
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
    overflow: hidden;
    margin-top: 16px;
    flex: 1;
    & > .ant-col {
      height: 100%;
    }
  }
`;
