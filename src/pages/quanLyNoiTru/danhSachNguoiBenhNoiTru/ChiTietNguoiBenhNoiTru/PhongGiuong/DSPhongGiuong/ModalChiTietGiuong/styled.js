import styled, { createGlobalStyle } from "styled-components";
import { Modal } from "antd";

export const Main = styled.div`
  height: 500px;

  .table-content {
    .ant-table-wrapper {
      height: 400px;
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

  .tool-btn {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
`;

export const GlobalStyle = createGlobalStyle`
  & .modal-chi-tiet-giuong{
    .header {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      &-title {
        margin-right: 10px;
        font-weight: 700;
        font-size: 16px;
        line-height: 22px;
        color: #172b4d;
      }
    }
  }
`;
