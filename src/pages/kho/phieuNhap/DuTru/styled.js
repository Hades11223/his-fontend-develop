import styled from "styled-components";
import { Row } from "antd";
import { Page } from "components";

export const MainPage = styled(Page)`
  font-family: "Nunito Sans";
  font-size: 14px;
  background-color: #f3f4f7;
  display: flex;
  flex-direction: column;
  height: 100%;

  & .main-page {
    overflow: auto;
  }

  & .main-page .page-body.ant-row {
    flex-direction: column;
    width: 100%;
    overflow: visible;
    padding: 0;
  }

  .mn-card {
    width: 100%;
  }

  & .item-select {
    & .label {
      margin-bottom: 5px;
      line-height: 17px;
    }
  }

  .body {
    /* background: #F4F5F7; */
    font-family: "Nunito Sans" !important;
    position: relative;
  }
  .bg-color {
    background: #f4f5f7;
  }

  & .footer-btn {
    display: flex;
    padding: 0px 40px;
    margin: 10px 0;
    justify-content: end;
  }
`;
