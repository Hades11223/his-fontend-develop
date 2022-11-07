import { Collapse } from "antd";
import styled from "styled-components";

export const CollapseWrapper = styled(Collapse)`
  background-color: #fff !important;
  .ant-collapse-item {
    border-bottom: none !important;
    .ant-collapse-header {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      font-weight: 700;
      font-size: 18px;
      line-height: 25px;
      color: #172b4d;

      .ant-collapse-arrow {
        position: initial !important;
        margin: 0 15px 0 0 !important;
        padding: 0 !important;
      }
    }

    .ant-collapse-content {
      .ant-row {
        align-items: center;
      }
    }
  }

  .sub-label {
    margin-top: -10px;
  }
`;

export const TableCollapse = styled("table")`
  width: 100%;

  td,
  th {
    border: 1px solid #dddddd;
    padding: 8px;
  }

  td {
    text-align: left;
  }

  .td-content {
    width: 75%;
  }

  .td-bacsy {
    width: 25%;
  }
`;
