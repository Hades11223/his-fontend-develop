import styled, { createGlobalStyle } from "styled-components";

const Main = styled("div")`
  height: ${(props) => props.rowHeight || 22}px !important;
  line-height: 0px;
  & .btn-insert-component {
    height: ${(props) => props.rowHeight}px;
    width: ${(props) => props.rowHeight}px;
    padding: 0;
    line-height: 1;
    padding-top: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    & i.anticon {
      margin-top: 0;
      height: ${(props) => props.rowHeight - 7}px;
      width: ${(props) => props.rowHeight - 7}px;
      display: flex;
      justify-content: center;
      align-items: center;
      & svg {
        height: ${(props) => props.rowHeight - 7}px;
        width: ${(props) => props.rowHeight - 7}px;
      }
    }
  }
`;
const GlobalStyle = createGlobalStyle`
  & .component-dropdown{
    & .component-name{
      margin-left: 5px;
    }
  }
`;

export { Main, GlobalStyle };
