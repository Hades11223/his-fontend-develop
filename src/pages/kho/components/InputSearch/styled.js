import styled from "styled-components";
export const Main = styled.div`
  & .search-area {
    background: #ffffff;
    box-sizing: border-box;
    border-radius: 4px;
    display: flex;
    align-items: center;
    width: 459px;
    margin-left: 10px;
    padding-left: 10px;
    border: ${(props) =>
      !props.focusInput ? "2px solid #dfe1e6" : "1px solid #0762f7 !important"};
    box-shadow: ${(props) =>
      props.focusInput ? "0 0 0 3px #0062ff47 !important" : null};
    min-height: ${(props) => props.minheight || 0}px;
    &:hover {
      border: 1px solid #0762f7 !important;
      box-shadow: 0 0 0 3px #0062ff47 !important;
    }
    & input {
      flex: 1;
    }
    & .ant-select {
      flex: 1;
      & .ant-select-selector {
        border: none !important;
        box-shadow: 0 0 0 0 !important;
        & .ant-select-selection-search {
          left: 0;
        }
        &:active {
          border: none;
        }
        &:hover {
          border: none !important;
          box-shadow: 0 0 0 0 !important;
        }
      }
    }
    input {
      padding: 0 1em 0 8.5px !important;
      border: none;
      border-radius: 50px;
      font-weight: 600;
      font-size: 14px;
      line-height: 19px;
      color: #172b4d;
      &:hover {
        border: none !important;
        box-shadow: none !important;
      }
      &:focus {
        border: none !important;
        box-shadow: none !important;
      }
      &::placeholder {
        color: #7a869a;
      }
    }
    .icon-search {
      height: 15px;
    }
  }
`;
