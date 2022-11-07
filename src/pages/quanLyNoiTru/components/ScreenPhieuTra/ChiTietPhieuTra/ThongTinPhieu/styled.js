import styled from "styled-components";
import { Row } from "antd";
export const Main = styled(Row)`
  .pointer {
    cursor: pointer;
  }
  & .ant-col {
    display: flex;
    & .label {
      font-weight: bold;
      margin-right: 5px;
    }
    & .content {
      flex: 1;
      display: flex;
      align-items: center;
      word-break: break-word;
      & .ant-select {
        width: 100%;
      }
    }
  }
`;
