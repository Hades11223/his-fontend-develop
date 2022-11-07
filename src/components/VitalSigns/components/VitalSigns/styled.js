import styled from "styled-components";

const Main = styled("div")`
  height: calc(100vh - 60px);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  & .scrollview-body {
    position: relative;
    height: ${(props) => props.height}px;
  }
  & canvas {
    background-color: transparent;
  }
  & .vital-signs-body {
    position: relative;
    flex: 1;
    max-height: ${(props) => (props.isModal ? "800" : "500")}px;
    overflow-y: scroll;
    overflow-x: hidden;

    @media (max-width: 1900px) {
      max-height: ${(props) => (props.isModal ? "800" : "200")}px;
    }
  }
  & .canvas-touchable {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: transparent;
    width: ${(props) => props.width};
    z-index: 100;
  }
`;

export { Main };
