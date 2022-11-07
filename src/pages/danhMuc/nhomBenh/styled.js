import styled from "styled-components";

export const Main = styled.div`
  height: 100%;
  overflow: auto;

  & .custom-header {
    border: none !important;
  }

  .row-actived {
    background: #c1f0db !important;
  }
  & .ant-tabs {
    max-width: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .main__container {
      margin-top: 0px !important;
    }
    & .ant-tabs-nav {
      background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
        #0762f7;
      box-shadow: 0px 0px 15px rgb(9 30 66 / 7%);
      border-radius: 16px 16px 0px 0px;
      margin-bottom: 0px !important;
      &::before {
        border: 0px !important;
      }
      .ant-tabs-nav-list {
        height: 55px;
        margin-left: 20px;
        padding-top: 20px;
        .ant-tabs-ink-bar {
          background: #fff !important;
          display: none;
        }
        .ant-tabs-tab {
          background: #0762f7;
          border-radius: 8px 8px 0px 0px;
          padding: 0 !important;
          .ant-tabs-tab-btn {
            color: #fff !important;
            padding: 6px 16px 6px 16px !important;
            font-style: normal !important;
            font-weight: 500 !important;
            font-size: 14px !important;
          }

          margin: 0px 0px 0px 10px;
        }
        .ant-tabs-tab-active {
          background: #fff !important;
          border-top: 2px solid red;
          .ant-tabs-tab-btn {
            color: #172b4d !important;
          }
        }
      }
    }
    .ant-tabs-content-holder {
      width: 100%; 
      height: 100%;
      overflow: hidden;
      flex: 1;

      .ant-tabs-content {
        border-left: 2px solid #dfe1e6;
        border-right: 2px solid #dfe1e6;
        border-bottom: 2px solid #dfe1e6;
        border-bottom-left-radius: 17px;
        border-bottom-right-radius: 17px;
        display: flex;

        .ant-tabs-tabpane {
          width: 100%;
        }
      }
    }
  }
  .parrent-wrapper {
    margin-top: 43px;
  }
`;
