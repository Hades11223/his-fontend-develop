import styled from "styled-components";

export const Main = styled.div`
  .form-nb {
    padding: 10px 0;

    .ant-col {
      padding: 0 5px;
    }

    .ant-input {
      border-radius: 4px;
    }

    input {
      width: 100%;
    }

    .ant-form-item {
      margin-bottom: 18px;
    }
  }

  .footer-action {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 16px;
    .selected-item {
      flex: 1;
    }

    .back-text {
      color: #0762f7;
    }
  }

  .ant-form-item-label
    > label.ant-form-item-required:not(.ant-form-item-required-mark-optional)::before {
    content: none;
  }

  .ant-form-item-label
    > label.ant-form-item-required:not(.ant-form-item-required-mark-optional)::after {
    display: inline-block;
    margin-right: 4px;
    color: #ff4d4f;
    font-size: 14px;
    font-family: SimSun, sans-serif;
    line-height: 1;
    content: "*";
  }
`;
export const MainHeader = styled.div`
  &.header-title {
    display: flex;
    justify-content: space-between;

    .title {
      color: #172b4d;
    }

    .title-nb {
      margin-left: 5px;
    }
  }
`;
