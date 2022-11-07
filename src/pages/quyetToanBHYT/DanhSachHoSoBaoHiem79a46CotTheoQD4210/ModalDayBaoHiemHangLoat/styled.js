import styled from "styled-components";

export const Main = styled.div`
  .form-custom {
    .ant-form-item {
      margin-bottom: 5px;
    }
    label {
      margin-bottom: 4px;
      line-height: 16px;
      font-size: 14px;
      font-weight: 600;
      color: #172b4d;
      &.ant-form-item-required {
        &:after {
          display: inline-block;
          margin-right: 4px;
          color: red;
          font-size: 16px;
          font-weight: 600;
          line-height: 1;
          content: "*";
        }
        &:before {
          display: none;
        }
      }
    }
    .table-service {
      background: #049254;
      border-radius: 8px;
      height: 403px;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      & .header-table {
        padding: 8px 17px 8px 20px;
        & .header-table__left {
          font-style: italic;
          font-weight: bold;
          font-size: 16px;
          line-height: 24px;
          color: #ffffff;
        }
      }
      .main__container {
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
  .main__container {
    margin: 0 !important;
    .ant-table-body {
      min-height: 322px;
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
`;
