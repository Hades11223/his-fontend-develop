import styled from "styled-components";
export const Main = styled.div`
  padding: 22px 24px;
  padding-bottom: 0;
  & .ant-form-item-label {
    & .ant-form-item-required {
      &:before {
        display: none !important;
      }
    }
    &:after {
      display: inline-block;
      margin-left: 4px;
      color: #ff4d4f;
      font-size: 14px;
      line-height: 1;
      content: "*";
    }
  }

  & .footer-btn {
    display: flex;
    margin: 10px 0;
    & .f1 {
      flex: 1;
    }
    & .btn-ok {
      align-self: ;
    }
  }
`;
