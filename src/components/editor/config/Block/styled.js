import styled from "styled-components";

const Main = styled("div")`
  max-width: 100%;
  background-color: ${(props) => (props.focusing ? "#E6F7FF" : "")};
  position: relative;

  & .close-item {
    position: absolute;
    z-index: 1;
    right: 6px;
    top: 3px;
  }
`;

const ResizeElm = styled("div")`
  position: absolute;
  z-index: 1;
  height: 100%;
  width: 3px;
  opacity: 0.6;
  right: 0;
  top: 0;
  margin: 0;
  cursor: col-resize;
  border-left: ${(props) => props.theme.border};
  border-right: ${(props) => props.theme.border};
  border-color: rgba(0, 0, 0, 0.6);
`;

export { Main, ResizeElm };
