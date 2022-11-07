import styled from "styled-components";

const Main = styled("div")`
  font-family: "Times New Roman", Times, serif;
  z-index: 101;
  position: absolute;
  width: 100px;
  .ant-select:not(.ant-select-customize-input) .ant-select-selector {
    border: none !important;
    background-color: unset !important;
  }
  & .ant-select {
    display: flex !important;
    align-items: center;
    justify-content: center;
  }
  .ant-select-selection {
    border-radius: 0;
    height: 100% !important;
    justify-content: center;
    display: flex;
    flex-direction: column;
    border: none !important;
    & .ant-select-selection__rendered {
      margin: 4px;
      & .ant-select-selection-selected-value {
        font-size: 13pt;
        color: rgb(0, 0, 0);
      }
    }
  }
`;
export { Main };
