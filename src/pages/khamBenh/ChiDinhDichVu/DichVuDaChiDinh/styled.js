import styled from "styled-components";
import { Collapse } from "antd";

export const CollapseWrapper = styled(Collapse)`
  width: 100%;
  .ant-collapse-content {
    border: none;
  }
  .ant-collapse-arrow {
    display: none !important;
  }
  > .ant-collapse-item {
    background: #ffffff;
  }
`;
