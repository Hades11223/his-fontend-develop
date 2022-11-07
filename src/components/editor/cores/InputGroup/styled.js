import styled from "styled-components";

const Main = styled("div")`
  display: flex;
  float-wrap: wrap;

  & .box-input {
    border: solid 1px #000;
    display: inline-block;
    text-align: center;
    line-height: 1;
    padding: 3px;
    min-width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
    border-right: 0px;
    &:last-child {
      border-right: solid 1px #000;
    }
  }
`;

export { Main };
