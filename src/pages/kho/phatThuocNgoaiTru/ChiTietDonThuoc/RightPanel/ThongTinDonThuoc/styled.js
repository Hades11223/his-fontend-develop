import styled from "styled-components";
import { Card } from "components";

export const Main = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
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
    height: 100px;
    margin-bottom: 10px;
  }
  .info {
    flex: 1;
    overflow: auto;
  }
  .footer {
    display: flex;
    justify-content: end;
    .select-row-last {
      justify-content: end;
      .button {
        background: #0762f7;
        /* mix-blend-mode: normal; */
        box-shadow: 0px 3px 0px #03317c;
        border-radius: 8px;
        font-weight: 600;
        font-size: 16px;
        text-align: center;
        color: #ffffff;
        /* padding: 8px; */
        /* line-height: 20px;
        margin-left: auto; */
        padding: 5px 10px;
        margin: 10px;
        cursor: pointer;
      }
    }
  }

  .background {
    background: linear-gradient(
        0deg,
        rgba(23, 43, 77, 0.05),
        rgba(23, 43, 77, 0.05)
      ),
      #ffffff;
    box-shadow: 0px 0px 15px rgb(9 30 66 / 7%);
    border-radius: 16px;
    .table {
      .btn-delete {
        cursor: pointer;
      }
      .ant-table-fixed-header {
        border-radius: 20px 0px 16px 16px !important;
      }
      .ant-table-header {
        table:before {
          border-top: solid 3px #e8eaed;
        }
        .ant-table-thead {
          .ant-table-cell {
            background: #fff;
          }
        }
      }
      .ant-table-container {
        tr {
          td:first-child {
            padding-left: 12px !important;
          }
        }
        tr {
          th:first-child {
            .title-box {
              padding-left: 12px;
            }
          }
          th {
            .title-box {
              padding: 7px ​14px 7px;
              height: 35px;
            }
          }
          .ant-table-cell-fix-right-first {
            right: 0px !important;
          }
        }
        .ant-table-body {
          border-radius: 0 0 16px 16px;
          /* height: calc(100vh - 665px); */
          .ant-select {
            width: 100%;
          }
          .ant-select-disabled {
            .ant-select-selector {
              border: none;
              background: transparent;
              cursor: text;
              color: #000;
            }
          }
          .ant-select-selector {
            display: block;
            min-height: 32px;
            height: auto;
            padding: 0;
            .ant-select-selection-search,
            .ant-select-selection-item,
            .ant-select-selection-placeholder {
              white-space: break-spaces;
              padding-right: 0;
            }
          }
          .ant-select-arrow {
            display: none;
          }
          .ant-table-tbody {
            .ant-table-row {
              .ant-table-cell-fix-right-first {
                right: -6px !important;
              }
            }
          }
        }
        .ant-table-tbody > tr.ant-table-row:hover > td {
          background: #c1f0db !important;
          cursor: pointer;
        }
      }
      @media (max-width: 1200px) {
        .ant-table-container {
          tr {
            td:first-child {
              text-align: center;
            }
          }
          tr {
            th:first-child {
              .title-box {
                text-align: center;
              }
            }
          }
        }
      }
    }
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

  .ant-table-placeholder {
    // display: none;
    .ant-table-cell {
      height: 278px;
    }
  }
`;
