import styled from "styled-components";
import { Modal } from "antd";

export const Main = styled.div`
  margin: 10px;
  .info-content {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    height: 100%;

    .ant-form-item-label
      > label.ant-form-item-required:not(.ant-form-item-required-mark-optional)::before {
      content: none;
    }

    .ant-form-item-label
      > label.ant-form-item-required:not(.ant-form-item-required-mark-optional)::after {
      display: inline-block;
      margin-right: 4px;
      color: #ff4d4f;
      font-size: 14px;
      line-height: 1;
      content: "*";
    }
  }

  .success-title {
    background: #fc3b3a;
    border-radius: 16px;
    padding: 8px 12px;
    margin: 16px;
    display: flex;
    align-items: center;

    span {
      color: #fff;
      font-size: 14px;
      font-weight: 900;
    }

    .check-icon {
      font-size: 24px;
      padding-right: 10px;
    }
  }

  .company-info {
    background-color: #e7f0fe;
    border-radius: 8px;
    margin: 8px 16px;
    padding: 10px;

    .info {
      padding-right: 10px;
      font-size: 13px;
      line-height: 18px;

      .detail {
        font-weight: 700;
      }
    }
  }

  .header {
    background-color: #0762f7;
    color: #fff;
    padding: 12px;
    font-size: 16px;
  }

  .ant-picker {
    width: 100%;
  }

  label {
    font-weight: 600;
    font-size: 13px;
    line-height: 18px;
    color: #172b4d;
  }

  .hopdong-table-title {
    font-weight: 600;
    font-size: 13px;
    line-height: 18px;
    color: #172b4d;
    margin: 10px 0;

    .anticon {
      margin-left: 10px;
      font-size: 16px;
      color: #0762f7;
    }
  }

  .last-field {
    margin-top: 20px;
  }
`;

export const ModalStyled = styled(Modal)`
  padding: 0;

  .ant-modal-content {
    background: #f4f5f7;
    box-shadow: 0px 0px 20px rgba(9, 30, 66, 0.2);
    border-radius: 16px;
    font-family: Nunito Sans, sans-serif;
    .ant-modal-body {
      padding: 0;
    }
    overflow: hidden;
  }

  .ant-select {
    width: 100%;
  }

  .header-title {
    display: flex;
    justify-content: space-between;

    .title {
      font-weight: 700;
      font-size: 16px;
      line-height: 22px;
    }

    .title-goi {
      text-transform: uppercase;
      font-weight: 700;
      font-size: 16px;
      line-height: 22px;
    }
  }
`;
