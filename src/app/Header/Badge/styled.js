import styled, { createGlobalStyle } from "styled-components";

const Main = styled("div")`
  width: 8px;
  height: 8px;
  background: ${(props) => (props.status == "online" ? "#00ff00" : "red")};
  position: absolute;
  right: 0;
  bottom: 0;
  border-radius: 4px;
`;
export { Main };
