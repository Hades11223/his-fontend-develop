import { Row } from "antd";
import styled from "styled-components";
import { Page } from "components";

export const MainPage = styled(Page)`
  & .top-level-category {
    padding: 0px 6px;
    padding-top: 10px;
  }
  & .main-page {
    padding: 0 16px;
    & .title-category {
      margin-bottom: 0;
    }
    & .page-body {
      padding: 16px 0 !important;
    }
  }
`;
export const Main = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

export const InputSearch = styled.div`
  background: #ffffff;
  border: 2px solid #dfe1e6;
  box-sizing: border-box;
  border-radius: 4px;
  display: flex;
  align-items: center;
  padding: 5px 8.5px;
  width: 459px;
  &:focus-within {
    border: 1px solid #0762f7 !important;
    box-shadow: 0 0 0 3px #0062ff47 !important;
    /* box-shadow: 0 0 0 2px rgb(24 144 255 / 20%); */
    /* border: 0; */
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
