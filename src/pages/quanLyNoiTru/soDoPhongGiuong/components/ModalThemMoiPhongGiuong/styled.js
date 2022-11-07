import styled from "styled-components";
import { Modal } from "antd";

export const ModalStyled = styled(Modal)`
  padding: 0;

  .ant-modal-content {
    background: #f4f5f7;
    box-shadow: 0px 0px 20px rgba(9, 30, 66, 0.2);
    border-radius: 16px;
    font-family: Nunito Sans, sans-serif;
    height: 600px;
    .ant-modal-body {
      padding: 0;
    }
    overflow: hidden;
  }
`;

export const Main = styled.div`
  padding: 10px;

  .form-nb {
    padding: 10px 0;

    .ant-col {
      padding: 0 5px;
    }

    .ant-input {
      border-radius: 4px;
    }

    .ant-picker {
      width: 100%;
      border-radius: 4px;

      .ant-picker-input > input[disabled] {
        color: rgba(0, 0, 0, 0.75);
      }
    }

    input {
      width: 100%;
    }
  }

  .footer-action {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 16px;
    .selected-item {
      flex: 1;
    }

    .back-text {
      color: #0762f7;
    }
  }
`;
export const MainHeader = styled.div`
  &.header-title {
    display: flex;
    justify-content: space-between;

    .title {
      color: #172b4d;
    }

    .title-goi {
    }
  }
`;
