import styled from "styled-components";
import { input, date, select } from "components/mixin";

const Main = styled("div")`
  display: flex;
  width: 100%;
  position: relative;
  height: 100%;

  & .app-contain {
    width: 100%;
    & .ant-spin-nested-loading {
      height: 100%;
      & .ant-spin-container {
        height: 100%;
      }
    }
  }
  .textError {
    color: red;
    font-size: 14px;
    line-height: 1.5715;
    color: #ff4d4f;
  }
  .ant-table-body {
    max-height: calc(100vh - 345px) !important;
    .row-edit {
      background: #f7d358 !important;
    }
  }

  // danh muc da cap
  .table-tab {
    .ant-tabs-tabpane {
      &:first-child {
        .ant-table-body {
          max-height: calc(100vh - 422px) !important;
          min-height: calc(100vh - 422px) !important;
        }
      }
      .ant-table-body {
        max-height: calc(100vh - 422px) !important;
        min-height: calc(100vh - 422px) !important;
      }
    }
  }

  // danh muc cap 1
  .create-body {
    min-height: calc(100vh - 200px) !important;
    max-height: calc(100vh - 200px) !important;
  }

  // danh muc cha con
  .parrent-wrapper {
    margin-top: 43px;
    .create-body {
      min-height: calc(100vh - 218px) !important;
      max-height: calc(100vh - 218px) !important;
    }
  }

  // item
  .ant-col {
    padding: 0 6px;
    /* margin-bottom: 20px; */
    &:first-of-type {
      padding-left: 10px;
    }
    &:last-of-type {
      padding-right: 10px;
    }
    .item-input {
      ${input}
      margin-bottom: 26px;
    }
    .item-date {
      ${date};
      margin-bottom: 26px;
    }
    .item-select {
      ${select};
      margin-bottom: 26px;
    }
  }
`;

export { Main };
