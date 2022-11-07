import { Spin } from "antd";
import styled from "styled-components";

export const Main = styled(Spin)`
  background: #f4f5f7;
  min-height: 100vh;
  .ant-row {
    width: 100%;
  }
  .note {
    font-size: 14px;
    line-height: 16px;
    font-weight: 600;
    color: #172b4d;
    padding: 10px;
    font-style: italic;
  }
`;
