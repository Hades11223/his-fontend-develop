import styled from "styled-components";
import { Row } from "antd";
export const Main = styled(Row)`
  & .ant-col {
    display: flex;
    & .label {
      font-weight: bold;
      margin-right: 5px;
    }
    & .content {
      flex: 1;
      word-break: break-word;
      & .ant-select {
        width: 100%;
      }
    }
  }
`;
