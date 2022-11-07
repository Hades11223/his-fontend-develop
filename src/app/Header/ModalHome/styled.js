import styled from "styled-components";
import { Modal } from "antd";

const Main = styled(Modal)`
  @media (max-width: 1919px) {
    transform: scale(0.79) !important;
  }
  .item {
    @media (max-width: 1919px) {
      &:hover {
        transform: scale(1.05) !important;
      }
    }
  }
  .ant-modal-content {
    border-radius: 64px;
    .ant-modal-close {
      margin-right: 30px;
      margin-top: 35px;
      color: #fff;
      font-weight: bold;
      .ant-modal-close-x {
        font-size: 26px;
      }
    }
    .ant-modal-body {
      padding: 0;
      height: 100vh;
      div {
        margin: 0;
        .content-left {
          background: linear-gradient(
              0deg,
              rgba(0, 0, 0, 0.5),
              rgba(0, 0, 0, 0.5)
            ),
            #0762f7;
        }
      }
    }
    .ant-modal-footer {
      display: none;
    }
  }
`;
export { Main };
