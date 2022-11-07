import styled from "styled-components";
import { Row } from "antd";
export const Main = styled(Row)`
  padding: 20px;
  background: #fff;
  .form-custom {
    width: 100%;
    .ant-col {
      padding: 0 3px;
    }
    label {
      margin-bottom: 4px;
      line-height: 16px;
      font-size: 14px;
      font-weight: 600;
      color: #172b4d;
      &.ant-form-item-required {
        &:after {
          display: inline-block;
          margin-right: 4px;
          color: red;
          font-size: 16px;
          font-weight: 600;
          font-family: inherit;
          line-height: 1;
          content: "*";
        }
        &:before {
          display: none;
        }
      }
    }
    .ant-input-disabled {
      background: #e0e0e0;
    }
  }
`;
