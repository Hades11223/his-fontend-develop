import styled, { createGlobalStyle } from "styled-components";

export const Main = styled.div`
  margin: 20px auto;
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
        .ant-table-cell {
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

    .ant-table-body {
      height: calc(100vh - 435px) !important;
    }
  }
  .ant-image {
    margin-left: 5px;
  }
  & svg.icon {
    width: 22px;
    height: 22px;
  }
  & .header-table {
    padding: 3px 16px !important;
  }
`;

export const GlobalStyle = createGlobalStyle`
 & .popover-cdha {
    .ant-popover-inner-content {
      padding: 0px;
    }
    .option {
      cursor: pointer;
      & .item {
        padding: 10px 16px;
        span {
          padding-left: 10px;
        }
      }
      & .item:hover {
        background: #c1f0db;
      }
    }
  }
  .popover-cdha-dieu-tri {
    min-width: 200px;
    & .nhat-ky {
      display: flex;
      flex-direction: column;
      span {
       min-width: 250px;
       cursor: pointer;
      }
    }
  }
`;
