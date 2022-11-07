import styled from "styled-components";

export const Main = styled.div`
  .ant-form-item {
    margin-bottom: 12px;
    margin-left: 10px;
    margin-right: 10px;
  }
  .item-time {
    width: 100%;
  }
  .item-number {
    width: 100%;
  }

  .item-input {
    padding-top: 10px;
    padding-left: 10px;
    padding-right: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .label {
      width: 200px;
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
