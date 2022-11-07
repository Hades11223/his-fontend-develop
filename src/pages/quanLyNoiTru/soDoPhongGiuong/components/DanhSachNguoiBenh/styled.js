import styled, { createGlobalStyle } from "styled-components";
import { Modal } from "antd";

export const ModalStyled = styled(Modal)`
  padding: 0;

  .ant-modal-content {
    background: #f4f5f7;
    box-shadow: 0px 0px 20px rgba(9, 30, 66, 0.2);
    border-radius: 16px;
    font-family: Nunito Sans, sans-serif;
    height: 800px;
    .ant-modal-body {
      padding: 0;
    }
    overflow: hidden;
  }
`;

export const Main = styled.div`
  padding: 10px;

  .table-content {
    .ant-table-wrapper {
      height: 620px;
    }
  }

  .footer-action {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 16px;
    & .selected-item {
      flex: 1;
    }

    .back-text {
      color: #0762f7;
    }
    .cursor-pointer {
      cursor: pointer;
    }
  }
`;

export const GlobalStyle = createGlobalStyle`
  & .modal-chi-tiet-giuong{
    .header {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      &-title {
        margin-right: 56px;
        font-weight: 700;
        font-size: 16px;
        line-height: 22px;
        color: #172b4d;
      }
    }
  }
`;
