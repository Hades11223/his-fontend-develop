import styled from "styled-components";

export const Main = styled.div`
  width: 100%;
  background: linear-gradient(0deg, #fffffff2, #fffffff2), #0762f7;
  box-shadow: 0px 0px 20px rgb(9 30 66 / 20%);
  border-radius: 16px;
  padding: 10px;

  .info-partinent {
    padding-bottom: 5px;
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
      /* padding: 0 35px; */
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
  .patient-info {
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
  }
  .patient-information {
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
      table {
        tbody {
          tr {
            td {
              padding-right: 10px;
              &:first-child {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
            }
            .info {
              font-weight: bold;
              color: #172b4d;
              white-space: nowrap;
              overflow: hidden;
            }
          }
        }
      }
    }
  }
`;
