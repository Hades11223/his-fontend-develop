import styled from "styled-components";

export const Main = styled.div`
  .item-time {
    width: 100%;
  }

  .item-input {
    padding-top: 10px;

    .label {
      display: flex;
    }
  }

  .row-name {
    padding-bottom: 16px;
  }

  .item-select {
    width: 100%;
  }

  .ant-picker {
    .ant-picker-input > input[disabled] {
      color: rgba(0, 0, 0, 0.75);
    }
  }
`;
