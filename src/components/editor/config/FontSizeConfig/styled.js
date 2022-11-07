import styled, { createGlobalStyle } from "styled-components";
import { Select } from "antd";

const Main = styled.div`
  & .select-font-size {
    height: auto;
    padding: 0 5px;
    min-width: 50px;
    &.no-select {
      color: #7a869a;
    }
  }
`;

const GlobalStyle = createGlobalStyle`
  & .popover-fontsize {
    & .ant-popover-inner-content{
      display: flex;
        flex-direction: column;
        max-height: 200px;
        overflow: auto;
        min-width: 100px;
        padding: 0;
        & button{
          height: auto;
          padding: 10px 5px;
          border: none;
        }
    }        
  }
`;
export { Main, GlobalStyle };
