import { Modal } from "antd";
import styled, {css} from "styled-components";
export const Main = styled(Modal)`
  font-family: Nunito Sans, sans-serif !important;
  border-radius: 16px;
  overflow: hidden;
  .ant-modal-content {
    border-radius: 16px;
    ${(props) =>
    props.top
      ? css`
          margin-top: ${`${props.top}%`};
        `
      : css`
          margin-top: 50%;
        `}
    .ant-modal-body {
      padding: 0px;
      .container {
        padding: 0px;
        .header {
          width: 100%;
          display: flex;
          padding: 8px 30px;
          padding-bottom: 15px;
          justify-content: center;
          h3 {
            color: #fe8803;
            font-weight: bold;
            font-size: 40px;
            line-height: 40px;
          }
          &::before {
            position: absolute;
            content: "";
            width: 100%;
            height: 25px;
            top: 50px;
            background-color: white;
            z-index: 1;
            border-top: solid 3px #e8eaed;
          }
        }
        .success {
          background: #049254;
          &::before {
            border-top: solid 3px #05c270;
          }
        }
        .error {
          background: linear-gradient(
              0deg,
              rgba(23, 43, 77, 0.1),
              rgba(23, 43, 77, 0.1)
            ),
            #ffffff;
          &::before {
            border-top: solid 1px #fe8803;
          }
        }
        .infoModal {
          background: linear-gradient(
              0deg,
              rgba(23, 43, 77, 0.05),
              rgba(23, 43, 77, 0.05)
            ),
            #ffffff;
          h3 {
            color: #172b4d;
          }
        }
        .modal-content {
          position: relative;
          z-index: 5;
          padding: 0 30px;
          padding: 0px;
          text-align: center;
          display: block;
          img {
            margin: auto;
            margin-top: 10px;
          }
          .content {
            font-size: 30px;
            line-height: 40px;
            color: #172b4d;
            padding: 20px 5px 0 5px;
          }
          
          .fotter {
            margin-left: auto;
            margin-top: 30px;
            padding-right: 16px;
            margin-top: 30px;
            display: flex;
            justify-content: center;
            margin-bottom: 20px;
            .btn {
              background: #fe8803;
              color: #fff;
              mix-blend-mode: normal;
              border-radius: 8px;
              font-size: 30px;
              line-height: 30px;
              width: 175px;
              height: 60px;
              display: flex;
              align-items: center;
              justify-content: center;
            }
          }
        }
      }
    }
    .ant-modal-footer {
      display: none;
    }
    p {
      margin: 0;
    }
  }
`;
