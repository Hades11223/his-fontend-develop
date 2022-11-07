import styled, { createGlobalStyle } from "styled-components";
import { Page } from "components";
export const GlobalStyle = createGlobalStyle`

  .app-main{
    overflow: scroll !important;
  }
`;
export const MainPage = styled(Page)`
  & .main-page {
    font-family: Nunito Sans;
    margin: auto;
    background: #f4f5f7;
    max-width: 100%;
    padding: 0 16px 16px;
    margin-top: 16px;

    & .page-body {
      flex-direction: column;
      padding: 0;
      .ant-select {
        .ant-select-selection-item {
          text-align: center;
        }
        .ant-select-item-option-content {
          font-family: Nunito Sans;
          color: #172b4d !important;
        }
      }
    }
    & .mn-card {
      flex: 1;
      margin-top: 8px;
      margin-bottom: 0;
      display: flex;
      flex-direction: column;
      width: 100%;
    }
  }
  .ant-select-dropdown {
    .ant-select-item-option-content {
      font-family: Nunito Sans;
      color: #172b4d;
    }
  }

  & .row-selected {
    background: none !important;
    background-color: #c0f1da !important;
  }

  .ic-action {
    margin: 0 5px;
    font-size: 24px;
  }
`;
