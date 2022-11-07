import styled from "styled-components";
export const WrapperStyledForm = styled.div`
  min-width: 0;
  margin: 0;
  padding: 0;
  border: 0;
  height: 100%;
  width: 100%;
  flex: 1;
  overflow: auto;
  & > fieldset {
    & > .ant-form {
      max-height: 100%;
      overflow: hidden;
      & .main-table-wrapper {
        height: 100%;
      }
    }
  }

  .form-custom {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    &--one-line {
      display: block;
      .ant-row {
        width: 100% !important;
      }
    }
    .ant-row {
      width: ${(props) => props.widthItem}%;
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
        /* border: 2px solid #e0e0e0; */
        /* border-radius: 6px; */
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
        /* border: none; */
      }
      .ant-select:not(.ant-select-disabled):hover .ant-select-selector {
        border: none;
      }
      .ant-input:focus,
      .ant-input-focused {
        border: none;
      }
      .ant-input:hover {
        /* border: none; */
        /* box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2); */
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
`;

export const Main = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  .ant-checkbox-wrapper {
    margin-top: 36px;
  }
  .ant-input-number {
    width: 100%;
  }
  .action-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 20px;
    margin-bottom: 10px;
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
    .btn {
      outline: 0;
      border: 0;
      font-family: Nunito Sans;
      padding: 7px 15px;
      height: auto;
      font-size: 16px;
      font-weight: 600;
    }
    .btn-added {
      color: #ffffff;
      background: #049254;
      /* box-shadow: 0px 3px 0px #026138; */
      border-radius: 8px;
      margin-right: 10px;
      :hover {
        background: #05c270;
      }
    }
    .btn-cancel {
      color: #172b4d;
      background: #ffffff;
      border: 1px solid #0762f7;
      box-shadow: 0px 3px 0px #03317c;
      border-radius: 8px;
    }

    .btn-save {
      color: #ffffff;
      background: #08cfde;
      box-shadow: 0px 3px 0px #03317c;
      border-radius: 8px;
    }
  }

  & .bottom-actions {
    & .left-actions {
      flex: 1;
    }
    & .button-bottom-modal {
      position: unset;
      flex: unset;
      display: flex;
      justify-content: flex-end;
      margin: 10px 20px;
    }
  }
`;
