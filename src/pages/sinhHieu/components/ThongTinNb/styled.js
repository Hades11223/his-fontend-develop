import styled from "styled-components";
import { Row } from "antd";

export const Main = styled(Row)``;

export const PatientInfoWrapper = styled("div")`
  display: flex;
  .img-avatar {
    flex-basis: 10%;
    display: flex;
    margin: auto;
    justify-content: center;
    padding-right: 15px;
  }
  .patient-content {
    flex: 1;
    height: 100%;
    margin: 0 10px;
    .head {
      display: flex;
      margin: 0 10px 10px 10px;
      font-size: 18px;
      .name {
        flex: 6;
        font-weight: 900;
        line-height: 25px;
        color: #172b4d;
      }
    }
  }
  .patient-information {
    font-size: 14px;
    line-height: 25px;
    font-family: Nunito Sans;
    padding: 10px 0 10px 15px;

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
    .col-3 {
      padding-bottom: 20px;
      /* @media (max-width: 1366px) {
        margin-top: 5px;
      } */
    }
  }
`;
