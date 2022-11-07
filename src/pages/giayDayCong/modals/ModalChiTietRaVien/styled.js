import styled from "styled-components";

export const Main = styled.div`
  padding: 10px 20px;
  .date {
    display: flex;
    padding-top: 5px;
    .title {
      display: flex;
      flex: 1 0 auto;
      width: 150px;
    }
    .ant-picker {
      width: 100%;
    }
  }
  .title-error {
    font-size: small;
    font-style: italic;
    color: red;
  }
  .flex {
    display: flex;
  }

  .main-content {
    padding: 5px 0;

    &-right-bottom {
      padding-top: 20px;
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
  }
`;
