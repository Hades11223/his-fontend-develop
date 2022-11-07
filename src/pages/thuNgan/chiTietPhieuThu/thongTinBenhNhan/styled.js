import styled from "styled-components";
import { Row } from "antd";

export const Main = styled(Row)``;

export const PatientInfoWrapper = styled("div")`
  display: flex;
  .img-avatar {
    flex-basis: 20%;
    display: flex;
    margin: auto;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding-right: 5px;

    .ant-avatar,
    img {
      border-radius: 100%;
    }

    .head {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 10px;
      font-size: 18px;
      .tenNb {
        font-weight: 800;
        text-align: center;
        font-size: 13px;

        @media (min-width: 1367px) {
          font-size: 18px;
        }
      }
      .gioi-tinh {
        text-transform: uppercase;
        font-size: 12px;

        @media (min-width: 1367px) {
          font-size: 16px;
        }
      }
      .ho-so {
        display: flex;
        justify-content: center;
        font-size: 12px;

        @media (min-width: 1367px) {
          font-size: 14px;
        }

        .label {
          width: 60px;
          margin-right: 2px;
        }

        .info {
          font-weight: 700;
        }
      }
    }
  }
  .patient-information {
    flex: 1;
    font-size: 14px;
    line-height: 25px;
    font-family: Nunito Sans;
    padding: 16px;
    height: 100%;
    color: #172b4d;
    background: linear-gradient(
        0deg,
        rgba(255, 255, 255, 0.9),
        rgba(255, 255, 255, 0.9)
      ),
      #0762f7;
    border-radius: 16px;

    .flex {
      display: flex;
      .label {
        margin-right: 5px;
      }
    }

    .info {
      flex: 1;
    }

    .w150 {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      @media (max-width: 1366px) {
        width: 80px;
        min-width: 80px;
      }
      @media (min-width: 1367px) {
        width: 150px;
        min-width: 150px;
      }
    }
    .w60 {
      width: 60px;
      min-width: 60px;
    }
    .info-content {
      .custom-col {
        .info {
          font-weight: bold;
          color: #172b4d;
          /* max-width: 240px; */
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          &__highlight {
            background: #c1f0db;
          }

          &-goidv {
            white-space: normal;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          & .check-the {
            display: flex;
            align-items: center;
            margin-right: 5px;
            svg {
              width: 20px;
              height: 20px;
              cursor: pointer;
            }
          }
        }
        .status {
          font-weight: bold;
          color: #172b4d;
          /* max-width: 240px; */
          white-space: nowrap;
          overflow: inherit;
          text-overflow: ellipsis;
          &__highlight {
            background: #c1f0db;
          }
        }

        .image {
          height: 30px;
          display: flex;
          flex-direction: column;
          .icon-info {
            z-index: 9999;
          }
          img {
            margin-left: 5px;
            object-fit: contain;
          }
        }
      }
    }
    .col-3 {
      padding-bottom: 20px;
      /* @media (max-width: 1366px) {
        margin-top: 5px;
      } */
    }
  }
  & svg.icon {
    width: 20px;
    height: 20px;
    margin-left: 5px;
    cursor: pointer;
  }
`;
