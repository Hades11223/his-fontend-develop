import styled from "styled-components";
import { input, select, date } from "components/mixin";

export const Container = styled.div`
  padding: 0 10px;
  width: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  .ant-row {
    width: 100%;
    .ant-col {
      padding-left: 15px;
      padding-right: 15px;
      /* margin-bottom: 20px; */
      .item-input {
        ${input}
        margin-bottom: 26px;
      }
      .item-date {
        ${date};
        margin-bottom: 26px;
      }
      .item-select {
        ${select};
        margin-bottom: 26px;
      }

      .item-input,
      .item-select {
        .ant-select {
          .ant-select-selector {
            height: 40px;
            .ant-select-selection-placeholder {
              line-height: 40px;
            }
          }
        }
      }
    }
  }

  .note {
    font-size: 14px;
    line-height: 16px;
    padding: 10px;
    padding-bottom: 15px;
  }

  .label-filter {
    font-size: 14px;
    font-weight: 600;
    color: #172b4d;
    line-height: 18px;
    &.checkbox-header {
      font-size: 15px;
      flex-direction: row-reverse;
    }
  }

  .input-filter {
    width: 100%;
    margin-top: 4px !important;
    border-radius: 4px !important;
    min-height: 40px;
    .ant-select-selection-placeholder,
    .ant-select-selection-item,
    input {
      font-size: 14px !important;
      color: #172b4d !important;
    }
    input::placeholder {
      font-size: 13px;
    }
    .ant-select-selection-placeholder {
      color: #7a869a !important;
    }
  }
  .mt-22 {
    margin-top: 22px !important;
  }
  .ant-checkbox-wrapper {
    flex-direction: row-reverse;
    .ant-checkbox + span {
      width: 180px;
    }
  }
  .ant-col:first-of-type {
    padding-left: 15px;
  }
  .ant-select-multiple {
    .ant-select-selector {
      overflow-y: scroll;
    }
  }
  .icon-required {
    color: red;
  }

  .action {
    display: flex;
    justify-content: flex-end;
    padding: 10px 0;
    padding-right: 15px;
  }

  .checkbox-pl {
    display: flex;
    margin-top: 30px;
    align-items: baseline;
    .label-filter {
      margin: 0 5px;
    }
  }

  .item-checkbox {
    margin-top: 30px;
  }
`;
