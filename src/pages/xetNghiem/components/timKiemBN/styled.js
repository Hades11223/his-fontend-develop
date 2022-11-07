import styled from "styled-components";
import { Button } from "antd";
export const Main = styled.div`
  background: #ffffff;
  box-shadow: 0px 0px 15px rgba(9, 30, 66, 0.07);
  border-radius: 16px;
  padding: 17px 15px 36px;
  height: 100%;
`;
export const SearchPartient = styled.div`
  margin: 0 15px;
  .title {
    font-weight: 600;
    font-size: 14px;
    line-height: 16px;
    color: #172b4d;
    padding-bottom: 4px;
    white-space: nowrap;
  }
  .ant-select {
    height: 40px;
    border-radius: 3px;
    &.ant-select-open {
      .ant-select-selection-item {
        color: #7a869a;
      }
    }
    .ant-select-selector {
      height: 100%;
      border: 2px solid #dfe1e6;
      input {
        height: 100% !important;
        line-height: 40px;
        &::placeholder {
          height: 100% !important;
          line-height: 40px;
        }
      }
    }
    .ant-select-selection-placeholder,
    .ant-select-selection-item {
      font-weight: 600;
      font-size: 14px;
      color: #7a869a;
      line-height: 38px;
    }
  }
  .ant-input-number {
    height: 40px;
    width: 100%;
    border-radius: 3px;
    border: 2px solid #dfe1e6;
    .ant-input-number-handler-wrap,
    .ant-input-number-input-wrap {
      height: 100%;
    }
    input {
      border-radius: 3px;
      color: #7a869a;
      height: 100%;
      &::placeholder {
        font-weight: 600;
        font-size: 14px;
        color: #7a869a;
        line-height: 40px;
      }
    }
  }
`;
export const ButtonSearch = styled(Button)`
  margin: 10px 15px 0;
  background: #0762f7;
  box-shadow: 0px 3px 0px #03317c;
  border-radius: 8px;
  height: auto;
  padding: 8px 16px;
  font-weight: 600;
  font-size: 16px;
  color: #ffffff;
  border: none;
  &:hover,
  &:active,
  &:focus {
    background: #0762f7;
    color: #ffffff;
    box-shadow: 0px 3px 0px #03317c;
  }
`;
