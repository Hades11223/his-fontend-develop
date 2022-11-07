import styled, { createGlobalStyle } from "styled-components";
export const Main = styled.div`
  padding-top: 265px;
  .ant-row {
    font-family: Nunito Sans;
    font-style: normal;
    display: flex;
    justify-content: center;
    .top {
      font-weight: 900;
      font-size: 58.7755px;
      line-height: 80px;
      text-align: center;
      color: #0762f7;
    }
    .middle {
      font-weight: normal;
      font-size: 52px;
      line-height: 71px;
      /* identical to box height */

      text-align: center;

      /* /#172B4D (Màu chữ chính) */

      color: #172b4d;
    }
    .bottom {
      padding-top: 20px;
      font-weight: 900;
      font-size: 44px;
      line-height: 45px;
      /* identical to box height, or 103% */

      text-align: center;

      /* /#172B4D (Màu chữ chính) */

      color: #172b4d;
    }
    .ant-select {
      width: 1020px;
      margin-top: 20px;
      max-width: 90%;
      .ant-select-selector {
        height: 114px;
        .ant-select-selection-placeholder {
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: Nunito Sans;
          font-style: normal;
          font-weight: 600;
          font-size: 44px;
          line-height: 45px;
          /* identical to box height, or 103% */

          text-align: center;

          /* #7A869A (Màu chữ phụ) */

          color: #7a869a;
        }
      }
      .ant-select-selection-item {
        font-weight: 600;
        font-size: 44px;
        line-height: 45px;
        display: flex;
        align-items: center;
        overflow: hidden;
      }
      .ant-select-arrow {
        font-size: 30px;
        right: 30px;
      }
    }
  }
 
`;

export const GlobalStyle = createGlobalStyle`
 & .modal-select {
    & .ant-select-item-option {
      font-size: 50px;
      line-height: inherit;
    }
  }
`;
