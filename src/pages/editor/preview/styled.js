import styled from "styled-components";
import { getLayout } from "components/constanst";

const Main = styled("div")`
  height: calc(100vh - 60px);
  overflow: hidden;

  & .layout-body {
    display: flex;
    width: 100%;

    & .layout-middle {
      height: 100%;
      flex: 1;

      & .editing-contain {
        background-color: #eef5fa;
        height: calc(100vh - 116px);
        padding-top: 24px;
        position: relative;
        overflow: hidden;

        & .editing-box {
          margin-right: auto;
          margin-left: auto;
          overflow-y: auto;
          overflow-x: ${({ layoutType }) =>
            layoutType === "default" ? "hidden" : "auto"};
          background-color: #fff;
          width: var(--form-editor-width);
          height: calc(100vh - 160px);
          padding: 0 12px;
          max-height: ${({ layoutType }) => getLayout(layoutType).height}px;
          box-shadow: 0 24px 24px -18px rgba(69, 104, 129, 0.33),
            0 9px 45px 0 rgba(114, 119, 160, 0.12);
          border-radius: 4px;
        }

        & .editing-box::-webkit-scrollbar {
          display: none;
        }

        & .form-content {
          transform: scale(${({ zoomValue }) => zoomValue / 100});
          transform-origin: top left;
          min-height: ${({ layoutType }) => getLayout(layoutType).height}px;
          background-color: #fff;
          margin: 12px 0;
          width: ${({ width }) => width}px;
          height: ${({ height }) => height}px;
        }
      }
    }
  }
`;

export { Main };
