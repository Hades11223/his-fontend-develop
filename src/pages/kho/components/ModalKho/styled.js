import styled from "styled-components";
import { Modal } from "antd";
export const ModalStyled = styled(Modal)`
  .ant-modal-content {
    background: linear-gradient(
        0deg,
        rgba(23, 43, 77, 0.05),
        rgba(23, 43, 77, 0.05)
      ),
      #ffffff;

    box-shadow: 0px 0px 15px rgba(9, 30, 66, 0.07);
    border-radius: 16px;
    .ant-modal-body {
      padding: 0px;
      .ant-row {
        width: 100%;
      }
      .container {
        .header {
          font-family: Nunito Sans;
          font-style: normal;
          font-weight: bold;
          font-size: 20px;
          line-height: 24px;
          padding: 4px 16px 0px 16px;

          color: #172b4d;
          img {
            object-fit: contain;
            margin-left: auto;
          }
          h1 {
            padding-top: 4px;
          }
        }
        .content {
          background: #ffffff;
          border-radius: 16px 0px 8px 8px;
          .info-content {
            padding: 20px;
            label {
              width: 100%;
            }
          }
          .footer {
            padding: 20px 10px 15px 10px;
            .btn-accept {
              height: 38px;
              margin-left: auto;
              background: #0762f7;
              mix-blend-mode: normal;
              border-radius: 8px;
              padding: 10px;
            }
            button {
              font-family: Nunito Sans;
              font-style: normal;
              font-weight: 600;
              font-size: 14px;
              line-height: 20px;

              display: flex;
              align-items: center;
              text-align: center;

              /* #FFFFFF */

              color: #ffffff;
            }
          }
        }
      }
    }
  }
`;

export const ModalStyled2 = styled(Modal)`
  .ant-modal-content {
    background: linear-gradient(
        0deg,
        rgba(23, 43, 77, 0.05),
        rgba(23, 43, 77, 0.05)
      ),
      #ffffff;

    box-shadow: 0px 0px 15px rgba(9, 30, 66, 0.07);
    border-radius: 16px;
    .ant-modal-body {
      padding: 0px;
      .ant-row {
        width: 100%;
      }
      .container {
        .header {
          font-family: Nunito Sans;
          font-style: normal;
          font-weight: bold;
          font-size: 20px;
          line-height: 24px;
          padding: 4px 16px 0px 16px;

          color: #172b4d;
          img {
            object-fit: contain;
            margin-left: auto;
          }
          h1 {
            padding-top: 4px;
          }
        }
        .content {
          background: #ffffff;
          border-radius: 16px 0px 8px 8px;
          padding: 20px 10px 15px 10px;
          .btn-accept:hover {
            background: #c1f0db;
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25),
              0px 4px 4px rgba(0, 0, 0, 0.25);
          }
          button {
            font-family: Nunito Sans;
            font-style: normal;
            font-weight: bold;
            font-size: 20px;
            line-height: 24px;
            justify-content: center;
            color: #000000;
            width: 95%;
            min-height: 170px;
            border-radius: 16px;
            display: flex;
            align-items: center;
            text-align: center;
            margin-left: 10px;
          }
        }
      }
    }
  }
`;

export const Main = styled.div`
  .container {
    flex-flow: column !important;
    .content {
      flex-flow: column !important;
      flex: 1;
      background: #ffffff;
      border-radius: 16px 0px 8px 8px;
      .info-content {
        padding: 20px;
        label {
          width: 100%;
        }
      }
    }
  }
`;
