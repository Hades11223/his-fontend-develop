import styled from "styled-components";

export const Main = styled.div`
  background: #f4f5f7;
  height: 100%;
  .ant-row {
    width: 100%;
  }
  .ant-col {
    padding-left: 15px;
    padding-right: 15px;
  }
  .note {
    font-size: 14px;
    line-height: 16px;
    font-weight: 600;
    color: #172b4d;
    padding: 10px;
    font-style: italic;
  }
  .item-select {
    .label-filter {
      font-size: 13px;
      font-weight: 600;
      color: #172b4d;
      line-height: 18px;
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
    .ant-checkbox-wrapper {
      flex-direction: row-reverse;
      .ant-checkbox + span {
        width: 180px;
      }
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
`;
