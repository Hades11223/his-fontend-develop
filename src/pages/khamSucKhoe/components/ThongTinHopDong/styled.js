import styled from "styled-components";

export const Main = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  .ant-form-item {
    margin: 0 10px;
  }

  .hopdong-title {
    color: #172b4d;
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
    margin: 8px 0;
  }

  .hopdong-form {
    margin-bottom: 16px;
  }

  .hopdong-table-title {
    color: #172b4d;
    font-weight: 700;
    font-size: 13px;
    line-height: 18px;
  }

  .payment-table-title {
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
    color: #172b4d;
    margin-bottom: 8px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    label {
      font-size: 20px;
    }

    .button-header {
      background: #049254;
      border-radius: 8px;
      border: none;
      display: flex;
      align-items: center;
      padding: 5px 15px;
      margin: 5px 0px;
      height: auto;
      font-weight: 600;
      font-size: 16px;
      color: #ffffff;

      img {
        margin-left: 5px;
      }
    }
  }

  .button-save {
    padding: 10px;

    button {
      background-color: #0762f7;
      border-radius: 8px;
    }
  }

  .ant-picker {
    width: 100%;
  }

  .ic-action {
    display: flex;
    justify-content: space-around;
    align-items: center;

    font-size: 20px;
  }
`;
