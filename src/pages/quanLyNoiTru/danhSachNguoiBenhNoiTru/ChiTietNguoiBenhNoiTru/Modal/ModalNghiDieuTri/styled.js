import styled from "styled-components";

export const Main = styled.div`
  padding: 16px;

  .ant-form-item {
    width: 100%;
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
  }
`;
