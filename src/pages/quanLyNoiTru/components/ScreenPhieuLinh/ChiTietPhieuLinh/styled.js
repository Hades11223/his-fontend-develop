import styled from "styled-components";
import { Page } from "components";
export const MainPage = styled(Page)`
  .wrapper-header-container {
    height: 45px;
  }
  .main-page {
    .page-body {
      padding: 0;
      flex-direction: column;
      & > .action {
        padding: 0;
        margin: 5px 0;
      }
    }
    & .header-page {
      & .title-category {
        & .title {
          display: flex;
          align-items: center;
          & .header-action {
            margin-left: 5px;
            display: flex;
            align-items: center;
            & .action-btn {
              margin-right: 5px;
              & svg {
                margin-top: 10px;
              }
            }
          }
        }
      }
    }
  }
`;
export const Main = styled.div`
  flex: 1;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  & .tab-content {
    flex: 1;
  }
  & .ant-tabs-nav {
    height: 45px;
    & .ant-tabs-nav-wrap {
      height: 44px;
    }
  }
  & .ant-tabs-content-top {
    height: 100%;
    & .ant-tabs-tabpane {
      & > div {
        height: 100%;
        & .main-table-wrapper {
          height: 100%;
        }
      }
    }
  }
  & .tabbar-extra {
    padding: 0 10px;
    font-weight: bold;
    color: #03317c;
    display: flex;
    align-items: center;
  }
`;
