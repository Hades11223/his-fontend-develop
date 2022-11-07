import styled from "styled-components";

export const Main = styled.div`
  height: 100%;
  .custom-nestedtable {
    .ant-table-row-level-0:first-child {
      .ant-table-selection-column {
        background: #054ab9 !important;
      }
    }
    .ant-table-row-level-1 {
      .ant-table-selection-column {
        label {
          display: none;
        }
      }
    }
    .sophieu {
      &:hover {
        .ant-table-selection-column {
          background-color: #054ab9 !important;
        }
      }
      .ant-table-selection-column {
        background-color: #054ab9;
      }
    }
    .ant-table-cell-with-append {
      direction: rtl;
    }
    textarea {
      resize: none;
    }
    .ant-table-body {
      height: calc(100vh - 430px) !important;
      .ant-table-cell-fix-right {
        background-color: #e6f7ff !important;
        img {
          cursor: pointer;
        }
      }
      .input-center {
        text-align: center;
      }
      .input-left {
        color: red;
        font-size: 16px;
        text-align: left;
        font-weight: 900;
      }
      .input-right {
        color: red;
        font-size: 16px;
        text-align: right;
        font-weight: 900;
      }
    }
  }
`;
