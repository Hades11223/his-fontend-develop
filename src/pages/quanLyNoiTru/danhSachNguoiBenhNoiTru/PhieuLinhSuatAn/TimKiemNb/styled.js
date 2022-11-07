import { Select } from "components";
import styled from "styled-components";

export const CustomSelect = styled(Select)`
  width: 100%;
  height: 100%;
  text-align: left;
  font-weight: 600;
  font-size: 14px;
  .ant-select-selector {
    height: 100% !important;
  }
  .ant-select-selection-placeholder,
  .ant-select-selection-item {
    margin: auto;
  }
  .ant-select-selection-placeholder {
    color: #69788c;
    font-weight: 600;
  }
`;

export const Main = styled.div`
  .ant-picker-input > input::placeholder {
    font-weight: 600;
    color: #69788c;
  }
`;
