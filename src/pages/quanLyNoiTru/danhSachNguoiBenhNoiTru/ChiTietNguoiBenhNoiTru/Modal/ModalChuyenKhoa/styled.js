import styled from "styled-components";

export const Main = styled.div`
  .ant-picker {
    width: 100%;
  }
  .box-left {
    font-family: Nunito Sans;
    padding: 19px 12px;
    background: #e6effe;
    border-radius: 16px;
    .info-price {
      display: flex;
      justify-content: space-between;
      padding-bottom: 5px;
      margin-bottom: 7px;
      border-bottom: 1px solid #d9dbe9;
      font-style: normal;
      font-weight: bold;
      font-size: 14px;
      &:last-child {
        border-bottom: 0;
      }
      &__title {
        color: #14142b;
      }
      &__detail {
        color: #b3304c;
      }
    }
  }
  .box-right {
    font-family: Nunito Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    .pay-title {
      font-style: normal;
      font-weight: bold;
      font-size: 16px;
      margin-bottom: 9px;
      color: #172b4d;
    }
    .price-box {
      margin: 9px 0 22px;
      padding: 19px;
      background: #fff4df;
      border-radius: 16px;
      .info-price {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #d9dbe9;
        padding-bottom: 3px;
        margin-bottom: 7px;
        font-style: normal;
        font-weight: bold;
        font-size: 18px;
        &:last-child {
          border-bottom: 0;
        }
        &__title {
          color: #14142b;
        }
        &__detail {
          color: #b3304c;
        }
      }
    }
    .text-note {
      padding-left: 20%;
      font-style: italic;
      text-align: right;
      margin-bottom: 7px;
    }

    .input-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 6px;
      &:last-child {
        margin-bottom: 0;
      }
      &__label {
        font-family: Nunito Sans;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 19px;
        color: #14142b;
      }
      &__wrap {
        width: 55%;
        .ant-input-number {
          width: 100%;
          .ant-input-number-handler-wrap {
            display: none;
          }
        }
        input {
          width: 100%;
          height: 40px;
          background: #ffffff;
          border-radius: 3px;
          text-align: right;
          &:placeholder-shown {
            text-align: right;
            font-family: Nunito Sans;
            font-style: normal;
            font-weight: 600;
            font-size: 16px;
          }
        }
      }
    }
  }
`;
