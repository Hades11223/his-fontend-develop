import styled from "styled-components";
import { Modal } from "antd";

export const Main = styled(Modal)`
  @media (max-width: 991px) {
    width: 80vw !important;
    min-width: auto !important;
  }
  @media (max-width: 767px) {
    top: 1.5em !important;
    width: 70vw !important;
  }
  @media (max-width: 500px) {
    width: 100vw !important;
  }
  & .switch-camera {
    width: 20px;
    height: 20px;
    margin-right: 10px;
    :hover {
      cursor: pointer;
    }
  }
  & .action {
    display: flex;
    align-items: center;
  }
  .ant-modal-content {
    border-radius: 10px 10px 10px 10px;
    .ant-modal-close {
      margin-right: 16px;
      :focus {
        outline: 0 !important;
      }
      .ant-modal-close-x {
        display: flex;
        align-items: center;
        width: auto;
      }
    }
    .ant-modal-header {
      background: #e9f3fc;
      border-radius: 10px 10px 0px 0px;
      div {
        display: flex;
        align-items: center;
      }
      span {
        margin-left: 17px;
        text-transform: uppercase;
        color: #333333;
        font-size: 18px;
        line-height: 21px;
        font-weight: bold;
      }
    }
  }
  & .ant-modal-body {
    padding: 8px;
    height: calc(100vh - 300px);
    @media (max-width: 767px) {
      height: calc(100vh - 200px);
    }
    & button.take-photo {
      background: none;
      border: 3px solid #46ace0;
      width: 62px;
      height: 62px;
      color: #46ace0;
      border-radius: 100%;
      font-size: 27px;
    }

    .take-photo .btn-upload-file img {
      width: auto;
      margin-right: 10px;
    }
    .display-error {
      display: none;
    }
    .take-photo .image-preview img {
      position: absolute;
      top: 50%;
      max-width: 40%;
      height: 57%;
      left: 50%;
      transform: translate(-50%, -50%);
      border: 1px dashed;
    }
    & .ant-spin-nested-loading {
      width: 100%;
      height: 100%;
      @media (max-width: 991px) {
        overflow: hidden;
      }
      & .ant-spin-container {
        width: 100%;
        height: 100%;
        .image-preview {
          overflow: auto;
          display: flex;
          justify-content: center;
          justify-items: center;
          background-color: #000;
          width: 100%;
          height: 100%;
          & .ReactCrop {
            align-self: center;
            & div {
            }
          }
          img {
            max-width: 100%;
            max-height: 100%;
            align-self: center;
          }
          & .camera {
            max-width: 100%;
            max-height: 100%;
            display: flex;
            justify-content: center;
            justify-items: center;
            position: relative;
            & video {
              max-width: 100%;
              max-height: 100%;
            }
            & .outer-circle {
              width: 70px;
              height: 70px;
              border-radius: 50%;
              background-color: hsla(0, 0%, 100%, 0.4);
              position: absolute;
              bottom: 20px;
              left: calc(50% - 25px);
              z-index: 10000;
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
              & .btn-take {
                width: 44px;
                height: 44px;
                border-radius: 25px;
                background-color: #fff;
              }
            }
          }
        }
      }
    }
    #display-error {
      display: none;
    }
  }
  .ant-modal-footer {
    div {
      align-items: center;
    }
    .action {
      @media (max-width: 991px) {
        display: flex;
      }
      .ant-btn {
        width: 120px;
        @media (max-width: 767px) {
          height: 36px;
          padding: 0 14px;
          font-size: 13px;
          width: auto;
        }
      }
      .ant-btn-danger {
        background: linear-gradient(
          41.51deg,
          #fe8803 -0.1%,
          #fed603 101.9%
        ) !important;
        box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        border-color: #fed603;
      }
      .ant-btn-primary {
        background: linear-gradient(90deg, #109d83 0%, #01b45e 100%) !important;
        box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        border-color: #01b45e;
      }
      .ant-btn-purple {
        background: linear-gradient(
          41.51deg,
          #9f44d3 -0.1%,
          #e2b0ff 101.9%
        ) !important;
        box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        border-color: #e2b0ff;
        color: white;
      }
    }
    .selectImage {
      /* width: calc(100% - 276px); */
      flex: 1;
      margin-right: 15px;
      height: 40px;
      padding-top: 4px;
      @media (max-width: 767px) {
        width: calc(100% - 180px);
      }
      .ant-upload {
        width: -webkit-fill-available;
      }
      .ant-btn-dashed {
        height: 35px;
        width: -webkit-fill-available;
        text-align: left;
        border-radius: 0px;
        display: flex;
        align-items: center;
        img {
          margin-right: 14px;
        }
      }
    }
  }
`;
