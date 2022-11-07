import styled, { css, createGlobalStyle } from "styled-components";

export const Main = styled.div`
  background: #03317c;
  box-shadow: 0px 0px 15px rgba(9, 30, 66, 0.07);
  border-radius: 16px;
  font-family: Nunito Sans, sans-serif;
  margin-top: 16px;
  .main__container {
    margin: 0;
  }
  .row-actived {
    background: #c1f0db !important;
  }
  .header-table {
    padding: 5px 10px;
    flex-flow: initial;
    align-items: center;
    &__left {
      font-weight: bold;
      font-size: 18px;
      color: #ffffff;
    }
    &__right {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      font-weight: 600;
      font-size: 14px;
      color: #ffffff;
      margin-left: auto;
      text-align: right;
      flex-wrap: wrap;
    }
    .button-cancel {
      margin-left: 18px;
      background: #ffffff;
      @media (max-width: 1366px) {
        margin-right: 0.5em;
      }
    }
    .button-ok {
      background: #0762f7;

      color: white;
    }
    button {
      height: auto;
      padding: 6px 32px;
      margin: 0 8px;
      border-radius: 8px;
      border: 1px solid #0762f7;
      box-shadow: 0px 3px 0px #03317c;
      font-weight: 600;
      font-size: 16px;
      color: #172b4d;
      @media (max-width: 1366px) {
        padding: 4px 20px;
      }
      :disabled {
        color: rgba(0, 0, 0, 0.25);
        &:visited,
        &:hover,
        &:active {
          outline: none;
        }
      }
    }
    .btn-small {
      padding: 2px 6px;
      margin: 2px;
    }
  }
`;
export const GlobalStyle = createGlobalStyle`
.ant-popover-inner {
    border-radius: 8px 0px 8px 8px;
}
 .ant-checkbox-group {
        width: 160px;
 }
 .ant-checkbox + span {
    padding-left: 20px;
}`;

export const ContentTable = styled.div`
  overflow: hidden;
  border-top: 2px solid #ef4066;
  background: #ffffff;
  border-radius: 16px 0px 0px 0px;
  
  .ant-table-body {
    height: 211px;
    min-height: 211px !important;
    max-height: unset !important;
  }
  .main__container{
    .ant-table-header {
      .ant-table-thead {
        .custome-header {
          .title-box {
            min-height:30px !important;
          }
        }
      }
    }
`;
