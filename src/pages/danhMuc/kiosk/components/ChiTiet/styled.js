import styled from "styled-components";
export const Main = styled.div`
  height: 100%;
  .form-custom {
    .ant-form-item {
      width: 100% !important;
    }
  }
  .content {
    .table {
      .ant-row {
        @media screen and (max-width: 1920px) {
          width: calc(100vw - 1200px) !important;
        }
        @media screen and (max-width: 1600px) {
          width: calc(100vw - 1000px) !important;
        }
        @media screen and (max-width: 1366px) {
          width: calc(100vw - 850px) !important;
        }
      }
    }
  }
  .form-custom {
    .ant-form-item {
      width: 100% !important;
    }
  }
  .content {
    .table {
      .ant-row {
        @media screen and (max-width: 1920px) {
          width: ${(props) =>
            !props.collapseStatus
              ? "calc(100vw - 1161px) !important"
              : "calc(100vw - 705px) !important"};
        }
        @media screen and (max-width: 1600px) {
          width: ${(props) =>
            !props.collapseStatus
              ? "calc(100vw - 975px) !important"
              : "calc(100vw - 600px) !important"};
        }
        @media screen and (max-width: 1366px) {
          width: ${(props) =>
            !props.collapseStatus
              ? "calc(100vw - 840px) !important"
              : "calc(100vw - 520px) !important"};
        }
      }
    }
  }
  .ant-row {
    .main__container {
      margin-top: 0px;
      .ant-table-body {
        min-height: calc(100vh - 660px) !important;
      }
    }
  }
  .time {
    margin-top: 15px;
  }
`;
