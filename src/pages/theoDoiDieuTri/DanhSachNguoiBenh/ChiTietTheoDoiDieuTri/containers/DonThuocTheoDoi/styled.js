import styled from "styled-components";
export const Main = styled.div`
  width: 100%;
  border-radius: 5px;
  height: 100%;

  .title {
    height: 44px;
    padding: 10px;
    font-size: 16px;
    font-weight: bold;
  }
  .ant-row {
    .content {
      box-shadow: 0px 0px 15px rgba(9, 30, 66, 0.07);
      border-radius: 5px;
      padding: 8px;
      margin: 16px;
      width: 100%;
    }
    h1 {
      font-weight: bold;
      font-family: Nunito Sans;
      font-style: normal;
      font-weight: bold;
      font-size: 16px;
      line-height: 24px;
    }
    h2 {
      padding-left: 10px;
      font-family: Nunito Sans;
      font-style: normal;
      font-weight: bold;
      font-size: 16px;
      line-height: 24px;
    }

    .info {
      display: flex;
      img {
        margin-left: auto;
        object-fit: contain;
        margin-right: 10px;
      }
      span {
        padding-left: 20px;
      }
    }
    .lieuDung {
      .ant-select {
        width: 100%;
      }
      .image {
        float: right;
        display: flex;
        margin-right: 30px;
        padding-top: 10px;
        img {
          object-fit: contain;
          margin-left: 10px;
        }
        .cancel {
          display: flex;
          margin-right: 20px;
        }
        .save {
          display: flex;
        }
      }
    }
    .header {
      display: flex;
      width: 100%;
      padding: 0px 20px 0px 20px;
      align-items: center;
      padding-top : 10px;
      border-bottom: 1px solid #f0f0f0;
      img {
        object-fit: contain;
        margin-left: auto;
      }
    }
  }
`;
