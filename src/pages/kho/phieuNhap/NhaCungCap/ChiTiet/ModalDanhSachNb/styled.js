import { Modal } from "antd";
import styled from "styled-components";

export const WrapperModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 10px;
    overflow: hidden;
    .ant-modal-close {
      top: -6px;
    }
    .ant-modal-header {
      background-color: #f3f4f6;
      min-height: 43px;
      padding: 0;
      display: flex;
      /* align-items: center; */
      padding: 0 16px;
      border-bottom: 1px solid #0762f7;
      .ant-modal-title {
        width: 100%;
        padding: 10px 0;
        display: flex;
        justify-content: space-between;
        font-weight: bold;
        div:last-child {
          margin-right: 40px;
          display: flex;
          align-items: center;
          color: #0762f7;
          font-weight: normal;
          svg {
            width: 20px;
            height: 20px;
          }
        }
      }
    }
    .ant-modal-body {
      padding: 0;
      .ant-col {
        padding-left: 5px;
        padding-right: 5px;
        height: 75px;
        .label-filter {
          font-size: 16px;
          font-weight: 600;
        }
      }
    }
  }
`;
