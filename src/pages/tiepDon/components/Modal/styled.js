import { Modal } from "antd";
import styled from "styled-components";
import { button, displayFlex } from "components/mixin";

export const Main = styled(Modal)`
  @media print {
    width: 100% !important;
    height: 100% !important;
    top: 0 !important;
  }

  font-family: Nunito Sans, sans-serif !important;
  border-radius: 16px;
  overflow: hidden;
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
          padding-bottom: 15px;
          h3 {
            color: #ffffff;
            font-weight: bold;
            font-size: 18px;
            line-height: 24px;
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
        .success {
          background: #049254;
          &::before {
            border-top: solid 3px #05c270;
          }
        }
        .error {
          background: #bd2c2b;
          &::before {
            border-top: solid 3px #f43938;
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
        }
        .button-bottom {
          padding: 30px;
          display: flex;
          justify-content: space-between;
          .btn {
            ${button}
          }

          @media print {
            display: none;
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
    .button-error {
      background: #fc3b3a !important;
      box-shadow: 0px 3px 0px #7e1d1d !important;
    }
  }
`;
