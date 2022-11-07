import styled from "styled-components";

const Main = styled("div")`
  & .color-picker {
    & button {
      border-radius: 3px;
      &:first-child {
        display: none;
      }
    }
  }
`;

const Size = styled("div")`
  width: 20px;
  height: 2px;
  border-top: ${(props) => props.size}px solid black;
`;
const SizeContain = styled("div")`
  padding: 6px;
  background-color: #fff;
  border: ${(props) => props.theme.border};
  width: 120px;
`;
const SizeItem = styled("div")`
  height: 14px;
  cursor: pointer;
  border: ${(props) => props.theme.border};
  padding: 5px;
  & div {
    border-top: ${(props) => props.size}px solid black;
  }
`;

export { Main, Size, SizeContain, SizeItem };
