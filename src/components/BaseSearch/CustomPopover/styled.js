import styled, { createGlobalStyle } from "styled-components";
import { Popover } from "antd";

export const GlobalStyle = createGlobalStyle`
  .popover-base-search{

    padding-top: 0;

    .ant-popover-arrow{
      display: none !important;
    }
    .ant-picker-range{
      border: 0 !important;
    }
    .ant-popover-inner-content{
      padding: 5px 10px;
    }
    .input-filter {
      position: relative;
    }
    & .ant-select{
      padding-top: 2px !important;
      & .ant-select-selection-search{
        left: 0px;
      }
    }
  }
`;

export const SearchDate = styled.div`
  display: inline-block;
  position: relative;
  input {
    color: #7a869a;
    font-family: Nunito Sans;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    width: 232px;
    height: 40px;
    border: 1px solid #dfe1e6;
    padding-left: 10px;
  }
`;

export const Main = styled.div`
  .content-popover {
    max-width: 290px;
    min-width: 200px;
    .ant-select {
      width: 100%;
      border-bottom: 1px solid #d9d9d9;
      height: 40px;
      & .ant-select-selection-overflow {
        flex-wrap: unset;
        overflow: hidden;
        padding-top: 10px;
      }
    }
    .date {
      border-bottom: 1px solid #d9d9d9;
      .ant-picker {
        width: 100%;
        height: 40px;
        padding: 10px 0px 0px 0px;
        .ant-picker-borderless {
          border-bottom: 1px solid #d9d9d9;
        }
      }
      label {
        padding-top: 5px;
      }
    }
    .select {
      label {
        padding-top: 5px;
      }
    }
    .date-1 {
      border-bottom: 1px solid #d9d9d9;
      position: relative;
      margin-top: 10px;
      .ant-picker {
        width: 100%;
        /* height: 40px; */
        padding: 10px 0px 0px 0px;
        .ant-picker-borderless {
          border-bottom: 1px solid #d9d9d9;
        }
      }
      label {
        /* padding-top: 5px; */
      }
      .ant-picker-active-bar {
        opacity: 0;
      }
      .ant-picker-input:first-child {
        width: 150px;
      }
    }
    .ant-input,
    .ant-input-number {
      width: 100%;
      height: 40px;
      padding: 0 5px;
    }
    & .ant-input-number-input-wrap {
      height: 100%;
      & .ant-input-number-input {
        height: 100%;
        padding: 0;
      }
    }
    .ant-input-number-handler-wrap {
      display: none;
    }
    .ant-select.ant-select-borderless.ant-select-single.ant-select-allow-clear.ant-select-show-arrow.ant-select-show-search {
      padding-top: 10px;
      padding-left: 0px;
    }

    .ant-select-multiple .ant-select-selection-placeholder {
      top: 70%;
      right: 0;
      left: 0;
    }

    & .bottom-action {
      margin-top: 10px;
      display: flex;
      justify-content: flex-end;
    }
    & .ant-select-selector {
      padding: 0;
    }

    .number-range {
      .content {
        display: flex;

        align-items: center;

        .ant-input-number {
          flex: 1;
          border-bottom: 1px solid #d9d9d9;
        }
        span {
          width: 20px;
          text-align: center;
        }
      }
    }
  }
`;

export const PopoverStyled = styled(Popover)``;
