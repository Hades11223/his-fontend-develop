import styled from "styled-components";

const Main = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin: 0 2px;
  & .line {
    height: ${(props) => props.height || 30}px;
    width: 4px;
    &.end {
      background: ${(props) => props.color || "#03a9f4"};
      display: ${(props) => (props.start ? "none" : "block")};
    }
    &.start {
      background: ${(props) => props.color || "red"};
      display: ${(props) => (props.start ? "block" : "none")};
    }
  }
  & .arrow {
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    &.start {
      border-top: 5px solid ${(props) => props.color || "red"};
      display: ${(props) => (props.start ? "block" : "none")};
    }
    &.end {
      border-bottom: 5px solid ${(props) => props.color || "#03a9f4"};
      display: ${(props) => (props.start ? "none" : "block")};
    }
  }
  & .text {
    font-weight: bold;
    font-family: monospace;
    color: blue;
  }
`;

export { Main };
