import styled from "styled-components";
import { Col } from "antd";

export const Main = styled(Col)`
  display: flex;
  flex-direction: column;

  .info {
    flex: 1;

    .ant-row {
      align-items: baseline;
      padding: 5px 0;
    }

    &-trang-thai {
      color: #0762f7;
      font-weight: 700;
    }

    &-phan-hoi {
      background: linear-gradient(
          0deg,
          rgba(23, 43, 77, 0.25),
          rgba(23, 43, 77, 0.25)
        ),
        #ffffff;
      border-radius: 3px;
    }
  }

  .container {
    font-family: Nunito Sans !important;
    padding: 10px;
    width: 100%;
    .row_paid {
      align-items: center;
      justify-content: space-between;
    }
    .hr {
      margin: 5px -10px 5px;
      border: 0;
      border-top: 1px solid #c9c7c7;
    }
    .title {
      font-size: 16px;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .title-1 {
      font-size: 14px;
      line-height: 30px;
      margin-top: 10px;
    }
    .title-2 {
      font-size: 14px;
      line-height: 28px;
      /* margin-top: 10px; */
    }
    .select-row-1 {
      margin-bottom: 5px;
      .ant-select {
        margin-top: 4px;
        width: 100%;
      }
    }
    .select-row-2 {
      justify-content: space-between;
    }
    .title-item {
      font-size: 16px;
      font-weight: 400;
      margin-top: 5px;
    }
    .textarea {
      width: 100%;
      height: 25px;
      margin-bottom: 10px;
    }

    & .col-action {
      display: flex;
      justify-content: center;
      align-items: center;
      & img {
        width: 16px;
        height: 16px;
      }
    }
  }

  .select-row-last {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;

    .ant-col {
      margin: 0 2px;
    }
  }
`;
