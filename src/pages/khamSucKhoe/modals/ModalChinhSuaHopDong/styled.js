import styled from "styled-components";
import { Modal } from "antd";

export const Main = styled.div`
  margin: 5px 20px;

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
`;

export const ModalStyled = styled(Modal)`
  padding: 0;

  .ant-modal-content {
    background: #f4f5f7;
    box-shadow: 0px 0px 20px rgba(9, 30, 66, 0.2);
    border-radius: 16px;
    font-family: Nunito Sans, sans-serif;
    height: 560px;
    .ant-modal-body {
      padding: 0;
    }
    overflow: hidden;
  }

  .modal-title {
    font-weight: 700;
    font-size: 16px;
    line-height: 22px;
    color: #172b4d;
  }
`;
