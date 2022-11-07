import { Page } from "components";
import styled from "styled-components";
export const Main = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
`;
export const MainPage = styled(Page)`
  & .main-page {
    padding: 0 16px;
  }
  background: #f4f5f7;
  height: 100%;
  .container {
    padding: 0 12px 0px 12px;
    .home {
      height: 30px;
    }
  }
  .ant-row {
    width: 100%;
  }
  .left {
    > div {
      margin-right: 10px !important;
    }
  }
  .right {
    > div {
      margin-left: 10px !important;
    }
  }
  .chart {
    background: white;
    border-radius: 10px;
    margin-top: 10px;
    &_title {
      font-size: 16px;
      font-weight: bold;
    }
    &_title_right {
      color: grey;
      font-weight: bold;
      font-size: 14px;
      text-transform: uppercase;
    }
    &-wrapper {
      width: 100%;
      height: calc(100vh - 535px);
      @media (min-width: 1440px) {
        height: 150px;
      }
      @media (min-width: 1680px) {
        height: 200px;
      }
    }
  }
`;
export const SearchDate = styled.div`
  display: inline-block;
  position: relative;
  input {
    color: #7a869a;
    font-family: Nunito Sans;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    width: 400px;
    border: 1px solid grey;
    height: 35px;
  }
`;
