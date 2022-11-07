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
  .checkbox-pl {
    display: flex;
    /* margin-top: 30px; */
    .label-filter {
      margin-right: 10px;
    }
  }
  .ant-select-selector {
    overflow-y: scroll;
  }
  .required {
    color: red;
  }
`;
