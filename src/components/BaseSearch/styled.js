import styled, { createGlobalStyle } from "styled-components";
export const GlobalStyle = createGlobalStyle`
  .popover-modal-date-custom-position{
    top: 133px !important;
    left: 60px !important;
  }
`;
export const Main = styled.div`
  padding-bottom: 0 !important;
  /* height: 100%; */
  width: 100%;
  /* padding: 20px 15px 36px; */
  .title {
    display: flex;
    width: 100%;
    .left {
      font-family: Nunito Sans;
      font-style: normal;
      font-weight: bold;
      font-size: 20px;
      line-height: 24px;
    }
    .right {
      margin-left: auto;
    }
  }
  .base-search-group-filter {
    padding-top: 10px;
    justify-content: space-between;
    & .filter {
      display: flex;
      align-items: center;
      & svg.icon {
        width: 20px;
        height: 20px;
      }
    }
  }
  .array-store {
    display: flex;
    padding-top: 5px;

    .item {
      background: linear-gradient(
          0deg,
          rgba(255, 255, 255, 0.75),
          rgba(255, 255, 255, 0.75)
        ),
        #0762f7;
      border-radius: 3px;
      margin-right: 6px;
      min-width: 100px;
      padding: 0px 5px 0px 5px;
      display: flex;
      img {
        object-fit: contain;
        margin-left: auto;
      }
    }
  }
  .header {
    flex-flow: initial;
    align-items: center;
    color: #ffffff;
    &__left {
      font-family: Nunito Sans;
      font-style: normal;
      font-weight: bold;
      font-size: 18px;
      line-height: 24px;
      text-align: center;
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      flex: 1;
      img {
        padding-left: 10px;
      }
      .btn-show {
        background: linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.5),
            rgba(0, 0, 0, 0.5)
          ),
          #0762f7;
        border: 0px;
      }
    }
    &__right {
      margin-left: 10px;
      flex: unset;
      text-align: right;
      .btn_new {
        background: #049254;
        width: 139px;
        height: 36px;
      }
      button {
        height: auto;
        margin: 0 8px;
        border-radius: 8px;
        border: 1px solid #049254;
        box-shadow: 0px 3px 0px #03317c;
        font-weight: 600;
        font-size: 16px;
        color: #ffffff;
      }
      img {
        padding: 0px 0px 3px 10px;
      }
    }
  }
  & .ant-input-affix-wrapper {
    border: none;
    outline: none !important;
    margin-right: 2px;
    padding: 0px 5px;
    display: flex;
    align-items: center;
    &:hover {
      border: none;
    }
    &:focus {
      border: none;
      box-shadow: none;
    }
    &-focused {
      box-shadow: none;
    }
    & input {
      outline: none !important;
      border: none !important;
      box-shadow: none !important;
    }
  }
`;
export const SearchKho = styled.div`
  height: 100%;
  .filter {
    height: 40px;
    border-radius: 4px 0px 0px 4px;
    background: rgba(105, 120, 140, 0.1);
    width: 100%;
    span {
      font-family: Nunito Sans;
      font-style: normal;
      font-weight: bold;
      font-size: 14px;
      padding-left: 10px;
      color: #2d3540;
    }
  }
  .ant-select:not(.ant-select-customize-input) .ant-select-selector {
    height: 40px;
    background: rgba(255, 255, 255, 1);
    padding: 0px 11px !important;
  }
  .ant-select-selection-placeholder {
    height: 40px;
    align-items: center;
    display: flex;
    color: #2d3540;
    font-weight: bold;
    padding-top: 0px !important;
  }
  .ant-select-selector {
    .ant-select-selection-item {
      height: 40px;
      align-items: center;
      display: flex;
      color: #2d3540;
      font-weight: bold;
      padding-top: 0px !important;
    }
  }
  & .button-select-checkbox {
    width: 100%;
    height: 100%;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    & > span {
      text-align: left;
      flex: 1;
    }
  }
`;

export const InputSearch = styled.div`
  background: #ffffff;
  border: 1px solid #dfe1e6;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  margin-right: 36px;
  width: 100%;
  height: 40px;

  &:hover {
    box-shadow: 0px 0px 3px 1px #0762f761 !important;
  }

  input {
    padding: 0 1em 0 8.5px !important;
    border: none;
    font-weight: 600;
    font-size: 14px;
    line-height: 19px;
    color: #172b4d;
    height: 100%;

    &::placeholder {
      color: #69788c;
    }
  }
  .icon-search {
    margin: 10px;
    height: 15px;
  }
  .ant-input {
    &:hover,
    &:focus {
      box-shadow: none;
    }
  }
  &.date-range-picker {
    display: grid;
    .ant-picker-range {
      border: none !important;
      box-shadow: none !important;
      padding: 0 10px;
    }
    .range-picker-title {
      font-size: 14px;
      text-align: left;
      padding-left: 20px;
      font-weight: normal;
      height: 19px;
    }
    .ant-picker-range-separator {
      padding: 0 !important;
    }
    .ant-picker-input {
      input {
        padding: 0 5px !important;
      }
    }
    input {
      padding: 0;
    }
  }
`;

export const InputSearch2 = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid #dfe1e6;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  margin-right: 36px;
  width: 100%;
  height: 40px;
  border-radius: 0px 4px 4px 0px;

  input {
    padding: 0 1em 0 8.5px !important;
    border: none;
    font-weight: 600;
    font-size: 14px;
    line-height: 19px;
    color: #172b4d;
    background: rgba(255, 255, 255, 0.1);
    height: 100%;
    border: none;
  }
  .ant-input-disabled {
    color: #2d3540 !important;
  }
  .ic-down {
    margin: 10px;
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
  &.date-option-2 {
    display: grid;
    background: white;
    border: 1px solid #d9d9d9;
    display: flex;
    align-items: center;
    padding: 0 5px;
    & > div {
      flex: 1;
      .title-date {
        font-size: 14px;
        text-align: left;
        padding-left: 5px;
        font-weight: normal;
        height: 19px;
      }
      .input-filter {
        height: 19px;
        input {
          padding: 0;
          font-size: 14px;
          height: 14px;
          border: none;
          outline: none;
          padding-left: 5px;
          color: #172b4d;
        }
      }
    }
  }
  &.date-option {
    position: relative;
    & input {
      padding-right: 30px;
    }
    & svg {
      position: absolute;
      right: 5px;
      top: 10px;
    }
  }
`;
export const PopupWrapper = styled.div`
  height: 100%;
  .ant-checkbox-group {
    width: 200px;
  }
`;
