import styled from "styled-components";
import { select, input } from "components/mixin";

export const Main = styled.div`
  display: flex;
  background: white;
  font-size: 14px !important;
  & .ant-input,
  & .ant-select-selection-item {
    font-size: 14px !important;
  }
  & .form-item {
    & .label {
      font-size: 14px !important;
      color: #172b4d;
      font-weight: 600;
    }
    & .ant-select{
      width: 100%;
    }
  }
`;
