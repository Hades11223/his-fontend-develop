import styled from "styled-components";
export const Main = styled.div`
  background-color: white;
  border-radius: 10px;
  .title {
    padding: 5px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #d3d7de;

    .search-select {
      background: #ffffff;
      border: 2px solid #dfe1e6;
      box-sizing: border-box;
      border-radius: 5px;
      display: flex;
      align-items: center;
      margin-left: 5px;
      height: 32px;
      img {
        padding-left: 7px;
      }
      .ant-select-open {
        border: none;
      }
      .ant-select-selector {
        height: 28px;
        border: none;
        box-shadow: none !important;
        .ant-select-selection-item {
          font-weight: 600;
          line-height: 10px;
          color: #172b4d;
        }
        &:focus {
          border: none;
          box-shadow: none;
        }
        &::placeholder {
          color: #7a869a;
        }
      }
    }
    .title-left {
      display: flex;
      h3 {
        margin-bottom: 0;
        padding-left: 10px;
        font-weight: bold;
        font-size: 18px;
      }
    }
    .title-right {
      display: flex;
      /* .ant-select {
        margin-left: 10px;
        width: 130px;
      } */
    }
  }

  .ant-table-body {
    min-height: 100px;
  }

  table {
    border-collapse: collapse;
    .ant-table-cell {
      background-color: white;
      color: #03317c;
      padding: 8px;
    }
    .none-border-top {
      border-top: none;
    }
    th {
      font-weight: bold;
      border-top: 1px solid #c5cad3;
      border-bottom: 1px solid #c5cad3;
      border-right: 1px solid #c5cad3;
      .title-box {
        align-items: center;
      }
    }
    tr:hover {
      td {
        background-color: #c1f0db !important;
      }
    }
    tr:nth-child(odd) {
      td {
        background-color: #e8eaed;
      }
    }
    td {
      border-right: 1px solid #c5cad3;
      background-color: white;
      font-weight: bold;
    }
    td:nth-child(1),td:nth-child(2) {
      font-weight: normal !important;
    }
    
    input,
    .ant-picker,
    .ant-select-selector {
      border-top: none;
      border-right: none;
      border-left: none;
    }
  }
`;
