import styled from "styled-components";
import { Row } from "antd";
import { panel } from "components/mixin";

export const Main = styled(Row)`
  margin-top: 30px;
  padding: 0 30px !important;
  height: 247px;
  .pannel {
    ${panel};
    height: 65px;
    width: 100%;
    .title {
      padding: 8px 30px;
      font-weight: bold;
      font-size: 18px;
      line-height: 24px;
      color: #172b4d;
      text-align: initial;
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
          padding: 8px ​0 8px 6px;
        }
      }
    }
    .ant-table-body {
      height: 124px;
      min-height: 124px;
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
`;
