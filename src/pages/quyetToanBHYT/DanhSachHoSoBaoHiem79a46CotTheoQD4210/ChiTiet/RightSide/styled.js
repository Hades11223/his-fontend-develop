import styled from "styled-components";

export const Main = styled.div`
  .ant-input-disabled{
    border: 2px solid rgba(23,43,77,0.1) !important;
    background: linear-gradient(0deg, rgba(23, 43, 77, 0.25), rgba(23, 43, 77, 0.25)), #FFFFFF !important; 
  }
  .ant-input-number-disabled{
    border: 2px solid rgba(23,43,77,0.1) !important;
    background: linear-gradient(0deg, rgba(23, 43, 77, 0.25), rgba(23, 43, 77, 0.25)), #FFFFFF !important; 
  }
  .ant-tabs-content-top{
    min-height: unset !important; 
    max-height: unset !important;
    height : 500px !important;
  }
  .ant-tabs-content-holder{
    min-height: unset !important; 
    max-height: unset !important;
    height : 500px !important;
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
  .form-custom {
    display: flex;
    flex-wrap: wrap;
    &--one-line {
      display: block;
      .ant-row {
        width: 100% !important;
      }
    }
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
        height: 35px;
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
  }
  .home-table-warrper{
    display : none !important;
  }
  .button-list {
    cursor: pointer;
    color: #0762F7;
    width: fit-content;
    margin-left: auto;
    margin-right: 25px
  }
`;
