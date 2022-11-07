import styled from "styled-components";
import { Modal } from "antd";

export const ModalStyled = styled(Modal)`
  padding: 0;
  .ant-modal-content {
    background: #f4f5f7;
    box-shadow: 0px 0px 20px rgba(9, 30, 66, 0.2);
    border-radius: 16px;
    font-family: Nunito Sans, sans-serif;
    min-height: 514px;
    .ant-modal-body {
      padding: 0;
      .ant-row {
        width: 100%;

        .table-service {
          background: #049254;
          border-radius: 8px;
          height: 345px;
          & .header-table {
            padding: 8px 17px 8px 20px;
            display: flex;
            & .header-table__left {
              font-style: italic;
              font-weight: bold;
              font-size: 16px;
              line-height: 24px;
              color: #ffffff;
            }
            & .header-table__right {
              font-weight: bold;
              font-size: 16px;
              line-height: 24px;
              color: #ffffff;
              margin-left: auto;
            }
          }
          .main__container {
            .ant-table-wrapper {
              height: 315px;
            }
            .ant-table-container {
              border: 2px dashed #049254;
              border-top: 0;
              .ant-table-header {
                .ant-table-thead {
                  .custome-header {
                    min-height: 40px !important;
                    .title-box {
                      min-height: 40px !important;
                      display: flex;
                      justify-content: center;
                    }
                  }
                }
              }
            }
          }
        }
        .footer {
          justify-content: end;
          margin-top: 70px;
          .btn-cancel {
            background: #ffffff;
            mix-blend-mode: normal;

            border: 1px solid #0762f7;
            box-shadow: 0px 3px 0px #03317c;
            border-radius: 8px;
            width: 94px;
            height: 36px;
            margin-right: 10px;
          }
          .btn-save {
            background: #0762f7;
            mix-blend-mode: normal;
            box-shadow: 0px 3px 0px #03317c;
            border-radius: 8px;
            color: #fff;
            width: 85px;
            height: 36px;
          }
        }
      }
    }
    overflow: hidden;
  }
`;

export const Main = styled.div`
  .main__container {
    margin: 0 !important;
    .ant-table-body {
      min-height: 265px;
    }
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
  .input-search {
    display: flex;
    border: 2px solid #dfe1e6;
    position: relative;
    height: 34px;
    width: 100%;
    img {
      top: 29%;
      left: 0;
      z-index: 1;
      padding: 0 8px;
      position: absolute;
    }
    input {
      border: none;
      padding-left: 24px;
      font-weight: 600;
      font-size: 14px;
    }
  }
`;
