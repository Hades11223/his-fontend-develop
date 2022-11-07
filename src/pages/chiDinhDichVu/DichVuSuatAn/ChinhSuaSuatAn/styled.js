import styled from "styled-components";

export const Main = styled.div`
  & .footer-btn {
    display: flex;
    padding: 5px;
    justify-content: right;
  }
  .error-dv {
    border: 1px solid red;
  }
  .info-content {
    padding: 16px;
    .ant-input-disabled {
      background-color: #dfe1e6;
    }

    .title-dv {
      font-size: 14px;
      font-weight: 400;
      color: #172b4d;
    }

    .name-dv {
      font-size: 16px;
      font-weight: 700;
      color: #172b4d;
    }
    .form-item {
      padding: 0 4px;
    }
  }
`;
