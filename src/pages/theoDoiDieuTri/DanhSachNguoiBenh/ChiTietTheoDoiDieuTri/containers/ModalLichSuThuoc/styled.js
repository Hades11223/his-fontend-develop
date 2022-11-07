import styled from "styled-components";
import { Modal } from "antd";
export const ModalStyle = styled(Modal)`
  padding: 0;
  .ant-modal-content {
    box-shadow: 0px 0px 20px rgba(9, 30, 66, 0.2);
    border-radius: 16px;
    font-family: Nunito Sans, sans-serif;
    .ant-modal-body {
      padding: 0;
      min-height: 833px;
    }
    overflow: hidden;
  }
`;

export const Main = styled.div`
  .header {
    align-items: center;
    display: flex;
    padding: 10px 0px 0px 10px;
    span {
      font-family: Nunito Sans;
      font-style: normal;
      font-weight: bold;
      font-size: 16px;
      line-height: 24px;

      color: #172b4d;
    }
  }
  .ant-btn {
    padding: 0px;
  }
  .footer {
    padding-bottom: 20px;
    float: right;
    margin-right: 30px;
    position: fixed;
    bottom: 0px;
    right: 0px;
    .btn-back {
      mix-blend-mode: normal;
      /* #7A869A (Màu chữ phụ) */

      border: 1px solid #7a869a;
      box-sizing: border-box;
      border-radius: 8px;
      width: 68px;
      height: 38px;
    }
  }
`;
