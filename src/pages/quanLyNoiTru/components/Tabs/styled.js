import styled, { createGlobalStyle } from "styled-components";
import { Tabs } from "antd";
export const Main = styled(Tabs)`
  height: 100%;
  & .ant-tabs-nav {
    height: 38px;
    margin-bottom: 0;
    & .ant-tabs-tab {
      & .ant-tabs-tab-btn {
        font-style: normal;
        color: #7a869a;
        text-transform: none;
        font-family: "Nunito Sans";
        padding: 10px !important;
        margin: 0px !important;
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;
      }
    }
    & .ant-tabs-tab-active {
      background: #fff !important;
      & .ant-tabs-tab-btn {
        font-family: "Nunito Sans";
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 22px;
        color: #0762f7 !important;
      }
    }
    & .ant-tabs-ink-bar {
      background: linear-gradient(
          0deg,
          rgba(0, 0, 0, 0.25),
          rgba(0, 0, 0, 0.25)
        ),
        #0762f7;
      height: 3px;
    }
  }
`;

export const MainTabLeft = styled(Tabs)`
  &.ant-tabs {
    height: 100%;
    & > .ant-tabs-nav {
      background-color: #fff;
      & .ant-tabs-nav-list {
        width: ${(props) => props.tabWidth || 220}px;
      }
      & .ant-tabs-tab {
        margin-top: 0 !important;
        &:first-of-type {
          display: none;
        }
        background: #ffffff;
        border: none;
        margin: 0;
        height: 40px;
        margin-bottom: 5px;
        & .ant-tabs-tab-btn {
          font-family: "Nunito Sans";
          font-style: normal;
          font-weight: 400;
          font-size: 16px;
          line-height: 22px;
          text-transform: none;
          color: #172b4d !important;
          & > div {
            display: flex;
            align-items: center;
            & > svg,
            & > img {
              margin-right: 5px;
              font-size: 24px;
              width: 24px;
            }
          }
        }
        &:hover {
          background-color: rgb(193, 240, 219) !important;
        }
      }
      & .ant-tabs-tab-active {
        background: #cdddfe !important;
        border-radius: 4px 0px 0px 4px;
        & .ant-tabs-tab-btn {
          font-family: "Nunito Sans";
          font-style: normal;
          font-weight: 700;
          font-size: 16px;
          line-height: 22px;
          color: #172b4d !important;
        }
      }
    }
    & .ant-tabs-content {
      max-height: 100%;
      overflow: auto;
    }
    & > .ant-tabs-content-holder {
      & .ant-tabs-tabpane {
        padding: 10px !important;
        & > div {
          height: 100%;
        }
      }
    }
  }
  & .tab-content-header {
    font-family: "Nunito Sans";
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
    margin: 12px 16px;
    display: flex;
    align-items: center;
  }
`;

export const GlobalStyle = createGlobalStyle`
  & .tab-left-popup-style{
    & li.ant-tabs-dropdown-menu-item{
      & span {
        & > div{
          display: flex;
          align-items: center;
          & > svg, & img{
            margin-right: 5px;
            font-size: 24px;
          }
        }
      }
    }
  }
`;
