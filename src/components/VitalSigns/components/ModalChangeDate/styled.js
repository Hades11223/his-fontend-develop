import styled from "styled-components";

const Main = styled("div")`
  z-index: 101;
  position: absolute;
  width: 100px;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
  width: ${(props) => props.width}px;
  .ant-calendar-picker {
    // display: none;
    width: 0;
  }
`;
export { Main };
