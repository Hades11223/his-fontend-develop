import { Button } from "antd";
import styled, { css, createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    & .kham-benh-select-phong-kham {
        &.ant-select-dropdown {
          min-width: 500px !important;
          width :500px !important;
        }
    }
`;

export const Main = styled.div`
  width: 100%;
  display: grid;
  grid-row-gap: 30px;
`;
export const SearchPartient = styled.div`
  .ant-select {
    width: 100%;
    height: 40px;
    border-radius: 3px;
    &.ant-select-open {
      .ant-select-selection-item {
        color: #7a869a;
      }
    }
    .ant-select-selector {
      height: 100%;
      border: 2px solid #dfe1e6;
      input {
        height: 100% !important;
        line-height: 40px;
        &::placeholder {
          height: 100% !important;
          line-height: 40px;
        }
      }
    }
    .ant-select-selection-placeholder,
    .ant-select-selection-item {
      font-weight: 600;
      font-size: 14px;
      color: #7a869a;
      line-height: 38px;
    }
  }
`;
export const InputSearch = styled.div`
  background: #ffffff;
  box-sizing: border-box;
  border-radius: 50px;
  display: flex;
  align-items: center;
  padding: 5px 8.5px;
  border: ${(props) =>
    !props.focusInput ? "2px solid #dfe1e6" : "1px solid #0762f7 !important"};
  box-shadow: ${(props) =>
    props.focusInput ? "0 0 0 3px #0062ff47 !important" : null};
  &:hover {
    border: 1px solid #0762f7 !important;
    box-shadow: 0 0 0 3px #0062ff47 !important;
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
  .qr-search {
    height: 20px;
  }
`;
export const ButtonSearch = styled(Button)`
  width: 100%;
  ${(props) =>
    props.color
      ? css`
          background: ${props.color};
          box-shadow: 0px 3px 0px #0d399b;
        `
      : css`
          background: #049254;
          box-shadow: 0px 3px 0px #026138;
        `}
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #ffffff;
  height: auto;
  border: none;
  padding: 8px 16px;
  overflow: hidden;
  @media (max-width: 1700px) {
    padding: 8px 0px;
  }
  @media (max-width: 1500px) {
    padding: 8px 12px;
  }
  &:hover,
  &:focus {
    color: #ffffff;
    border: none;
    ${(props) =>
      props.color
        ? css`
            background: ${props.color};
            box-shadow: 0px 3px 0px #0d399b;
          `
        : css`
            background: #049254;
            box-shadow: 0px 3px 0px #026138;
          `}
  }
  > span {
    vertical-align: middle;
  }
  img {
    padding-left: 15px;
    @media (max-width: 1700px) {
      padding-left: 8px;
    }
  }
`;
export const ButtonGoToPage = styled.div`
  font-size: 16px;
  line-height: 20px;
  color: #054ab9;
  cursor: pointer;
  border: 1px solid #0762f7;
  box-shadow: 0px 3px 0px #03317c;
  padding: 8px 8px;
  border-radius: 8px;
  font-weight: 600;
  @media (max-width: 1700px) {
    padding: 8px 0px;
  }
  @media (max-width: 1500px) {
    padding: 8px 12px;
  }
  img {
    padding-left: 9px;
  }
`;
