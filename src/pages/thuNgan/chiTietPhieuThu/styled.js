import styled, { createGlobalStyle } from "styled-components";
import { Page } from "components";
export const GlobalStyle = createGlobalStyle`
  .ant-message {
    position: fixed;
    /* top: calc(100vh - 10px); */
    right: 10px;
}
  body{
    position: relative;
  }
  .app-main{
    overflow: auto !important;
  }
`;
export const MainPage = styled(Page)`
  & .main-page {
    padding: 0;
    & .page-body {
      overflow: auto;
      padding: 0;
    }
  }
  & .wrapper-header-container {
    display: none;
  }

  & .header-page {
    display: none;
  }
`;

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  background: #f4f5f7;
  .main__container {
    margin-top: 0 !important;
    border-top: 3px solid #ef4066;
    border-radius: 16px 0px 0px 0px;
    overflow: hidden;
    background: #ffffff;
  }
  .info-partient {
    /* padding: 11px 23px 20px; */
    padding: 8px;
    margin: 16px !important;
    background: linear-gradient(
        0deg,
        rgba(255, 255, 255, 0.95),
        rgba(255, 255, 255, 0.95)
      ),
      #0762f7;
    box-shadow: 0px 0px 15px rgba(9, 30, 66, 0.07);
    border-radius: 16px;
  }
  .bottom-content {
    font-family: Nunito Sans;
    margin: 0 8px !important;
    flex: 1;
    & > .ant-col {
      height: 100%;
    }
    &__wrapper-table {
      box-shadow: 0px 0px 15px rgb(9 30 66 / 7%);
      border-radius: 16px;
      overflow: hidden;
      height: 100%;
      display: flex;
      flex-direction: column;
      .tab-content {
        height: 100%;
        .ant-tabs {
          background: #03317c;

          .ant-tabs-nav {
            margin-bottom: 0;
            height: 53px;
            padding: 0 30px 0 10px;
            border-radius: 16px 16px 0 0;
            &:before {
              border-bottom: 0;
            }
            .ant-tabs-nav-wrap {
              align-items: end;
            }
            .ant-tabs-ink-bar {
              background: none !important;
            }
            .ant-tabs-tab {
              border-radius: 8px 8px 0px 0px;
              margin: 0px 4px 0px 0px;
              background: #0762f7;
              padding: 0 10px !important;
              &.ant-tabs-tab-active {
                color: #172b4d;
                background: white;
                .ant-tabs-tab-btn {
                  color: #172b4d !important;
                }
              }
              .ant-tabs-tab-btn {
                padding: 0 10px;
                font-family: Nunito Sans;
                font-weight: normal !important;
                font-style: normal !important;
                font-size: 14px !important;
                color: white !important;
                padding: 4px !important;
              }
            }
          }
        }
        .ant-tabs-content-holder {
          overflow: hidden;
          background: #ffffff;
          z-index: 10;

          .ant-tabs-content-top {
            background: linear-gradient(
                0deg,
                rgba(255, 255, 255, 0.5),
                rgba(255, 255, 255, 0.5)
              ),
              #0762f7;
            border-radius: 20px 0px 0px 0px;
            background: #fff;
            height: 100%;
            .ant-tabs-tabpane {
              height: 100%;
              flex-direction: column;
            }
          }
        }
        .header-panel {
          display: flex;
          align-items: center;
          svg {
            margin-left: 5px;
            cursor: pointer;
          }
        }
      }
    }
    &__header {
      height: 53px;
      align-items: center;
      padding: 0 30px;
    }
    &__title-right {
      font-weight: bold;
      font-size: 18px;
      display: flex;
      align-items: center;
      & svg.icon {
        margin-left: 5px;
        cursor: pointer;
      }

      color: #ffffff;
    }
    &__btn-right {
      text-align: right;
      display: flex;
      justify-content: flex-end;
    }
  }
`;
