import styled from "styled-components";
import { date, input } from "components/mixin";

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  & .main-page {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    & .page-body {
      flex: 1;
      overflow: hidden;
      padding: 10px 1px;
      & > .ant-col {
        height: 100%;
        display: flex;
        flex-direction: column;
      }
    }
  }
  .row-actived {
    background: #c1f0db !important;
  }
  .ant-col {
    .item-date {
      ${date};
    }
  }
  & .ant-tabs {
    flex: 1;
    .main__container {
      margin-top: 0px !important;
    }
    & .ant-tabs-nav {
      background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
        #0762f7;
      box-shadow: 0px 0px 15px rgb(9 30 66 / 7%);
      border-radius: 16px 16px 0px 0px;
      margin-bottom: 0px !important;
      margin-top: .5rem;
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

          padding: 7.5px 0 !important;
          .ant-tabs-tab-btn {
            color: #42526e;
            font-weight: 600;
            font-size: 14px;
            font-family: SF Pro Text, sans-serif;
            line-height: 16px;
            text-transform: uppercase;
          }
        }
        .ant-tabs-tab-active {
          background: #fff !important;
          border-top: 2px solid red;
          .ant-tabs-tab-btn {
            color: #172b4d !important;
          }
        }

        .ant-tabs-tab-active {
          .ant-tabs-tab-btn {
            color: #ef4066;
          }
        }
        .ant-tabs-ink-bar {
          background: #ef4066;
        }
      }
      margin-bottom: 14px;
    }
    .ant-tabs-content {
      border-left: 2px solid #dfe1e6;
      border-right: 2px solid #dfe1e6;
      border-bottom: 2px solid #dfe1e6;
      border-bottom-left-radius: 17px;
      border-bottom-right-radius: 17px;
      height: 100%;
      overflow: hidden;
      & .ant-tabs-tabpane {
        & > div {
          display: flex;
          flex-direction: column;
          height: 100%;
        }
      }
    }
  }
  & .edit-wrapper {
    & .children {
      overflow: auto;
      margin-top: 10px;
    }
    & .bottom-actions {
      & .left-actions {
        flex: 1;
      }
      & .button-bottom-modal {
        position: unset;
        flex: unset;
      }
    }
  }
  & .multi-level-tab {
    height: 100%;
    & .ant-tabs-content-holder {
      min-height: unset !important;
      max-height: unset !important;
      & .ant-tabs-content-top {
        min-height: unset !important;
        max-height: unset !important;
        & .ant-tabs-tabpane {
          height: 100%;
        }
      }
    }
    & .ant-tabs-top {
      height: 100%;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    & .ant-tabs-content {
      border-radius: 0px !important;
      border-left: 0px;
      border-right: 0px;
    }
    & .ant-tabs-nav-list {
      margin-left: 0px !important;
      padding-top: 0px !important;
    }
  }
`;
