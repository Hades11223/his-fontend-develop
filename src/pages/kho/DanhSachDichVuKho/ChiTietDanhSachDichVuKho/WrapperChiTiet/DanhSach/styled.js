import styled from "styled-components";
import { Row } from "antd";

export const Main = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  .ant-spin-nested-loading {
    height: calc(100vh - 430px);
  }
  .custome-header {
    .title-box {
      border-bottom: 0px !important;
    }
  }
  .ant-modal {
    .ant-modal-confirm {
      .ant-modal-confirm-confirm {
        .notification {
          .ant-modal-content {
            width: 100px !important;
            .ant-modal-body {
              .ant-col {
                width: 100%;
              }
            }
          }
        }
      }
    }
  }
  .notification {
    width: 100px !important;
  }

  &.main {
    position: relative;
    .box {
      &-item {
        .ant-checkbox-inner {
          border-color: #b9b9b9;
        }
      }
    }
    .header {
      .content-note {
        display: flex;
        .ant-select {
          margin-right: 10px;
          .ant-select-selector {
            border-radius: 0px;
            width: 350px;
            display: block;
            @media (max-width: 768px) {
              width: 180px;
            }
            .ant-select-selection-item {
              font-weight: 600;
              line-height: 30px;
              color: #172b4d;
            }
            .ant-select-selection-placeholder {
              color: #7a869a;
              font-weight: 600;
            }
          }
        }
        .input-text {
          img {
            position: absolute;
            z-index: 6;
            bottom: 30px;
            margin-left: 10px;
          }
          .ant-input {
            background: #ffffff;
            border-radius: 17px;
            font-size: 14px;
            line-height: 24px;
            color: #172b4d;
            font-weight: 600;
            padding-left: 36px;
            width: 254px;
            @media (max-width: 768px) {
              width: 200px;
            }
            &::placeholder {
              color: #7a869a;
            }
          }
        }
        .icon-option {
          padding: 5px 0 0 14px;
          & img {
            cursor: pointer;
          }
          & img:first-child {
            padding-right: 16px;
          }
        }
      }
    }
    .ant-table-body {
      height: 430px;
      max-height: unset !important;
      tr {
        td:first-child {
          padding-left: 12px !important;
        }
      }
      .box-item {
        .ant-checkbox {
          input:focus + span {
            border: 1px solid #1890ff;
            border-color: #1890ff;
          }
        }
      }
    }
    .ant-table-tbody {
      .ant-table-cell {
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        padding: 10px !important;
        &:first-child {
          .title-box {
            padding-left: 12px !important;
          }
        }
        .ant-checkbox-wrapper {
          margin-left: 5px;
        }
      }
      .background-checked {
        background: #1c8aea47;
      }
    }
    .ant-table-tbody > tr.ant-table-row:hover > td {
      background: #c1f0db !important;
      cursor: pointer;
    }
    .ant-table-header {
      /* border-top: 4px solid #56ccf2; */
      border-radius: 20px 0px 0px 0px;
    }
    .table {
      /* margin-top: -12px; */
      border: 1px solid #ececec;
      .ant-table {
        .ant-table-container {
          .ant-table-header {
            .ant-table-cell {
              background: white;
            }
            table::before {
              /* border-top: solid 4px #ef4066; */
              /* border-top: none; */
              border-radius: unset;
            }
          }
        }
      }
    }
    .ant-pagination {
      margin-left: auto;
    }
  }
`;

export const SelectStyled = styled.div``;

export const Header = styled.div`
  position: relative;
  width: 100%;
  .header {
    padding: 0 30px 0 30px;
    display: flex;
    align-items: center;
    background-color: white;
    box-shadow: 0px 3px 5px rgba(9, 30, 66, 0.2),
      0px 0px 1px rgba(9, 30, 66, 0.31);
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    width: 100%;
    height: 40px;
    padding-left: 16px;

    &-row {
      width: 100%;
      height: 100%;
      align-items: center;
      /* padding-bottom: 10px; */
      justify-content: space-between;
    }
    .content {
      margin-top: 3px;
      /* padding-top: 10px; */
      font-family: Nunito Sans;
      font-size: 16px;
      font-style: normal;
      font-weight: 700;
      /* line-height: 24px; */
      &-note {
        /* margin-top: -17px; */
        font-size: 14px;
        margin-left: 14px;
        height: 30px;
        /* line-height: 24px; */
        color: white;
        span {
          font-weight: 900;
        }
      }
      @media screen and (min-width: 1200px) and (max-width: 1599px) {
        font-size: 15px !important;
        &-note {
          font-size: 11px;
        }
      }
    }
  }
`;
