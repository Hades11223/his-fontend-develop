import styled from "styled-components";

export const Main = styled.div`
  overflow: hidden;
  border-radius: 16px;
  box-shadow: 0px 3px 5px rgba(9, 30, 66, 0.2),
    0px 0px 1px rgba(9, 30, 66, 0.31);
  .ant-tabs {
    background: #03317c;

    .ant-tabs-nav {
      margin-bottom: 0;
      height: 46px;
      padding: 0 30px;
      box-shadow: 0px 3px 5px rgb(9 30 66 / 20%), 0px 0px 1px rgb(9 30 66 / 31%);
      border-radius: 16px 16px 0 0;
      &:before {
        border-bottom: 0;
      }
      .ant-tabs-ink-bar {
        background: none !important;
      }
      .ant-tabs-tab {
        padding: 0 10px !important;
        margin: 0;
        &.ant-tabs-tab-active {
          background: #0762f7;
          color: #fff;
          .ant-tabs-tab-btn {
            /* color: #fff !important; */
            font-weight: 700 !important;
          }
        }
        .ant-tabs-tab-btn {
          padding: 0 10px;
          font-family: Nunito Sans;
          font-weight: normal !important;
          font-style: normal !important;
          font-size: 14px !important;
          color: #0762f7 !important;
        }
      }
    }
  }
  .ant-tabs-content-holder {
    overflow: hidden;
    background: #ffffff;
    // border-radius: 20px 0px 0px 0px;
    // border-top-left-radius: 20px;
    // border-top: 4px solid #3984ff;
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
    }

    /* .ant-tabs-content {
      >div {
        padding: ${(props) => (props.isNotBorder ? null : "1.25rem")};
      }
    } */
  }
`;

export const Main1 = styled.div`
  overflow: hidden;
  border-radius: 16px;
  box-shadow: 0px 3px 5px rgba(9, 30, 66, 0.2),
    0px 0px 1px rgba(9, 30, 66, 0.31);
  .ant-tabs {
    background: #03317c;

    .ant-tabs-nav {
      margin-bottom: 0;
      margin-top: 10px;
      height: 46px;
      padding: 0 30px;
      border-radius: 16px 16px 0 0;
      &:before {
        border-bottom: 0;
      }
      .ant-tabs-ink-bar {
        background: none !important;
      }
      .ant-tabs-tab {
        padding: 0 10px !important;
        border-radius: 8px 8px 0px 0px;
        margin: 0;
        margin-right: 4px;
        background: #0762f7;

        &.ant-tabs-tab-active {
          color: #172b4d;
          background: white;
          border-top: 2px solid red;
          .ant-tabs-tab-btn {
            color: #172b4d !important;
            /* font-weight: 700 !important; */
          }
        }
        .ant-tabs-tab-btn {
          padding: 0 10px;
          font-family: Nunito Sans;
          font-weight: normal !important;
          font-style: normal !important;
          font-size: 14px !important;
          color: white !important;
        }
      }
    }
  }
  .ant-tabs-content-holder {
    min-height: calc(100vh - 189px);
    max-height: calc(100vh - 189px);
    overflow: hidden;
    background: #ffffff;
    /* border-radius: 20px 0px 0px 0px; */
    /* border-top: 4px solid #3984ff; */
    .ant-tabs-content-top {
      background: linear-gradient(
          0deg,
          rgba(255, 255, 255, 0.5),
          rgba(255, 255, 255, 0.5)
        ),
        #0762f7;
      border-radius: 20px 0px 0px 0px;

      background: #fff;
      padding: 0.5rem 0 0.75rem;
      min-height: calc(100vh - 189px);
      max-height: calc(100vh - 189px);
      display: flex;
    }
  }
  .button-bottom-modal {
    margin-left: auto;
    text-align: right;
    position: absolute;
    bottom: 0;
    right: 0;
    margin: 20px;
    .button-cancel {
      margin-right: 18px;
      background: #ffffff;
      width: 100px;
      border: 1px solid #7a869a;
      @media (max-width: 1366px) {
        margin-right: 0.5em;
      }
    }
    .button-cancel:hover {
      background: #7a869a;
      color: #fff;
    }
    .button-ok {
      background: #0762f7;
      color: white;
      width: 100px;
    }
    .button-ok:hover {
      background: #054ab9;
    }
    button {
      height: auto;
      padding: 5px 5px;
      border-radius: 8px;
      border: 1px solid #0762f7;
      /* box-shadow: 0px 3px 0px #03317c; */
      font-weight: 600;
      font-size: 16px;
      color: #172b4d;
      @media (max-width: 1366px) {
        font-size: 14px;
        padding: 4px 20px;
      }
    }
    .button-header {
      padding: 20px;
    }
  }
  .ant-tabs-content {
    /* padding: ${(props) => (props.isNotBorder ? null : "2rem 0")}; */

    > div {
      padding: ${(props) => (props.isNotBorder ? null : "1.25rem")};
    }
  }
  .ant-tabs .ant-tabs-content .ant-tabs-tabpane > div {
    /* height: auto !important; // NOTE check again */
  }
  .ant-tabs-tabpane {
    overflow: auto;
  }
  .multi-bottom-btn {
    position: absolute;
    bottom: 0.75rem;
    right: 0.75rem;
    gap: 0.75rem;
    /* padding: .5rem; */
    > div {
      display: flex;
    }
  }
`;
