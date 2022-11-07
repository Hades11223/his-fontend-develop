import styled, { createGlobalStyle } from "styled-components";

export const Main = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    &__title {
      margin-right: 20px;
      font-family: Nunito Sans;
      font-style: normal;
      font-weight: bold;
      font-size: 14px;
      color: #172b4d;
    }
    .ant-picker {
      border: 2px solid #dfe1e6;
      border-radius: 3px;

      .ant-picker-input {
        input {
          font-weight: 600;
          font-size: 16px;
          color: #172b4d;
          &:placeholder-shown {
            font-weight: normal;
            color: #7a869a;
          }
        }
      }
    }
    &__spread {
      margin: 0 20px;
    }
  }
  & .right {
    display: flex;
    padding-bottom: 5px;
    & button {
      margin-left: 10px;
    }
    > span {
      display: inline-block;
      padding: 10px 6px;
      margin-right: 12px;
      border-radius: 8px;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      color: #172b4d;
      &:nth-child(1) {
        background: #c1f3f7;
      }
      &:nth-child(2) {
        background: #c1d8fd;
      }
      &:nth-child(3) {
        background: #d9c0f2;
        margin-right: 0;
      }
      .bold {
        font-weight: 900;
      }
    }
  }
`;
export const GlobalStyle = createGlobalStyle`
& .popover-thungan{
   .filter {
     
    & .title {
      margin-right: 20px;
      font-family: Nunito Sans;
      font-style: normal;
      font-weight: bold;
      font-size: 14px;
      color: #172b4d;
      min-width: 110px;
    }
    .ant-picker {
      border: 2px solid #dfe1e6;
      border-radius: 3px;

      .ant-picker-input {
        input {
          font-weight: 600;
          font-size: 16px;
          color: #172b4d;
          &:placeholder-shown {
            font-weight: normal;
            color: #7a869a;
          }
        }
      }
    }
    & .spread {
      margin: 0 20px;
    }
   }
}`;
