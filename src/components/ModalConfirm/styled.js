import { Modal } from "antd";
import styled from "styled-components";
import { button } from "components/mixin";

export const Main = styled(Modal)`
  font-family: Nunito Sans, sans-serif !important;
  border-radius: 16px;
  overflow: hidden;
  padding-bottom: 0px;
  box-shadow: 0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%),
    0 9px 28px 8px rgb(0 0 0 / 5%);
  .ant-modal-content {
    border-radius: 16px;
    .ant-modal-body {
      padding: 0px;
      .container {
        padding: 0px;
        .header {
          width: 100%;
          display: flex;
          padding: 8px 30px;
          text-align: left;
          /* padding-bottom: 15px; */
          h3 {
            color: #ffffff;
            font-weight: bold;
            font-size: 18px;
            line-height: 24px;
            margin-bottom: 0px;
          }
          &::before {
            position: absolute;
            content: "";
            width: 100%;
            height: 25px;
            top: 40px;
            background-color: white;
            z-index: 1;
            border-radius: 20px 0 0 0;
            border-top: solid 3px #e8eaed;
            margin-left: -30px;
          }
        }
        .header-2 {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 50px;
          &::before {
            content: none;
          }
        }
        .success {
          background: #049254;
          &::before {
            border-top: solid 3px #05c270;
          }
        }
        .error {
          background: #e8eaed;
          border-bottom: 2px solid #fc3b3a;
          .title {
            color: #fc3b3a;
          }
        }
        .warning {
          background: #e8eaed;
          border-bottom: 2px solid #fe8803;
          .title {
            color: #fe8803;
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
          text-align: center;
          padding: 0 30px;
          padding: 0px;
          display: block;

          img {
            margin: auto;
            margin-top: 10px;
          }
          .content {
            font-weight: bold;
            font-size: 18px;
            line-height: 25px;
            color: #172b4d;
            padding: 20px 5px 0 5px;
          }

          .detail {
            font-weight: normal;
            font-size: 14px;
            line-height: 19px;
            color: #172b4d;
            padding-top: 15px;
          }
        }
        .modal-content-2 {
          padding-top: 20px;
          .content-2 {
            color: #172b4d;
            font-size: 14px;
            padding: 20px;
            font-weight: 500;
            line-height: 18px;
            white-space: pre-wrap;
          }
        }
        .sub-content {
          color: #172b4d;
          padding: 0 20px 20px 20px;
          font-size: 14px;
          font-weight: 500;
          line-height: 18px;
        }
        .button-bottom {
          padding: 30px;
          display: flex;
          justify-content: space-between;
          &.right {
            justify-content: flex-end;
          }
          .btn {
            ${button}
          }
          .button-error {
            background: #fc3b3a !important;
            box-shadow: 0px 3px 0px #7e1d1d !important;
          }
        }
        .button-error {
          background: #fc3b3a !important;
          box-shadow: 0px 3px 0px #7e1d1d !important;
        }

        .button-bottom-2 {
          justify-content: center;
          &.right {
            justify-content: flex-end;
            margin-right: 20px;
          }
          .btn {
            margin-left: 10px;
            box-shadow: none;
            min-width: 120px;
            span {
              font-size: 14px;
              font-weight: 600;
            }
          }
          .btn-cancel {
            border: ${(props) =>
              props.typeModal == "warning"
                ? "1px solid #7a869a !important"
                : "1px solid #7a869a !important"};
            color: #7a869a !important;
            &:hover {
              background: #7a869a !important;
              color: #fff !important;
            }
          }
          .btn-accept {
            background: ${(props) =>
              props.typeModal == "warning"
                ? "#FE8803 !important"
                : "#FC3B3A !important"};

            color: #fff !important;
            &:hover {
              background: ${(props) =>
                props.typeModal == "warning"
                  ? "#BF6602 !important"
                  : "#BD2C2B !important"};
            }
          }
          .button-error {
            background: #fc3b3a !important;
            color: #fff !important;
            &:hover {
              background: #7a869a !important;
            }
          }
        }

        .ant-col {
          width: 100%;
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
