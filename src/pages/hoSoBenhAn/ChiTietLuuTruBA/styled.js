import styled from "styled-components";
import { Page } from "components";

export const Main = styled.div`
  background: #f4f5f7;
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;

  .container {
    padding: 0 8px !important;
  }

  .ant-row {
    width: 100%;
  }

  .content {
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow-y: scroll;
    margin-bottom: 16px;
  }

  .action-bottom {
    display: flex;
    .button-left {
      display: flex;
    }
    .button-right {
      margin-left: auto;
      display: flex;
    }
  }
`;

export const MainPage = styled(Page)`
  & .wrapper-header-container {
    & .top-level-category {
      padding: 0px 10px;
      & .home-breadcrumbs {
        height: 20px;
      }
    }
  }
  & .main-page {
    padding: 0px 16px;
    & .page-body {
      padding: 16px 1px;
    }
  }
`;
