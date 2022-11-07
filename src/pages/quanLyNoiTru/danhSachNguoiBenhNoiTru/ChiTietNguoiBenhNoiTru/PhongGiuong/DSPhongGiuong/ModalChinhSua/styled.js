import styled from "styled-components";
import { Modal } from "antd";

export const Main = styled.div`
  .footer-action {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 100px 16px 0 16px;
    & .selected-item {
      flex: 1;
    }

    .back-text {
      color: #0762f7;
    }
  }

  .ant-form-item {
    margin: 10px;
  }

  .ant-form-item-label {
    label {
      color: #172b4d;
      font-weight: 600;
      font-size: 13px;
      line-height: 18px;
    }
  }

  .ant-picker {
    width: 100%;
    border-radius: 4px;
  }

  .ant-select-selector {
    border-radius: 4px !important;
  }
`;

export const ModalStyled = styled(Modal)`
  .ant-modal-header {
    background-color: #f3f4f6;
    min-height: 43px;
    padding: 0;
    display: flex;
    align-items: center;
    padding: 0 16px;
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
    .title {
      line-height: 24px;
      font-style: normal;
      font-weight: bold;
      font-size: 20px;
      h2 {
        margin-bottom: 0;
      }
    }
  }
  .ant-modal-content {
    border-radius: 16px;
    overflow: hidden;
  }
  .ant-modal-body {
    padding: 10px;
  }
  .cursor-pointer {
    cursor: pointer;
  }
`;
