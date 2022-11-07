import styled, { createGlobalStyle } from "styled-components";
import { Col } from "antd";

export const Main = styled(Col)`
  display: flex;
  flex-direction: column;
  & .info {
    flex: 1;
  }
  &.container {
    font-family: Nunito Sans !important;
    padding: 10px;
    width: 100%;
    .row_paid {
      align-items: center;
      justify-content: space-between;
      display: flex;
    }
    .hr {
      margin: 5px -10px 5px;
      border: 0;
      border-top: 1px solid #c9c7c7;
    }
    .title {
      font-size: 16px;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .title-1 {
      font-size: 14px;
      line-height: 30px;
      margin-top: 10px;
    }
    .title-2 {
      font-size: 14px;
      line-height: 28px;
      /* margin-top: 10px; */
      display: flex;
    }
    .select-row-1 {
      margin-bottom: 5px;
      .ant-select {
        margin-top: 4px;
        width: 100%;
      }
    }
    .select-row-2 {
      justify-content: space-between;
    }
    .title-item {
      font-size: 16px;
      font-weight: 400;
      margin-top: 5px;
    }
    .textarea {
      width: 100%;
      height: 25px;
      margin-bottom: 10px;
    }

    & .col-action {
      display: flex;
      justify-content: center;
      align-items: center;
      & img {
        width: 16px;
        height: 16px;
      }
    }
  }
  .ant-table-placeholder {
    // display: none;
    .ant-table-cell {
      height: 278px;
    }
  }
  .select-row-last {
    justify-content: space-between;
    margin-top: 10px;
    &.cancle {
      justify-content: flex-end;
    }
  }

  .maChuanChi {
    font-size: 12px;
  }

  .row_paid_right {
    text-align: end;
  }
`;
export const GlobalStyle = createGlobalStyle`
  .wrap-button{
    button{
      margin-top: 10px
    }
  }
  .nha-thuoc-print-popover{
    .ant-popover-inner-content{
      padding : 0px !important;
      .title-child{
        padding: 2px 15px;
        margin-bottom: 0px;
        cursor: pointer;
        &:hover{
          background: #c1f0db;
        }
      }
    }
  }
  .main-page .flexc .flex2{
    max-height: calc(100vh - 270px);
    min-height: calc(100vh - 270px);
    overflow-y: scroll;
  }
`;
