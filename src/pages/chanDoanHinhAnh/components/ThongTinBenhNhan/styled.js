import styled from "styled-components";

export const Main = styled.div`
  .info-partinent {
    padding-bottom: 18px;
    align-items: center;
    margin: 0 !important;
    &__index {
      font-weight: 900;
      font-size: 16px;
      color: #0762f7;
      border: 1px dashed #0762f7;
      padding: 8px;
    }
    &__name {
      padding: 0 35px;
      font-size: 18px;
      line-height: 25px;
      color: #172b4d;
      span {
        font-weight: 900;
        text-transform: uppercase;
      }
    }
  }
`;

export const PatientInfoWrapper = styled("div")`
  display: flex;
  .img-avatar {
    flex-basis: 10%;
    display: flex;
    margin: auto;
    justify-content: center;
    padding-right: 15px;
  }
  .patient-information {
    flex: 1;
    font-size: 14px;
    line-height: 25px;
    font-family: Nunito Sans;
    padding: 10px 0 10px 15px;
    height: 100%;
    color: #172b4d;
    background: linear-gradient(
        0deg,
        rgba(255, 255, 255, 0.9),
        rgba(255, 255, 255, 0.9)
      ),
      #0762f7;
    border-radius: 16px;
    .info-content {
      display: flex;
      .custom-col {
        flex: 4;
        table {
          tbody {
            tr {
              td {
                padding-right: 10px;
                &:first-child {
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  max-width: 200px;
                  @media (max-width: 1366px) {
                    max-width: 100px;
                  }
                }
              }
              .info {
                font-weight: bold;
                color: #172b4d;
                max-width: 250px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                @media (max-width: 1366px) {
                  max-width: 150px;
                }
              }
            }
          }
        }
      }
      .col-2 {
        flex: 2;
      }
    }
  }
`;
