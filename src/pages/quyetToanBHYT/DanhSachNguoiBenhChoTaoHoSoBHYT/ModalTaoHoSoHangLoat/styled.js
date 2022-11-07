import styled, { createGlobalStyle } from "styled-components";

export const Main = styled.div`
  padding: 16px;
  .ant-form-item {
    margin-bottom: 15px;
    width: 49%;
    & .ant-picker,
    & .ant-input {
      width: 100%;
    }
  }
`;

export const GlobalStyles = createGlobalStyle`
  .time-picker-tao-ho-so-hang-loat{
    .ant-picker-ok{
        display: none;
    } 
  }
`;
