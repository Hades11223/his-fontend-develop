import { Page } from "components";
import styled from "styled-components";
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
    & .header-page {
      & .title-category {
        margin-bottom: 0px;
      }
    }
    & .page-body {
      padding: 0;
      margin: 10px 1px;
    }
  }
`;
export const Main = styled.div`
  width: 100%;
  height: 100%;
  background: #f4f5f7;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  & .main-body {
    flex: 1;
    overflow: auto;
    margin-bottom: 16px;
  }
  .container {
    padding: 0 8px !important;
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
    background: #fff;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  h1 {
    font-family: "Nunito Sans";
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
  }
  .container {
    .button {
      display: flex;
      .button-left {
        display: flex;
      }
      .button-right {
        margin-left: auto;
        display: flex;
      }
    }
  }
  .ant-tabs-content-holder {
    border: 3px solid #cdddfe;
  }
  .action-bottom {
    display: flex;
    padding-bottom: 1px;
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
