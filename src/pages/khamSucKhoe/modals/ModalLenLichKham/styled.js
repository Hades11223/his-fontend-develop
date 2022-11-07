import styled from "styled-components";

export const Main = styled.div`
  .form-nb {
    padding: 10px;

    .ant-col {
      padding: 0 5px;
    }

    .ant-input {
      border-radius: 4px;
    }

    input {
      width: 100%;
    }

    &-filter {
      box-shadow: 0px 0px 15px rgba(9, 30, 66, 0.07);
      border-radius: 8px;
      background: #ffffff;
    }

    &-table {
      &-header {
        background-color: #049254;
        color: #fff;
        padding: 12px;
        font-size: 16px;
        display: flex;
        justify-content: space-between;

        &-right {
          display: flex;
          justify-content: flex-start;
          align-items: center;

          .ant-input-number {
            margin: 0 5px;
          }
        }
      }

      &-content {
        height: 500px;
        border: 2px dashed #049254;
        border-style: none dashed dashed dashed;
        overflow: hidden;

        .ant-table-wrapper {
          height: 500px;
        }
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
      line-height: 1;
      content: "*";
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

  .ant-input-affix-wrapper {
    background-color: unset !important;
    border: none;
  }
`;
export const MainHeader = styled.div`
  &.header-title {
    display: flex;
    justify-content: space-between;

    .title {
      color: #172b4d;
    }

    .title-goi {
    }
  }
`;
