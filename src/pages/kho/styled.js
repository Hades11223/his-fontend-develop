import styled from "styled-components";

const Main = styled("div")`
  // display: flex;
  width: 100%;
  height: 100%;
  .textError {
    color: red;
    font-size: 14px;
    line-height: 1.5715;
    color: #ff4d4f;
  }
  .ant-table-body {
    max-height: calc(100vh - 375px) !important;
    /* .row-edit {
      background: #c1f0db !important;
    } */
    min-height: calc(100vh - 375px) !important;
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
  /* .create-body {
    min-height: calc(100vh - 200px) !important;
    max-height: calc(100vh - 200px) !important;
  } */

  // danh muc cha con
  .parrent-wrapper {
    margin-top: 43px;
    .create-body {
      min-height: calc(100vh - 218px) !important;
      max-height: calc(100vh - 218px) !important;
    }
  }
`;

export { Main };
