import styled from "styled-components";
import { Modal } from "antd";

export const Main = styled.div`
  padding: 20px;

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
  }

  .table-content {
    padding: 10px;
    background-color: #fff;
    border-radius: 8px;

    .ant-table-wrapper {
      height: 350px;
    }
  }
`;

export const ModalStyled = styled(Modal)`
  padding: 0;

  .ant-modal-content {
    background: #f4f5f7;
    box-shadow: 0px 0px 20px rgba(9, 30, 66, 0.2);
    border-radius: 16px;
    font-family: Nunito Sans, sans-serif;
    height: 550px;
    .ant-modal-body {
      padding: 0;
    }
    overflow: hidden;
  }

  .div-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .modal-title {
    font-weight: 700;
    font-size: 16px;
    line-height: 22px;
    color: #172b4d;
  }
`;
