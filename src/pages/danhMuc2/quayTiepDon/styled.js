import styled from "styled-components";
import { Main as MainStyle } from "../styled";

export const Main = styled(MainStyle)`
  #dsDoiTuong {
    .ant-checkbox-wrapper {
      margin-right: 5pt;
      display: flex;
      margin: 1em 0 1em 0;
    }
    .ant-checkbox-group {
      .ant-row {
        align-items: center;
        padding: 1px 0.5em;
        &:hover {
          background: linear-gradient(0deg, #ffffffe6, #ffffffe6), #0762f7;
        }
      }
    }
  }
  .uuTien {
    .ant-select {
      border: none !important;
      .ant-select-selection-item {
        text-align: right;
      }
      &:focus,
      &:active {
        box-shadow: none !important;
      }
    }
    .ant-select-focused {
      border: none !important;
      box-shadow: none !important;
    }
    .ant-form-item-label {
      text-align: right;
    }
  }
  .row-actived {
    background: #c1f0db !important;
  }
`;
