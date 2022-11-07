import styled, { createGlobalStyle } from "styled-components";
export const Main = styled.div`
  & .btn-cancel {
    min-width: 70px;
    text-align: center;
  }
  padding: 20px;
  & .name {
    margin-bottom: 20px;
    .field {
      margin-bottom: 10px;
    }
  }
`;
