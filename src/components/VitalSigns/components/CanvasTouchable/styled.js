import styled from "styled-components";

const Main = styled("div")`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: transparent;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  z-index: 100;
`;

export { Main };
