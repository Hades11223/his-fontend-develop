import styled from "styled-components";
export const Main = styled.div`
  .ant-row {
    display: flex;
    justify-content: center;
    padding-top: 20px;
    .first {
      font-family: Nunito Sans;
      font-style: normal;
      font-weight: 900;
      font-size: 43px;
      line-height: 45px;
      /* identical to box height, or 103% */

      text-align: center;

      /* /#172B4D (Màu chữ chính) */

      color: #172b4d;
    }
    .second {
      padding-top: 10px;
      font-family: Nunito Sans;
      font-style: normal;
      font-weight: 900;
      font-size: 43px;
      line-height: 45px;
      /* identical to box height, or 103% */

      text-align: center;

      /* /#172B4D (Màu chữ chính) */

      color: #172b4d;
      button {
        background: #049254;
        height: 80px;
        width: 285px;
        color: #fff;
        font-family: Nunito Sans;
        font-style: normal;
        font-weight: 600;
        font-size: 43px;
        line-height: 20px;
        margin-left: 20px;
        img {
          width: 50px;
          height: 50px;
          object-fit: contain;
          margin-left: 10px;
        }
      }
    }
    .content {
      background: #fff;
      height: 567px;
      width: 932px;
      overflow-y: auto;
      span {
        cursor: pointer;
        border: 2px solid #7a869a;
        border-radius: 8px;
        width: 90%;
        height: 114px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        font-weight: 600;
        font-size: 44px;
        line-height: 60px;
      }
      span:hover {
        background: linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.25),
            rgba(0, 0, 0, 0.25)
          ),
          #0762f7;
        color: #fff;
      }
    }
  }
`;
