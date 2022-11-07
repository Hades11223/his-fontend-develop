import styled from "styled-components";

export const Main = styled.div`
  height: 100%;
  min-height: 100%;
  margin-bottom: 10px;
  & .error-message {
    font-size: 18px;
    text-align: center;
    margin-top: 100px;
    padding-top: 100px;
    color: red;
  }
  & .ant-spin-spinning {
    display: block;
    margin-top: 100px;
    padding-top: 100px;
  }
  & .react-pdf__Page__canvas {
    margin: 10px auto !important;
  }
  &.fix-size {
    & .react-pdf__Page__canvas {
      width: 90% !important;
      height: auto !important;
    }
  }
  & .react-pdf__Page__textContent {
    display: none;
  }
  margin-bottom: 20px;
`;
