import styled, { createGlobalStyle } from "styled-components";
export const GlobalStyle = createGlobalStyle`
    .ant-message {
      position: relative;
      .ant-message-notice{
        position: absolute;
        bottom: 20px;
        right: 0;
      }
    }
`;
const Main = styled.div`
  box-shadow: ${(props) => (props.border ? "0px 0px 0px 2px red" : null)};
  background-color: #ffffff;
  border: ${(props) => (props.border ? "1px solid #f0f0f0" : null)};
  box-shadow: ${(props) =>
    props.border
      ? "0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.31) "
      : null};
  border-radius: ${(props) => (props.border ? "16px" : "16px 0 16px 16px")};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
  /* height: 100%; */
  /* background: #03317c; */
  @media (max-width: 1199px) {
    margin-top: 1.5em;
  }
  fieldset {
    width: 100%;
  }
  .header-create {
    background: #fff;
    border-radius: 16px 16px 0 0;
    height: min-content;
    width: 100%;
    padding: 10px 26px 10px;
    display: flex;
    align-items: center;
    min-height: 54px;

    .create-title {
      font-size: 20px;
      line-height: 24px;
      color: #172b4d;
      font-weight: bold;
      // @media (max-width: 1366px) {
      //   font-size: 18px;
      // }
    }
  }
  & .create-body {
    overflow: auto;
    // z-index: -10;
    border-top: ${(props) => (props.border ? "1px solid #e7e9ed" : null)};
    flex: 1;
    padding-top: 4px;
    background: #ffffff;
    min-height: auto !important;
    max-height: auto !important;
    &.version-1 {
      overflow-y: scroll;
      height: 500px;
      min-height: unset !important;
      max-height: unset !important;
      .ant-row {
        max-height: unset !important;
      }
    }
    > div {
      background: #ffffff;
      border-radius: 20px 0px 0px 0px;
      margin-top: 4px;
      overflow: auto;
      form {
        padding: 1rem 10px;
      }
    }
    .hidden-arrow {
      /* Chrome, Safari, Edge, Opera */
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }

    /* Firefox */
    input[type="number"] {
      -moz-appearance: textfield;
    }
    .item {
      margin-bottom: 12px;
      padding-right: 0.75rem;
      padding-left: 0.75rem;
      font-size: 14px;
      line-height: 20px;
      font-weight: 600;
      color: #172b4d;
      .ant-select {
        width: 100%;
        background: #fff0;
        border: 2px solid #e0e0e0;
        border-radius: 6px;
        .ant-select-selection-placeholder,
        .ant-select-selection-item {
          color: #172b4d87;
          font-size: 16px;
          font-weight: 600;
        }
        .ant-select-selection-search {
          input {
            color: #172b4d;
            font-size: 16px;
            font-weight: 600;
          }
        }
        .ant-select-selection-item {
          color: #172b4d !important;
        }
      }
      label {
        margin-bottom: 4px;
        line-height: 20px;
        font-weight: 600;
        color: #172b4d;
      }
      .ant-checkbox-wrapper {
        margin-right: 5pt;
      }
      .select-option {
        width: 100%;
        background: #fff0;
        border: 2px solid #e0e0e0;
        box-sizing: border-box;
        border-radius: 6px;
      }
      .ant-select-selector {
        background: #fff0;
        font-weight: 500;
        color: #2f3035;
        border: none;
      }
      .ant-select:not(.ant-select-disabled):hover .ant-select-selector {
        border: none;
      }
      .ant-input:focus,
      .ant-input-focused {
        border: none;
      }
      .ant-input:hover {
        border: none;
        box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
      }
      > input {
        font-weight: 600;
        height: 35px;
        background: #fff0;
        font-size: 16px;
        &::placeholder {
          color: #172b4d87;
          font-size: 16px;
        }
      }
      textarea {
        font-weight: 600;
        font-size: 16px;
        border: 2px solid rgba(23, 43, 77, 0.1);
        box-sizing: border-box;
        border-radius: 3px;
        color: #172b4d;
        &::placeholder {
          font-size: 16px;
          color: #172b4d87;
        }
      }
    }
    .checker {
      font-size: 16px;
      line-height: 20px;
      font-weight: 500;
      color: #727272;
      &-box {
        font-size: 16px;
        line-height: 20px;
        font-weight: 500;
        color: #727272;
      }
    }
  }
  & .form-custom {
    display: flex;
    flex-wrap: wrap;
    .ant-form-item {
      width: 49%;
      margin-bottom: 12px;
      padding-right: 0.75rem;
      padding-left: 0.75rem;
      font-weight: 600;
      color: #172b4d;
      .ant-form-item-label {
        label {
          line-height: 16px;
          font-size: 14px;
          padding: 0 !important;
        }
      }
      .ant-select {
        width: 100%;
        background: #fff0;
        border: 2px solid #e0e0e0;
        border-radius: 6px;
        .ant-select-selection-placeholder,
        .ant-select-selection-item {
          color: #172b4d87;
          font-size: 16px;
          font-weight: 600;
        }
        .ant-select-selection-search {
          input {
            color: #172b4d;
            font-size: 16px;
            font-weight: 600;
          }
        }
        .ant-select-selection-item {
          color: #172b4d !important;
        }
      }
      textarea {
        font-weight: 600;
        font-size: 16px;
        border: 2px solid rgba(23, 43, 77, 0.1);
        box-sizing: border-box;
        border-radius: 3px;
        color: #172b4d;
        min-height: 120px;
        &::placeholder {
          font-size: 16px;
          color: #172b4d87;
        }
      }
      .input-option {
        width: 100%;
        font-weight: 600;
        font-size: 16px;
        color: #172b4d;
        width: 100%;
        &::placeholder {
          font-size: 16px;
          color: #172b4d87;
        }
      }
      label {
        margin-bottom: 4px;
        line-height: 16px;
        font-size: 14px;
        font-weight: 600;
        color: #172b4d;
        &.ant-form-item-required {
          &:after {
            display: inline-block;
            margin-right: 4px;
            color: red;
            font-size: 16px;
            font-weight: 600;
            font-family: inherit;
            line-height: 1;
            content: "*";
          }
          &:before {
            display: none;
          }
        }
      }
      input {
        ::placeholder {
          line-height: 20px;
          color: #7a869a;
          font-size: 16px;
          font-weight: 600;
        }
      }
      .ant-checkbox-wrapper {
        margin-right: 5pt;
      }
      .select-option {
        width: 100%;
        background: #fff0;
        border: 2px solid rgba(23, 43, 77, 0.1);
        box-sizing: border-box;
        border-radius: 3px;
      }
      .ant-select-selector {
        background: #fff0;
        font-weight: 500;
        color: #2f3035;
        border: none;
      }
      .ant-select:not(.ant-select-disabled):hover .ant-select-selector {
        border: none;
      }
      .ant-input:focus,
      .ant-input-focused {
        border: none;
      }
      .ant-input:hover {
        border: none;
        box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
      }
      .input-option {
        width: 100%;
        font-weight: 600;
        min-height: 35px;
        background: #fff0;
        border: 2px solid rgba(23, 43, 77, 0.1);
        box-sizing: border-box;
        border-radius: 3px;
      }
      .ant-picker {
        width: 100%;
        font-weight: 600;
        height: 35px;
        background: #fff0;
        border: 2px solid rgba(23, 43, 77, 0.1);
        box-sizing: border-box;
        border-radius: 3px;
        &:hover {
          border: none;
          box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
        }
      }
    }
    &--one-line {
      display: block;
      .ant-row {
        width: 100% !important;
      }
      .ant-form-item {
        width: 100%;
      }
    }
  }
  & .button-bottom-modal {
    display: flex;
    margin: 10px;
    justify-content: flex-end;
  }
`;

export { Main };
