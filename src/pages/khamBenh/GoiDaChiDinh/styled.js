import styled from "styled-components";
import { Collapse } from "antd";

export const CollapseWrapper = styled(Collapse)`
  min-height: calc(100vh - 210px);
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

export const StickyWrapper = styled.div`
  position: sticky;
  background-color: #fff;
  z-index: 2;
  top: 0;
  width: 100%;
  .info {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    font-size: 14px;
    line-height: 19px;
    &__left {
      flex: 1;
      span {
        font-weight: bold;
      }
    }
    &__right {
      flex: 1;
      span {
        font-weight: bold;
      }
    }
  }
`;
