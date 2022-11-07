import styled from "styled-components";

export const Main = styled.div`
  margin: 10px;

  .summary-text {
    color: #0762f7;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 19px;
    margin: 10px;
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

  .input-slnv {
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 6 6"><circle cx="3" cy="3" r="0.4" fill="black" /></svg>')
      20px;
    background-position-y: 10px;
    background-size: 5px 25px;
    border: none;
    width: 50px;
  }
`;

export const ContentTable = styled.div`
  overflow: hidden;
  background: #ffffff;
  /* border-radius: 16px; */

  .ant-table-body {
    height: 100% !important;
    max-height: unset !important;
  }
`;
