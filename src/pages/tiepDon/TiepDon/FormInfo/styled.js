import styled from "styled-components";

export const Main = styled.div`
  height: 100%;
  & .ant-spin-nested-loading {
    height: 100%;
    & .ant-spin-container {
      height: 100%;
    }
  }
  & * {
    font-family: "Nunito Sans";
    font-style: normal;
  }

  & .ant-input-disabled {
    background-color: #dfe1e6;
  }
  & .ant-picker-disabled {
    background-color: #dfe1e6;
  }
  &
    .ant-select-disabled.ant-select:not(.ant-select-customize-input)
    .ant-select-selector {
    background-color: #dfe1e6;
  }
  & .body {
    background: #f4f5f7;
    @media (min-width: 1400px) {
      height: calc(100vh - 60px);
    }
  }
  ::-webkit-scrollbar {
    display: none !important;
  }

  & textarea {
    padding: 5px 10px;
  }
  @media (max-width: 1280px) {
    & .label {
      font-size: 9pt !important;
    }
    & .ant-checkbox-wrapper {
      & span {
        font-size: 9pt !important;
      }
    }
    & .ant-checkbox + span {
      padding-right: 0px;
      padding-left: 4px;
    }
    & input {
      &::placeholder {
        font-size: 9pt !important;
      }
    }
  }
`;
