import styled from "styled-components";

export const Main = styled.div`
  padding: 16px;
  & .thong-tin-phieu-thu {
    display: flex;

    .box-left {
      flex: 1;
      margin-right: 5px;
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
          font-weight: 700;
          font-size: 16px;
          line-height: 22px;
        }
        &__detail {
          color: #b3304c;
          font-weight: 700;
          font-size: 16px;
          line-height: 22px;
        }
      }
    }

    .box-right {
      flex: 1;
      margin-left: 5px;
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
  }
  & .text-note {
    font-style: normal;
    margin-bottom: 7px;
    font-size: 14px;
    line-height: 19px;
    padding-top: 15px;
  }
  & .row-box {
    background: #ffffff;
    border-radius: 4px;
    border: 1px solid #cacaca;
    padding: 12px;
    margin-bottom: 10px;
    & .ant-col {
      display: flex;
      align-items: center;
      &:first-of-type {
        padding-right: 10px;
      }
      & .row-label {
        font-family: "Nunito Sans";
        font-style: normal;
        font-weight: 600;
        font-size: 13px;
        line-height: 18px;
        margin-right: 5px;
        display: flex;
        align-items: center;

        /* /#172B4D (Màu chữ chính) */

        color: #172b4d;
        width: 100px;
      }
      & .ant-select,
      & .ant-input,
      & .ant-input-number {
        flex: 1;
      }
      & .ant-input-number {
        text-align: right;
        & input {
          text-align: right;
          padding-right: 30px;
        }
      }
    }
    & .soTienThanhToanGoi {
      font-weight: bold;
      text-align: right;
    }
  }
`;
