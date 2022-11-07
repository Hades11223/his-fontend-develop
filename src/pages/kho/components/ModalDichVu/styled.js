import styled from "styled-components";
import { Modal } from "antd";
export const ModalStyle = styled(Modal)`
  width: auto !important;
  .ant-modal-content {
    width: 1840px;
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
  }
`;
export const Main = styled.div`
  .header {
    display: flex;
    &__left {
      padding: 15px 10px 15px 20px;
    }
    &__right {
      padding: 5px 20px 10px 10px;
      margin-left: auto;
      button {
        background: #049254;
        mix-blend-mode: normal;
        box-shadow: 0px 3px 0px #026138;
        border-radius: 8px;
        border: 1px solid #049254;
        color: #ffffff;
      }
      img {
        padding-left: 10px;
      }
    }
  }
  .form-custom {
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    background: #ffffff;
    border-radius: 16px 0px 0px 0px;
    .ant-row {
      width: 25%;
      margin-bottom: 12px;
      padding-right: 0.75rem;
      padding-left: 0.75rem;
      font-weight: 600;
      color: #172b4d;
      .ant-form-item-label {
        label {
          line-height: 16px;
          font-size: 14px;
          padding: 0 !important;
          font-family: Nunito Sans;
          font-style: normal;
        }
      }
      .ant-picker {
        width: 100%;
        font-weight: 600;
        height: 35px;
        background: #fff0;
        border: 2px solid rgba(23, 43, 77, 0.1);
        box-sizing: border-box;
        border-radius: 3px;
        input {
          font-weight: 600;
          font-size: 14px;
          color: #172b4d;
        }
      }

      .ant-select-selector {
        background: #fff0;
        font-weight: 500;
        color: #2f3035;
      }
    }
  }
  .footer {
    padding: 40px 0px 15px 0px;
    display: flex;
    background: #ffffff;
    border-radius: 0px 0px 16px 16px;
    .left {
      padding: 10px 10px 10px 20px;
      .btn-cancled {
        background: #ffffff;
        mix-blend-mode: normal;
        border: 1px solid #0762f7;
        box-shadow: 0px 3px 0px #03317c;
        border-radius: 8px;
      }
    }
    .right {
      margin-left: auto;
      padding: 10px 20px 10px 10px;
      img {
        padding-left: 10px;
      }
      .btn-save {
        width: 115px;
        height: 36px;
        margin-right: 10px;
        background: #0762f7;
        mix-blend-mode: normal;
        box-shadow: 0px 3px 0px #03317c;
        border-radius: 8px;
        color: white;
        border: 1px solid #0762f7;
      }
    }
  }
`;
