import styled from "styled-components";
import { Modal } from "antd";

export const ModalStyled = styled(Modal)`
  padding: 0;
  .ant-modal-content {
    background: #f4f5f7;
    box-shadow: 0px 0px 20px rgba(9, 30, 66, 0.2);
    border-radius: 16px;
    font-family: Nunito Sans, sans-serif;
    height: 809px;
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
      white-space: nowrap;
      font-size: 18px;
      display: flex;
      .dichvu {
        padding-right: 16px;
      }
      .chandoan{
        border-left: 1px solid #172b4d;
        padding-left: 16px;
      }
    }
    &__right {
      padding-left: 16px;
      font-size: 18px;
      overflow: hidden;
      max-width: 100%;
      white-space: nowrap;
      margin-left: auto;
      
    }
  }
  .service {
    border-radius: 16px 0px 0px 0px;
    background: #ffffff;
    height: 442px;
    & .info-content {
      height: 330px;
      display: flex;
      & .custom-col {
        margin-left: 30px;
        flex: 4;
        table {
          tbody {
            tr {
              height: 40px;
              td {
                padding-right: 30px;
                &:first-child {
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  max-width: 200px;
                }
              }
              & .info {
                font-weight: bold;
                color: #172b4d;
                max-width: 250px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
            }
          }
        }
      }
    }
    & .btn_back {
      width: 123px;
      height: 36px;
      background: #ffffff;
      mix-blend-mode: normal;
      margin-left: 30px;
      border: 1px solid #0762f7;
      box-shadow: 0px 3px 0px #03317c;
      border-radius: 8px;
    }
  }
  .element-page {
    min-height: calc(100vh - 355px);
    margin-top: 10px;
    &:last-child {
      padding-bottom: 25px;
    }
  }
`;
