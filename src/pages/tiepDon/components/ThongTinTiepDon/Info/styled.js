import styled, { keyframes } from "styled-components";
import { Row } from "antd";
import { input, select, date } from "components/mixin";

export const Main = styled(Row)`
  display: flex;
  position: relative;
  margin-top: 0;
  z-index: 999;
  align-items: stretch;
  & .box {
    min-height: 100%;
  }
  .ant-col {
    padding: 0 6px;
    .item-input {
      ${input}
      margin-bottom: 14px;
    }
    .item-date {
      ${date};
      margin-bottom: 14px;
    }
    .item-select {
      ${select};
      margin-bottom: 14px;
    }
  }
  & .error {
    @media (min-width: 1440px) {
      font-size: 14px !important;
    }
  }
  @media (max-width: 1200px) {
    & > .ant-col {
      margin-bottom: 16px;
    }
  }
`;
