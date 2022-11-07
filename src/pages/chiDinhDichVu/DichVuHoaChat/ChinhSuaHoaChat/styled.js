import styled from "styled-components";

export const Main = styled.div`
  & .footer-btn {
    display: flex;
    padding: 5px;
    justify-content: right;
  }
  .error-dv{
    border: 1px solid red;
  }
  .info-content{
    padding: 16px;
    .ant-input-disabled {
      background-color: #dfe1e6;
    }
  }
`;
