import styled, { createGlobalStyle } from "styled-components";

import { Main } from "pages/editor/report/styled";

export const GlobalStyle = createGlobalStyle`
#root{
  height :100%
}
`;

const MainStyle = styled(Main)`
  #main-contain {
    align-items: center;
    justify-content: center;
    display: flex;
  }
  & .layout-body {
    & .layout-middle {
      & .editing-contain {
        & .editor-layout {
        }
        & .form-content {
          min-height: ${({ height }) => height}px;
          height: auto;
        }
        & .icon-scroll {
          position: absolute;
          bottom: 25px;
          border-radius: 100%;
          padding: 4px 7px;
          border: 1px solid #7d7d7d;
          right: 20px;
          & svg {
            fill: #7d7d7d;
          }
        }
      }
    }
  }
  & .ant-spin-nested-loading {
    .ant-spin {
      max-height: 600px !important;
      min-height: 600px;
    }
  }
  & .react-pdf__Page__canvas {
    /* display: none !important; */
  }
  @media print {
    & .react-pdf__Page__textContent {
      color: unset !important;
    }
  }
  & .ant-spin-container {
    overflow-x: auto;
  }
`;

export { MainStyle };
