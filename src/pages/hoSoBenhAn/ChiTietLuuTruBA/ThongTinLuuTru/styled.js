import styled from "styled-components";

export const Main = styled.div`
  padding-top: 10px;
  .ant-form-item {
    margin-bottom: 12px;
    margin-left: 10px;
    margin-right: 10px;
  }

  .item-time {
    width: 100%;
  }

  .ant-picker-input > input[disabled] {
    color: rgba(0, 0, 0, 0.95);
  }

  .ant-select-disabled.ant-select:not(.ant-select-customize-input)
    .ant-select-selector {
    color: rgba(0, 0, 0, 0.95);
  }

  .row-name {
    padding-bottom: 16px;
  }
`;
