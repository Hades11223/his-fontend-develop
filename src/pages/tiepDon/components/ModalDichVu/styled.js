import styled from "styled-components";
import { Modal } from "antd";

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
`;

export const Main = styled.div`
  .main__container {
    margin: 0 !important;
  }
  .header {
    padding: 8px 17px 8px 30px;
    flex-flow: initial;
    align-items: center;
    &__left {
      padding-right: 16px;
      white-space: nowrap;
      font-size: 18px;
    }
    &__right {
      margin-left: auto;
      font-size: 18px;
      overflow: hidden;
      max-width: 100%;
      white-space: nowrap;
      height: 35px;
    }
  }
  .content {
    background: #ffffff;
    display: flex;
    flex-direction: column;
    .info {
      max-width: 100%;
    }
    .footer {
      justify-content: end;
      display: flex;
      margin-right: 20px;
      margin-top: 40px;
      padding: 30px 0px;
      button {
        background: #0762f7;
        mix-blend-mode: normal;
        border-radius: 8px;
      }

      .ksk-button {
        background: green;
        margin-left: 20px;
      }
    }
  }
`;
export const ContentTable = styled.div`
  overflow: hidden;
  background: #ffffff;
  border-radius: 16px 0px 0px 0px;
  .main__container
    .ant-table-wrapper
    .ant-spin-nested-loading
    .ant-spin-container
    .ant-table
    .ant-table-container
    .ant-table-body {
    max-height: calc(100vh - 550px) !important;
    min-height: calc(100vh - 550px) !important;
  }
  .title-box {
    justify-content: center;
  }
`;
