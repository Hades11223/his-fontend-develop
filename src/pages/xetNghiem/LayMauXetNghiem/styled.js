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
  min-height: 100vh;
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
`;
