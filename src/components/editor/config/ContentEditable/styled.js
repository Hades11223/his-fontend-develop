import styled from "styled-components";

const Main = styled("span")`
  position: relative;
  padding: ${(props) => (props.border ? "3px" : "unset")};
  ${(props) =>
    props.toUpperCaseText &&
    `
  text-transform : uppercase;
  `}
  & .tool-box {
    z-index: 15;
    opacity: 1;
  }

  & .calc-value {
    opacity: 0;
    position: absolute;
    z-index: 0;
    pointer-events: unset;
  }

  & .edit-available {
    outline: none;
    word-break: break-word;
  }

  & .extent-child {
    position: absolute;
    width: 540px;
    margin-left: 120px;
    z-index: 2;
    top: 0;
  }

  & .editing-content {
    z-index: 1;
    position: relative;
    color: #000;
  }
`;

export { Main };

export default Main;
