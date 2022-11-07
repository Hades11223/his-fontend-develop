import styled from "styled-components";

const Main = styled("div")`
  display: flex;
  width: 100%;
  position: relative;
  // min-height: calc(100vh - 60px);

  & .app-contain {
    width: 100%;
    //   height: 100%;
    //   flex: 1;
    //   overflow: hidden;
    //   @media (max-width: 1300px) {
    //     margin-right: 80px;
    //   }
    //   @media (max-width: 600px) {
    //     margin-right: 60px;
    //   }
    //   @media (max-width: 450px) {
    //     margin-right: 50px;
    //   }
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
`;

export { Main };
