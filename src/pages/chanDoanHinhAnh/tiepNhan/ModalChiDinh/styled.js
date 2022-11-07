import styled from "styled-components";
import { Modal } from "antd";

export const ChiDinhBoSungWrapper = styled(Modal)`
  width: 60vw !important;
  .ant-modal-content {
    border-radius: 16px;
    .custome-header {
      .title-box {
        display: flex;
        justify-content: center;
      }
    }
    .ant-modal-body {
      padding: 0;
      background: #f3f4f6;
      box-shadow: 0px 0px 15px rgba(9, 30, 66, 0.07);
      border-radius: 16px;
      .header-chidinh {
        padding: 5px 15px 15px 30px;
        display: flex;
        span {
          margin-right: auto;
          font-weight: bold;
          font-size: 18px;
          line-height: 24px;
          display: inline-flex;
          align-items: center;
        }
      }
      .ant-table-body {
        max-height: 300px !important;
        min-height: unset !important;
        .custom-col {
          padding: 3px !important;
          .error {
            border: 1px solid #ff0d0d;
          }
        }
        .ant-table-cell {
          input {
            border-radius: unset !important;
          }
          .ant-select {
            border-radius: unset !important;
            .ant-select-selector {
              border-radius: unset !important;
            }
          }
        }
        .check {
          display: flex;
          justify-content: center;
        }
      }
      .btn-action {
        display: flex;
        justify-content: end;
        margin-right: 30px;
        padding-bottom: 10px;
        padding-top: 10px;
        background: linear-gradient(0deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.95)), #0762F7;
        .cancel {
          background: #ffffff;
          mix-blend-mode: normal;
          /* #0762F7 */

          border: 1px solid #0762f7;
          box-shadow: 0px 3px 0px #03317c;
          border-radius: 8px;
          margin-right: 15px;
        }
        .ok {
          background: #0762f7;
          mix-blend-mode: normal;
          box-shadow: 0px 3px 0px #03317c;
          border-radius: 8px;
          color: #fff;
        }
      }
    }
  }
`;
