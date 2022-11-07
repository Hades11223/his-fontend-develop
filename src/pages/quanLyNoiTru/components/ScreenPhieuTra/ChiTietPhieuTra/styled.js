import styled from "styled-components";

export const Main = styled.div`
  font-family: "Nunito Sans";
  font-size: 14px;
  background-color: #f3f4f7;
  display: flex;
  flex-direction: column;
  height: 100%;

  .main-page {
    margin-top: -25px;
    display: flex;
    flex-direction: column;
    height: calc(100vh - 100px);
    overflow-y: hidden;
    .mn-card {
      overflow: initial;
    }
    .wrap-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      /* overflow-y: auto; */
      .ant-tabs-top {
        .ant-tabs-nav {
          margin-bottom: 8px;
        }
      }

      .tab-content {
        flex: 1;
        margin-bottom: 0;
        padding-bottom: 10px;
      }
    }
  }
  & .item-select {
    & .label {
      margin-bottom: 5px;
      line-height: 17px;
    }
  }

  .body {
    /* background: #F4F5F7; */
    font-family: "Nunito Sans" !important;
    position: relative;
  }
  .bg-color {
    background: #f4f5f7;
  }

  & .footer-btn {
    display: flex;
    padding: 0px 40px;
    margin: 10px 0;
    justify-content: end;
  }
  .wrapper-title {
    display: flex;
    .header-action {
      margin-left: 8px;
      display: flex;
      .action-btn {
        margin-left: 5px;
        cursor: pointer;
      }
    }
  }
  .ant-tabs-nav-list {
    .ant-tabs-tab {
      padding: 11px 16px;
      margin: 0;
      .ant-tabs-tab-btn {
        color: #7a869a;
        font-size: 16px;
      }
      &.ant-tabs-tab-active {
        .ant-tabs-tab-btn {
          font-weight: 700;
          color: #172b4d;
        }
      }
    }
    .ant-tabs-ink-bar {
      background: #0762f7;
    }
  }
`;
