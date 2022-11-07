import styled from "styled-components";
import { getLayout } from "utils/editor-utils";

const FileMain = styled("div")``;

const Main = styled(FileMain)`
  height: 100%;
  display: flex;
  flex-direction: column;

  & .view-file-mode {
    font-family: "Times New Roman", sans-serif;
    color: black;

    & table {
      font-size: 13px;
    }

    & .page-inside {
      margin-bottom: 60px;
    }
  }

  & .layout-body {
    display: flex;
    width: 100%;
    overflow: hidden;
    flex-direction: column;
    flex: 1;

    & .layout-middle {
      flex: 1;
      overflow: hidden;
      & .editing-contain {
        height: 100%;
        width: 100%;
        overflow: hidden;
        flex: 1;
        background-color: #eef5fa;
        padding-top: 12px;
        position: relative;

        & .editor-layout {
          width: 100%;
          max-height: 100%;
          overflow: auto;
          flex: 1;
        }

        & .editing-box {
          margin-right: auto;
          margin-left: auto;
          overflow-y: auto;
          overflow-x: ${({ layoutType }) =>
            layoutType === "default" ? "hidden" : "auto"};
          height: calc(100vh - 172px);
          background-color: #fff;
          width: ${(props) => getLayout(props.layoutType).width + 24}px;
          padding: 0 12px;
          max-height: ${(props) => getLayout(props.layoutType).height}px;
          box-shadow: 0 24px 24px -18px rgba(69, 104, 129, 0.33),
            0 9px 45px 0 rgba(114, 119, 160, 0.12);
          border-radius: 4px;
        }

        & .form-content {
          transform: scale(${({ zoomValue }) => zoomValue / 100});
          transform-origin: top left;
          background-color: #fff;
          margin: 12px 0;
          width: ${({ width }) => width}px;
          height: auto;
          & iframe {
            height: auto;
            min-height: ${({ height }) => height}px;
          }
        }
      }
    }

    @media screen and (max-width: 1200px) {
      .layout-middle {
        // zoom: 89%;
      }
    }
  }
`;

export { Main };
