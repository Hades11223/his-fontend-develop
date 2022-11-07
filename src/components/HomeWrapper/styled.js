import styled from "styled-components";
const Main = styled("div")`
  height: 100%;
  overflow: hidden;
  .container {
    font-family: Nunito Sans, sans-serif;
    padding: 10px 16px;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .home {
      &-breadcrumbs {
        margin: 6px 0px 0px 0px;
        width: 100%;
        font-weight: 600;
        font-size: 13px;
        line-height: 20px;
        color: #7a869a;
        cursor: pointer;
        span {
          background: rgba(255, 255, 255, 0.0001);
          padding: 0 8px;
          color: #0762f7;
        }
        .item-link {
          padding: 0;
        }
        label {
          font-weight: 600;
          color: #0762f7;
          display: inline-block;
          cursor: pointer;
        }
        span:last-child {
          label {
            color: #7a869a;
          }
        }
      }
    }
    & .home-child {
      overflow: hidden;
      padding: 5px;
      flex: 1;
      & > .ant-col:first-of-type {
        height: 100%;
        overflow: hidden;
        display: flex;
        flex-direction: column;
      }
    }
  }
  .title-parentChild {
    font-family: SF Pro Text, sans-serif;
    font-weight: 500;
    font-size: 24px;
    line-height: 30px;
    color: #172b4d;
    padding-bottom: 13px;
  }
  .ant-tabs {
    .ant-tabs-nav {
      margin-bottom: 14px;
      .ant-tabs-nav-list {
        .ant-tabs-tab {
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
          .ant-tabs-tab-btn {
            color: #ef4066;
          }
        }
        .ant-tabs-ink-bar {
          background: #ef4066;
        }
      }
    }
    .main__container {
      margin-top: 14px;
    }
  }
`;

export { Main };
