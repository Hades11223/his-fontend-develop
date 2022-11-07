import styled from "styled-components";
export const Main = styled.div`
  display: flex;
  background: #f3f7ff;
  box-shadow: 0px 0px 15px rgba(9, 30, 66, 0.07);
  border-radius: 8px;
  padding: 10px;
  & .info-patient {
    width: 100%;
    margin: 0 10px;
    .info-detail {
      background: linear-gradient(
          0deg,
          rgba(255, 255, 255, 0.9),
          rgba(255, 255, 255, 0.9)
        ),
        #0762f7;
      margin-top: 10px;
      border-radius: 8px;
      padding: 10px;
      .ant-col {
        p {
          display: flex;
          margin-bottom: 5px;
        }
        .column-info {
          width: 150px;
          font-weight: 400;
          line-height: 18px;
          color: #172b4d;
        }
        .column-info-2 {
          width: 100px;
          font-weight: 400;
          line-height: 18px;
          color: #172b4d;
        }
        .text-info {
          color: #172b4d;
          font-weight: 700;
          line-height: 17px;
        }
      }
    }
  }

  & .image-patient {
    display: flex;
    align-items: center;
    justify-content: center;
    .ant-avatar {
      width: 120px !important;
      height: 100% !important;
    }
    img {
      width: 120px;
      height: 100%;
    }
  }
  .code {
    padding-right: 10px;
    border-right: 1px solid #83b0fb;
    b {
      font-size: 17px;
      font-weight: 750;
    }
  }
  .name {
    margin-left: 10px;
    b {
      font-size: 17px;
      font-weight: 750;
    }
  }
  .gender {
    font-size: 17px;
    font-weight: 500;
  }
`;
