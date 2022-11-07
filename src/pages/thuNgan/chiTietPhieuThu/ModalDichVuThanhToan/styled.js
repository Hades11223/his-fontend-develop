import { Row } from "antd";
import styled from "styled-components";

export const Main = styled(Row)`
  padding: 10px;
  height: 400px;
  .box-left {
    padding: 19px 12px 58px;
    background: #e6effe;
    border-radius: 16px;
    &__price {
      display: flex;
      justify-content: space-between;
      margin-bottom: 7px;
      border-bottom: 1px solid #d9dbe9;
      padding-bottom: 5px;
      &:last-child {
        border-bottom-width: 0;
      }
    }
    &__title {
      font-family: Nunito Sans;
      font-style: normal;
      font-weight: bold;
      font-size: 14px;
      color: #14142b;
    }
    &__detail {
      font-family: Nunito Sans;
      font-style: normal;
      font-weight: bold;
      font-size: 14px;
      color: #b3304c;
    }
  }
  .box-right {
    margin-left: 10px;
    height: 100%;
    display: flex;
    flex-direction: column;

    &__title {
      font-family: Nunito Sans;
      font-style: normal;
      font-weight: bold;
      font-size: 16px;
      color: #172b4d;
      margin-bottom: 10px;
    }
    &__table-title {
      font-family: Nunito Sans;
      font-style: italic;
      font-weight: bold;
      font-size: 16px;
      color: #049254;
      padding: 9px 20px;
    }
    &__table-content {
      .main__container {
        margin-top: 0 !important;
      }
    }
    & .mn-card {
      flex: 1;
    }
  }
`;
