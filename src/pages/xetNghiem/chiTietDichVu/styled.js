import styled from "styled-components";
import { Modal } from "antd";

export const ModalStyled = styled(Modal)`
  .ant-modal-content {
    background: linear-gradient(
        0deg,
        rgba(23, 43, 77, 0.05),
        rgba(23, 43, 77, 0.05)
      ),
      #ffffff;
    box-shadow: 0px 0px 15px rgba(9, 30, 66, 0.07);
    border-radius: 16px;
    .ant-modal-body {
      padding: 0;
    }
    overflow: hidden;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 13px 30px;
  font-family: Nunito Sans;
  font-size: 18px;
  color: #172b4d;

  .right-header {
    display: flex;
    &__title {
      padding-right: 16px;
      border-right: 1px solid #172b4d;
    }
    &__sub-title {
      padding-left: 16px;
    }
    &__title-bold {
      font-weight: bold;
    }
    &__sub-title-bold {
      font-weight: bold;
    }
  }

  .left-header {
    .btn {
      height: 36px;
      mix-blend-mode: normal;
      box-shadow: 0px 3px 0px #03317c;
      border-radius: 8px;
      font-weight: 600;
      font-size: 16px;
      &.btn-submit {
        border: 1px solid #0762f7;
        color: #ffffff;
        background: #0762f7;
      }
      &.btn-close {
        margin-left: 10px;
        border: 1px solid #0762f7;
        color: #172b4d;
        background: #ffffff;
      }
    }
  }

  .ant-btn[disabled] {
    background: #f5f5f5 !important;
    color: rgba(0, 0, 0, 0.25) !important;
  }
`;

export const ModalBody = styled.div`
  padding: 30px;
  background: #ffffff;
`;
