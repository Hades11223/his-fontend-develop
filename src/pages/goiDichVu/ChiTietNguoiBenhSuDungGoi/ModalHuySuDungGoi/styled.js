import styled from "styled-components";
export const Main = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  & .thong-tin-so-tien {
    margin-bottom: 18px;
    & .tien-tra-lai {
      background: #fff4df;
      border-radius: 4px;
      padding: 8px;
      height: 100%;
    }
    & .tien-thanh-toan {
      background: #e6effe;
      border-radius: 4px;
      padding: 8px;
      height: 100%;
    }
  }
  & .text-item {
    margin: 5px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    & .text-label {
      font-family: "Nunito Sans";
      font-style: normal;
      font-weight: 700;
      font-size: 18px;
      line-height: 25px;
      /* identical to box height */

      /* Grayscale / Title-Active */

      color: #14142b;
    }
    & .text-content {
      font-family: "Nunito Sans";
      font-style: normal;
      font-weight: 700;
      font-size: 18px;
      line-height: 25px;
      /* identical to box height */

      text-align: right;

      color: #b3304c;
    }
  }
  & .luuY {
    font-family: "Nunito Sans";
    font-style: normal;
    font-weight: 600;
    font-size: 13px;
    line-height: 18px;
    margin-top: 15px;
    color: #172b4d;
  }
  & .lyDo {
    font-family: "Nunito Sans";
    font-style: normal;
    font-weight: 600;
    font-size: 13px;
    line-height: 18px;
    /* identical to box height */

    display: flex;
    align-items: center;

    /* /#172B4D (Màu chữ chính) */

    color: #172b4d;
  }
`;
