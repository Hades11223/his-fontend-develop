import styled from "styled-components";
import { Page } from "components";
export const Main = styled.div`
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .button-action {
    display: flex;
    justify-content: end;
    padding: 5px;
    margin-top: -15px;
  }
  svg {
    &.red {
      path {
        fill: #fc3b3a;
      }
    }
    &.blue {
      path {
        fill: #0762f7;
      }
    }
  }
`;

export const WrapperPage = styled(Page)`
  .wrapper-header-container {
    height: 45px;
  }
  .main-page {
    .header-page {
      background-color: white;
      padding: 4px 10px;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      button {
        &.ant-btn {
          height: 36px;
        }
      }
    }
    .page-body {
      background-color: white;
      padding: 0;
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
    }
  }
`;

export const WrapperPopup = styled.div`
  min-width: 400px;
  color: black;
  padding: 10px;
  .title-pop {
    font-weight: 500;
    margin-bottom: 10px;
  }
  .pop-content {
    display: flex;
    flex-wrap: wrap;
    .item-pop {
      margin: 3px 0;
      width: 50%;
    }
  }
`;
