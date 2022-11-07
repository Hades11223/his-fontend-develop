import { Row } from "antd";
import styled from "styled-components";
import { button } from "components/mixin";
import { Button } from "components";

export const Main = styled(Row)`
  &.container {
    padding: 0px;
    .modal-content {
      display: flex;
      &--left {
        width: 50%;
        .error-body {
          margin: 25px 0px 10px;
          background: #fff5f5;
          border-radius: 3px;
          padding: 20px 17px;
          display: -webkit-box;
          img {
            width: 33px;
          }
          .error-detail {
            width: calc(100% - 33px);
            .code {
              font-weight: 600;
              font-size: 16px;
              line-height: 20px;
              letter-spacing: -0.096px;
              color: #fc3b3a;
            }
            .message {
              font-weight: normal;
              font-size: 14px;
              line-height: 20px;
              color: #172b4d;
            }
          }
        }
      }
      &--right {
        width: calc(50% - 40px);
        margin-left: 40px;
        .history {
          max-height: 500px;
          overflow-y: scroll;
          margin-top: 12px;
        }
      }
    }
    .note,
    .info {
      h5 {
        font-family: Nunito Sans, sans-serif;
        font-weight: bold;
        font-size: 16px;
        line-height: 22px;
        color: #172b4d;
      }
    }
    .note {
      margin-top: 4px;
      display: contents;
      p {
        margin-bottom: 1em;
        font-size: 14px;
        line-height: 19px;
        color: #172b4d;
        font-style: italic;
      }
    }
    .info {
      margin-top: 12px;
    }
    .content {
      position: relative;
      width: 100%;
      background: #ffffff;
      box-shadow: 0px 4px 10px 2px rgba(0, 0, 0, 0.2);
      z-index: 2;
      padding: 8px;
      font-family: Nunito Sans, sans-serif;
      border-radius: 16px;
      &-info {
        border: 2px solid #0762f77d;
        padding: 14px;
        border-radius: 16px;
        h6 {
          margin-bottom: 4px;
          font-size: 14px;
          line-height: 18px;
          color: rgb(0 0 0 / 0.8);
        }
        p {
          font-size: 14px;
          line-height: 18px;
          color: #000000;
          margin-bottom: 0;
        }
        .ma p {
          font-weight: bold;
          font-size: 16px;
          line-height: 20px;
          color: #0762f7;
          opacity: 0.8;
        }
        .name p {
          font-weight: bold;
          font-size: 14px;
          line-height: 18px;
          color: rgb(0 0 0 / 0.8);
        }
        .ant-row:nth-child(2) {
          border-bottom: 1px solid rgb(0 0 0 / 0.2);
          padding-bottom: 7px;
        }
      }
    }
    .history {
      &--item {
        background: linear-gradient(
            0deg,
            rgba(255, 255, 255, 0.95),
            rgba(255, 255, 255, 0.95)
          ),
          #0762f7;
        border-radius: 3px;
        padding: 20px 16px 12px;
        margin-bottom: 10px;
        .date {
          font-weight: bold;
          font-size: 16px;
          line-height: 20px;
          color: #ef4066;
          padding-bottom: 8px;
        }
        .name-hospital,
        .res-hospital {
          font-size: 14px;
          line-height: 20px;
          color: #172b4d;
          padding-bottom: 8px;
        }
        .name-hospital {
          font-weight: bold;
        }
      }
    }
    .button-bottom {
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
      .btn {
        ${button}
      }
    }
  }
  .gender {
    width: 100% !important;
  }
  p {
    margin: 0;
  }
`;

export const ButtonStyled = styled(Button)`
  @media print {
    display: none;
  }
`;
