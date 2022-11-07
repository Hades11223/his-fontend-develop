import styled from "styled-components";

const Main = styled("div")`
  background-color: rgb(243 243 243);
  width: 100%;
  height: calc(100vh - 148px);
  padding-top: 12px;
  font-family: "Times New Roman", sans-serif;
  font-size: ${(props) => props.fontSize}pt;

  & .creation-contain {
    margin-right: auto;
    margin-left: auto;
    overflow-y: auto;
    overflow-x: ${({ layoutType }) =>
      layoutType === "default" ? "hidden" : "auto"};
    height: calc(100vh - 230px);
    background-color: #fff;
    width: var(--form-editor-width);
    padding: 12px;
    box-shadow: 0px 0px 15px 0px #091e4220;
  }
`;

const Content = styled("div")`
  width: ${({ width }) => width}px;
  min-height: ${({ height }) => height}px;
  transform: scale(${({ zoomValue }) => zoomValue});
  transform-origin: top left;
  padding-bottom: 24px;
`;

export { Main, Content };
