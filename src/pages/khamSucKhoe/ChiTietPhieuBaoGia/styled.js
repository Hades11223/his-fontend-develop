import styled from "styled-components";
import { Page } from "components";
export const Main = styled.div`
  background: #f4f5f7;
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
  .container {
    padding: 0 8px !important;
  }
  .icon-tab {
    margin-right: 10px;
  }
  .ant-row {
    width: 100%;
  }
  .header-left {
    background: linear-gradient(
        0deg,
        rgba(255, 255, 255, 0.95),
        rgba(255, 255, 255, 0.95)
      ),
      #0762f7;
    /* shadow-khung */

    box-shadow: 0px 0px 15px rgba(9, 30, 66, 0.07);
    border-radius: 8px;
  }
  .content {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
    margin-bottom: 10px;
    & .tab-main {
      overflow: hidden;
    }
  }
  h1 {
    font-family: "Nunito Sans";
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
    &.title {
      display: flex;
      align-items: center;
      & .header-action {
        display: flex;
        & .action-btn {
          cursor: pointer;
          margin-left: 10px;
          color: #0762f7;
          &:first-of-type {
            margin-left: 20px;
          }
        }
      }
    }
  }
  .ant-tabs-content {
    height: 100%;
    overflow-y: scroll;
  }
  .ant-tabs-content-holder {
    border: 3px solid #cdddfe;
  }
  /* end style tabs */
  /* style content tab (right) */
  .action-bottom {
    display: flex;
    .button-left {
      display: flex;
    }
    .button-right {
      margin-left: auto;
      display: flex;
    }
  }
  .footer {
    display: flex;
    justify-content: end;
  }
`;

export const MainPage = styled(Page)`
  & .wrapper-header-container {
    & .top-level-category {
      padding: 0px 10px;
      & .home-breadcrumbs {
        height: 20px;
      }
    }
  }
  & .main-page {
    padding: 0px 16px;
  }
`;
