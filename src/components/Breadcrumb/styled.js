import styled from "styled-components";
const Main = styled("div")`
  max-width: 100%;
  .container {
    font-family: Nunito Sans, sans-serif;
    padding: 0 40px 34px 40px;
    .home {
      &-breadcrumbs {
        height: ${(p) => (p.height || 41) + "px"};
        margin: 6px 0px;
        width: 100%;
        font-weight: 600;
        font-size: 13px;
        line-height: 20px;
        display: flex;
        color: #7a869a;
        /* cursor: pointer; */
        span {
          background: rgba(255, 255, 255, 0.0001);
          padding: 0 2px;
          color: #0762f7;
          cursor: pointer;
        }
        label {
          font-weight: 600;
          display: inline-block;
        }
        .link {
          cursor: pointer;
        }
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
        /* .ant-tabs-tab {
          padding: 7.5px 0 !important;
          .ant-tabs-tab-btn {
            color: #42526e;
            font-weight: 600;
            font-size: 14px;
            font-family: SF Pro Text, sans-serif;
            line-height: 16px;
            text-transform: uppercase;
          }
        } */
        /* .ant-tabs-tab-active {
          .ant-tabs-tab-btn {
            color: #ef4066;
          }
        } */
        /* .ant-tabs-ink-bar {
          background: #ef4066;
        } */
      }
    }
    .main__container {
      margin-top: 14px;
    }
  }
`;

export { Main };
