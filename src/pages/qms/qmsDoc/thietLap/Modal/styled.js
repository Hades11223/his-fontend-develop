import styled, { createGlobalStyle } from "styled-components";
import { Modal } from "antd";
export const ModalStyled = styled(Modal)`
  padding: 0;
  .ant-modal-content {
    box-shadow: 0px 0px 20px rgba(9, 30, 66, 0.2);
    border-radius: 16px;
    font-family: Nunito Sans, sans-serif;
    margin-top: -70px;
    .ant-modal-body {
      padding: 0;
    }
    overflow: hidden;
  }
`;
export const Main = styled.div`
  .header {
    height: 80px;
    background: #0762f7;
    display: flex;
    justify-content: center;
    align-items: center;
    .left {
      justify-content: center;
      display: flex;
      align-items: center;
      width: 100%;
      span {
        font-family: Nunito Sans;
        font-style: normal;
        font-weight: 900;
        font-size: 42px;
        line-height: 57px;
        color: #ffffff;
      }
    }
    .right {
      margin-left: auto;
      margin-right: 20px;
    }
  }
  .content {
    margin: 10px;
    background: #ffffff;
    box-shadow: 0px 0px 15px rgba(9, 30, 66, 0.07);
    border-radius: 32px;
    .form-custom {
      padding-top: 15px;
      display: flex;
      flex-wrap: wrap;
      background: #ffffff;
      border-radius: 16px 0px 0px 0px;
      .ant-form-item {
        width: 100%;
      }
      .ant-row {
        width: 100%;
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
        label.ant-form-item-no-colon {
          width: 100%;
          display: flex;
          justify-content: center;
        }
        .ant-picker {
          width: 100%;
          font-weight: 600;
          height: 75px;
          background: #fff0;
          border: 2px solid rgba(23, 43, 77, 0.1);
          box-sizing: border-box;
          border-radius: 3px;
          input {
            font-weight: 600;
            font-size: 14px;
            font-family: Nunito Sans;
            font-style: normal;
            font-weight: 600;
            font-size: 30px;
            line-height: 45px;
            color: #172b4d;
          }
        }
        .ant-picker-suffix {
          font-size: 34px;
          color: #7a869a;
        }
        .ant-form-item-label {
          > label {
            font-family: Nunito Sans;
            font-style: normal;
            font-size: 34px;
            line-height: 45px;
            color: #172b4d;
          }
        }
        .ant-select {
          height: 70px;
          .ant-select-arrow {
            top: 35.79%;
            right: 41px;
            font-size: 30px;
            color: #2f5888;
          }
        }
        .ant-select-selector {
          background: #fff0;
          font-weight: 500;
          color: #2f3035;
          height: 70px;
          .ant-select-selection-search-input {
            height: 70px;
          }
          .ant-select-selection-overflow {
            flex-wrap: unset !important;
            overflow: hidden;
          }
        }
        .ant-select-selection-placeholder {
          font-family: Nunito Sans;
          font-style: normal;
          font-weight: 600;
          font-size: 30px;
          line-height: 45px;
          display: flex;
          align-items: center;
        }
        .ant-input {
          height: 60px;
          font-family: Nunito Sans;
          font-style: normal;
          font-weight: 600;
          font-size: 30px;
          line-height: 70px;
          display: flex;
          align-items: center;
        }
        .ant-select-selection-item {
          font-weight: 600;
          font-size: 34px;
          line-height: 45px;
          display: flex;
          align-items: center;
          overflow: hidden;
        }
        .ant-select-multiple {
          .ant-select-selection-item {
            height: 80% !important;
          }
        }
        .ant-form-item-explain {
          &.ant-form-item-explain-error {
            font-size: 30px;
          }
        }
      }
      label {
        line-height: 16px;
        font-size: 34px;
        font-weight: 600;
        color: #172b4d;
        &.ant-form-item-required {
          &:after {
            display: inline-block;
            margin-right: 4px;
            color: red;
            font-size: 34px;
            font-weight: 600;
            font-family: inherit;
            line-height: 1;
            content: "*";
          }
          &:before {
            display: none;
          }
        }
      }

      .doctor-avatar {
        background: linear-gradient(
            0deg,
            rgba(255, 255, 255, 0.5),
            rgba(255, 255, 255, 0.5)
          ),
          #0762f7;
        border-radius: 8px;
        background: #c4c4c4;
        width: 250px;
        height: 250px;
        object-fit: cover;
      }
    }
  }
  .footer {
    padding-top: 10px;
    text-align: center;
    .title {
      font-family: Nunito Sans;
      font-style: normal;
      font-weight: 600;
      font-size: 34px;
      line-height: 45px;

      color: #172b4d;
    }
    .video {
      display: flex;
      background: #ffffff;
      border-radius: 4px;
      border: 1px solid #e6e6e6;
      align-items: center;
      margin: 0px 10px 0px 10px;
      .right {
        margin-left: auto;
        .btn-upload {
          border: none;
          font-family: Nunito Sans;
          font-style: normal;
          font-weight: 600;
          font-size: 34px;
          line-height: 45px;
          color: #0762f7;
          img {
            padding-left: 10px;
            margin-right: 10px;
            width: 40px;
            height: 40px;
            object-fit: contain;
          }
        }
      }
      a {
        font-family: Nunito Sans;
        font-style: normal;
        font-weight: 600;
        font-size: 34px;
        line-height: 45px;

        color: #0762f7;
      }
    }
  }
  .ant-btn {
    padding: 0px;
  }
  .button {
    display: flex;
    font-family: Nunito Sans;
    font-style: normal;
    padding-top: 20px;
    bottom: 0px;
    .btn-reset {
      margin-left: 20px;
      width: 111.58px;
      height: 70px;
      font-weight: 600;
      font-size: 29.4737px;
      line-height: 42px;
      mix-blend-mode: normal;

      border: 2.10526px solid #7a869a;
      box-sizing: border-box;
      border-radius: 16.8421px;
    }
    .btn-save {
      margin-left: auto;
      margin-right: 20px;
      margin-bottom: 20px;
      width: 147.37px;
      height: 70px;
      font-weight: 600;
      font-size: 29.4737px;
      line-height: 42px;
      background: #0762f7;
      mix-blend-mode: normal;
      border-radius: 16.8421px;
      color: #fff;
      img {
        width: 37.53px;
        height: 37.53px;
        object-fit: contain;
      }
      span {
        padding-right: 10px;
      }
    }
  }
  .main__container {
    margin-top: 0px;
    .ant-table-wrapper {
      .ant-table-header {
        .custome-header {
          .title-box {
            font-family: Nunito Sans;
            font-style: normal;
            font-weight: bold;
            font-size: 32px;
            line-height: 115%;
          }
        }
      }
      .ant-table-body {
        min-height: 320px !important;
        .ant-table-tbody {
          .ant-table-cell {
            font-size: 34px !important;
            line-height: 115%;
            .ant-checkbox-inner {
              transform: scale(2);
            }
          }
        }
      }
    }
  }
`;

