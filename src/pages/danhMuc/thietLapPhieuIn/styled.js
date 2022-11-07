import styled from "styled-components";
import { Page } from "components";
export const Main = styled.div`
  background: #f4f5f7;
  width: 100%;
  overflow: hidden;
  .title-page {
    font-family: Nunito Sans;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: 0px;
    text-align: left;
  }
`;
export const InputSearch = styled.div`
  margin: 15px 0px;
  background: #ffffff;
  border: 2px solid #dfe1e6;
  box-sizing: border-box;
  border-radius: 4px;
  display: flex;
  align-items: center;
  padding: 5px 8.5px;
  width: 459px;
  &:focus-within {
    box-shadow: 0 0 0 2px rgb(24 144 255 / 20%);
    /* border: 0; */
  }
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
    &:focus,
    &:hover {
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
export const MainPage = styled(Page)`
  width: 100%;
  height: 100%;
`;
