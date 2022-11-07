import styled from "styled-components";

const Main = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  .children {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: auto;
  }
  .action-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0.75rem 0 0.5rem;
    &-custom {
      margin-bottom: 15px;
    }
    .title {
      font-weight: 500;
      font-size: 24px;
      color: #172b4d;
      margin-right: 20px;
    }
    .align-center {
      display: flex;
      align-items: center;
      width: 100%;
      justify-content: space-between;
    }
    .mrl-5 {
      margin-left: 17px;
    }
  }
  .form-custom {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
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
      .ant-input-number {
        width: 100%;
        height: 35px;
        background: #fff0;
        border: 2px solid #e0e0e0;
        border-radius: 6px;
        .ant-input-number-input {
          color: #172b4d;
          font-size: 16px;
          font-weight: 600;
          &::placeholder {
            color: #7a869a;
          }
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
        &::placeholder {
          font-size: 16px;
          color: #172b4d87;
        }
      }
      .input-option {
        font-weight: 600;
        font-size: 16px;
        color: #172b4d;
        &::placeholder {
          font-size: 16px;
          color: #172b4d87;
        }
      }
      label {
        margin-bottom: 4px;
        line-height: 20px;
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
        input {
          font-weight: 600;
          font-size: 16px;
          color: #172b4d;
          &::placeholder {
            color: #7a869a;
          }
        }

        &:hover {
          border: none;
          box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
        }
      }
      .ant-checkbox + span {
        font-weight: 600;
        font-size: 14px;
        line-height: 20px;
        color: #172b4d;
      }
    }
  }

  .form-custom-new {
    display: flex;
    flex-wrap: wrap;
    justifycontent: space-between;
    .ant-row {
      width: 100%;
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
      .ant-input-number {
        width: 100%;
        height: 35px;
        background: #fff0;
        border: 2px solid #e0e0e0;
        border-radius: 6px;
        .ant-input-number-input {
          color: #172b4d;
          font-size: 16px;
          font-weight: 600;
          &::placeholder {
            color: #7a869a;
          }
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
        &::placeholder {
          font-size: 16px;
          color: #172b4d87;
        }
      }
      .input-option {
        font-weight: 600;
        font-size: 16px;
        color: #172b4d;
        &::placeholder {
          font-size: 16px;
          color: #172b4d87;
        }
      }
      label {
        margin-bottom: 4px;
        line-height: 20px;
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
        input {
          font-weight: 600;
          font-size: 16px;
          color: #172b4d;
          &::placeholder {
            color: #7a869a;
          }
        }

        &:hover {
          border: none;
          box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
        }
      }
      .ant-checkbox + span {
        font-weight: 600;
        font-size: 14px;
        line-height: 20px;
        color: #172b4d;
      }
    }
  }
  & .bottom-actions {
    display: flex;
    align-items: center;
    & .left-actions {
      flex: 1;
    }
    & .button-bottom-modal {
      display: flex;
      flex: unset;
      margin: 10px;
      position: unset;
    }
  }
`;

export { Main };
