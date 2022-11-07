import styled from "styled-components";
import { Modal, Button } from "antd";
export const ModalStyled = styled(Modal)`
  .ant-modal-body {
    padding: 0 !important;
  }
  .ant-modal-content {
    border-radius: 8px !important ;
    .ant-modal-header {
      border-radius: 8px 8px 0 0 !important;
      background: #e8eaed;
      padding: 10px 24px !important;
      border-bottom: 2px solid #0762f7;
      .ant-modal-title {
        font-size: 20px;
        font-weight: 600;
        color: #172b4d !important ;
        display: flex;
        justify-content: space-between;
      }
    }
  }
  th {
    .ant-checkbox-wrapper {
      .ant-checkbox {
        margin-top: 10px;
      }
      border-bottom: 2px solid #dfe1e6;
      padding-bottom: 13px;
    }
  }
  .ant-table-selection {
    width: 100%;
  }
  .ant-checkbox-wrapper {
    display: flex !important;
    justify-content: center;
  }
  .footer {
    display: flex;
    justify-content: space-between;
    padding: 15px;
    .button-ok {
      height: auto;
      padding: 5px 15px;
      border-radius: 8px;
      border: 1px solid #0762f7;
      font-size: 16px;
      background: #0762f7;
      color: white;
      display: flex;
      align-items: center;
      :hover {
        background: #054ab9;
      }
    }
    .button-cancel {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #0762f7;
      font-size: 16px;
      font-weight: 700;
      :hover {
        color: #054ab9;
        cursor: pointer;
      }
      span {
        margin-right: 5px;
      }
    }
  }
  .fNormal {
    font-weight: normal;
  }
`;
