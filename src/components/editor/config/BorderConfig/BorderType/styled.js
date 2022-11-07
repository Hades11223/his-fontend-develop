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

const Border = styled("div")`
  width: 20px;
  height: 2px;
  border-top: 1px ${(props) => props.type} black;
`;
const BorderContain = styled("div")`
  padding: 6px;
  background-color: #fff;
  border: ${(props) => props.theme.border};
  width: 120px;
`;
const BorderItem = styled("div")`
  height: 14px;
  cursor: pointer;
  border: ${(props) => props.theme.border};
  padding: 5px;
  & div {
    border-top: 2px ${(props) => props.type} black;
  }
`;

export { Main, Border, BorderContain, BorderItem };
