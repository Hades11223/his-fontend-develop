import styled from "styled-components";

export const ButtonWrapper = styled.div``;

export const Main = styled.div`
  font-family: Nunito Sans;
  .input-option {
    width: 150px;
  }
  .row-item {
    margin-top: 20px;
    height: 30px;
    align-items: center;
    &.first {
      margin-top: 0px;
    }
    &.right {
      border-bottom: 1px solid #cecece;
    }
  }
  .container-right {
    background-color: #d5f1e5;
    border-radius: 4px;
    padding-bottom: 10px;
    height: fit-content;
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
  .text-note {
    font-style: normal;
    text-align: right;
    margin-bottom: 7px;
    font-size: 14px;
    line-height: 19px;
    padding-top: 15px;
  }

  .box-right {
    font-family: Nunito Sans;
    padding: 19px 12px;
    background: #fff4df;
    border-radius: 16px;
    .pay-title {
      font-style: normal;
      font-weight: bold;
      font-size: 16px;
      margin-bottom: 9px;
      color: #172b4d;
    }

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

  .box-second {
    width: 100%;
    .content {
      border-radius: 4px;
      display: flex;
      border: 1px solid #bfbfbf;
      padding: 12px 0px;
      margin-top: 10px;
      .ant-form-item {
        width: 45%;
        margin-left: 10px;
        margin-bottom: 0;
      }
      .ant-form-item:nth-child(2n) {
        margin-left: 50px;
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
          width: 60%;
          .ant-input-number {
            width: 100%;
            .ant-input-number-handler-wrap {
              display: none;
            }
          }
          input {
            width: 100%;
            height: 32px;
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
  }
`;
