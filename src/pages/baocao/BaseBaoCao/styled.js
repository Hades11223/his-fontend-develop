import styled from "styled-components";
import { Page } from "components";
export const Main = styled.div`
  background: #fff;
  width: 100%;
  .ant-row {
    width: 100%;
  }
  .ant-col {
    padding-left: 15px;
    padding-right: 15px;
  }

  .wrapper-layer {
    width: 100%;
    background-color: #ffffff;
    border-radius: 8px;
    display: flex;
    flex: 1;
    flex-direction: column;
    height: 100%;
    .layer-title {
      padding: 10px 10px;
      border-bottom: 1px solid #dfe1e6;
      display: flex;
      align-items: center;
      font-size: 16px;
      line-height: 24px;
      font-weight: 700;
      color: #172b4d;
    }
    .layer-content {
      padding: 3px 10px;
      width: 100%;
      display: flex;
      flex-direction: column;
      height: 100%;
      &-note {
        font-size: 14px;
        line-height: 16px;
        font-weight: 600;
        color: #172b4d;
        padding: 10px;
        margin-bottom: 5px;
        font-style: italic;
      }
      &-main {
        overflow-y: scroll;
        height: 100%;
        &::-webkit-scrollbar {
          display: none;
        }
      }

      &-action {
        height: 40px;
        justify-content: flex-end;
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        & .btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: #172b4d;
          font-size: 14px;
          line-height: 20px;
          font-weight: 600;
          padding: 5px 8px;
          border-radius: 8px;
          border: 1px solid #7a869a;
          cursor: pointer;
          margin-left: 10px;
          & img {
            margin-left: 3px;
          }
          & .btn-red {
            margin-left: 10px;
            color: #ffffff;
            background-color: #ed1c24;
          }
        }
        & .btn-blue {
          margin-left: 10px;
          color: #ffffff;
          background-color: #0762f7;
        }
      }
    }
  }

  .label-filter {
    font-size: 13px;
    font-weight: 600;
    color: #172b4d;
    line-height: 18px;
    &.checkbox-header {
      font-size: 15px;
      flex-direction: row-reverse;
    }
  }
  .input-filter {
    border-radius: 4px !important;
    .ant-select-selection-placeholder,
    .ant-select-selection-item,
    input {
      font-size: 14px !important;
      color: #172b4d !important;
    }
    .ant-select-selection-placeholder {
      color: #7a869a !important;
    }
  }
  .icon-required {
    color: red;
  }
  .ant-select-multiple {
    .ant-select-selector {
      overflow-y: scroll;
    }
  }

  .checkbox-pl {
    display: flex;
    margin-top: 30px;
    .label-filter {
      margin-right: 10px;
    }
  }

  .item-checkbox {
    margin-top: 30px;
  }
`;

export const MainPage = styled(Page)`
  & .main-page {
    & .header-page {
      display: none !important;
    }
  }
`;
