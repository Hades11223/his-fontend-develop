import styled, { createGlobalStyle } from "styled-components";
import { Popover } from "antd";

export const Main = styled.div`
  .content-popover {
    max-width: 290px;
    .ant-select {
      width: 100%;
      border-bottom: 1px solid #d9d9d9;
      & .ant-select-selection-overflow {
        flex-wrap: unset;
        overflow: hidden;
      }
    }
    .ant-input-affix-wrapper {
      padding: 0px;
    }
    .date {
      border-bottom: 1px solid #d9d9d9;
      .ant-picker {
        width: 100%;
        padding: 10px 0px 0px 0px;
        .ant-picker-borderless {
          border-bottom: 1px solid #d9d9d9;
        }
      }
      label {
        padding-top: 5px;
      }
    }
    .ant-input,
    .ant-input-number {
      padding: 10px 0px 0px 0px;
      border-bottom: 1px solid #d9d9d9;
      width: 100%;
    }
    .ant-input-number-handler-wrap {
      display: none;
    }
    .ant-select.ant-select-borderless.ant-select-single.ant-select-allow-clear.ant-select-show-arrow.ant-select-show-search {
      padding-left: 0px;
    }

    .ant-select-show-search.ant-select:not(.ant-select-customize-input)
      .ant-select-selector {
      padding: 0px !important;
    }
    .ant-select-multiple .ant-select-selection-placeholder {
      top: 70%;
      right: 0;
      left: 0;
    }
    .btn-search {
      display: flex;
      padding-top: 15px;
      .ant-btn {
        margin-left: auto;
        background: #0762f7;
        border: 1px solid rgba(0, 0, 0, 0.103176);
        box-sizing: border-box;
        border-radius: 8px;
        width: 91px;
        color: #fff;
        font-family: Lato;
        font-style: normal;
        font-weight: bold;
        font-size: 14px;
        line-height: 17px;
      }
      img {
        padding-right: 10px;
      }
    }
  }
`;
export const GlobalStyle = createGlobalStyle`
& .custom-popover{
  &.ant-popover-placement-bottomLeft {
    padding-top: 30px;
  }

  .ant-popover-arrow {
      display: none;
  }
}
`;

export const PopoverStyled = styled(Popover)``;
