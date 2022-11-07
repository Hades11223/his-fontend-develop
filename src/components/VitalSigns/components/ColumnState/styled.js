import styled from "styled-components";
import { SIZE } from "utils/vital-signs/constants";

const Main = styled("div")`
  margin-bottom: 2px;
  display: flex;
  position: absolute;
  top: 0;
  left: ${SIZE.leftColumnWidth}px;
`;
export { Main };
