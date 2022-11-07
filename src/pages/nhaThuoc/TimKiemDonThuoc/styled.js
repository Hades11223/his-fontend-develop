import styled from "styled-components";
export const Main = styled.div`
  width: 100%;
  .title {
    display: flex;
    width: 100%;
    .btn_new {
      display: flex;
      align-items: center;
      width: 135px;
      height: 32px;
      color: #ffffff;
      background: #049254;
      mix-blend-mode: normal;
      border-radius: 8px;
      margin-left: auto;
      align-items: center;
      text-align: center;
      button {
        height: auto;
        border: 1px solid #049254;
        box-shadow: 0px 3px 0px #026138;
        font-weight: 600;
        font-size: 16px;
      }
      span {
        font-family: Nunito Sans;
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 20px;
        margin-left: -6px;
      }
      img {
        padding-left: 6px;
      }
    }
    label {
      font-family: Nunito Sans;
      font-style: normal;
      font-weight: bold;
      font-size: 20px;
      line-height: 24px;
      color: #172b4d;
      width: 195px;
      height: 24px;
    }
  }
  .array-store {
    display: flex;
    margin-top: 5px;
    margin-bottom: 5px;

    .item {
      background: linear-gradient(
          0deg,
          rgba(255, 255, 255, 0.75),
          rgba(255, 255, 255, 0.75)
        ),
        #0762f7;
      border-radius: 3px;
      margin-right: 6px;
      min-width: 100px;
      padding: 0px 5px 0px 5px;
      display: flex;
      img {
        object-fit: contain;
        margin-left: auto;
      }
    }
  }
`;
