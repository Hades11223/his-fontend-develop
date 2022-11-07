import styled from "styled-components";
export const Main = styled.div`
  height: 100%;
  margin: 10px;

  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-bottom: 16px;
    font-weight: 700;
    font-size: 16px;
    color: #172b4d;
    margin-bottom: 16px;

    label {
      font-size: 20px;
    }
  }

  .block-name {
    display: block !important;

    .name {
      color: #172b4d;
      font-weight: 400;
      font-size: 14px;
    }

    .name-note {
      font-weight: 400;
      font-size: 13px;
      font-style: italic;
    }
  }

  .ant-table-body {
    .ant-table-tbody {
      .ant-table-row {
        &:nth-child(2n) {
          td {
            background-color: #fff !important;
          }
        }
      }
    }
  }

  .ant-table-thead > tr > th {
    border-bottom: 1px solid rgba(224, 224, 224, 1) !important;
  }

  .ant-table-tbody > tr > td {
    border-bottom: 1px solid rgba(224, 224, 224, 1) !important;
  }

  .ant-table-tbody {
    .ant-table-cell {
      > div {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          height: auto;
          width: 70px;
        }
      }
    }
  }

  .ant-input-affix-wrapper {
    background-color: unset !important;
    border: none;
  }

  .table-content {
    height: calc(100% - 50px);
  }
`;
