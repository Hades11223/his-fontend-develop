import styled from "styled-components";
import { Row } from "antd";

export const Main = styled(Row)``;

export const PatientInfoWrapper = styled("div")`
  display: flex;
  padding: 7px 12px;
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
    .head {
      display: flex;
      margin: 10px;
      font-size: 18px;
      color: #0762f7;
      font-weight: 900;
      font-size: 14px;
      line-height: 19px;
      .name {
        font-weight: 900;
        line-height: 25px;
        color: #172b4d;
        padding-left: 10px;
      }
      .benhAn {
        border: 1px dashed #0762f7;
        box-sizing: border-box;
      }
      img {
        margin-left: 10px;
        object-fit: contain;
        cursor: pointer;
      }
    }
    .patient-information {
      flex: 1;
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
        width: 150px;
        min-width: 150px;
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
        .custom-button{
          display: flex;
          justify-content: end;
        }
      }
      .col-3 {
        margin-top: -25px;
        padding-bottom: 20px;
        @media (max-width: 1366px) {
          margin-top: 5px;
        }
      }
    }
  }
`;
