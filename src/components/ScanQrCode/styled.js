import styled from "styled-components";
import { Modal } from "antd";

export const Main = styled(Modal)`
  width: 650px !important;
  & .ant-modal-content {
    height: 100%;
    & .ant-modal-body {
      padding: 0;
      section {
        div {
          border: 75px solid rgba(0, 0, 0, 0.3) !important; 
        }
      }
    }
  }
  & video {
    height: 100%;
  }
  & .camera-container {
    width: 100%;
    height: 100%;
  }
  & .camera-footer {
    height: 100px;
    background: #00000030;
    position: absolute;
    display: flex;
    left: 0;
    right: 0;
    bottom: -18;
    padding: 10px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & .tip {
      color: #fff;
      font-weight: bold;
      font-size: 18px;
    }
    & .button-switch {
      margin-top: 10px;
      background: #00e7f0;
      margin-left: 10px;
      padding: 10px;
      border-radius: 25px;
      cursor: pointer;
    }
  }
  & .scan-area {
    position: absolute;
  }
`;
