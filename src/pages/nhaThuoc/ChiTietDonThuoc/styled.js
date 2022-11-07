import styled from "styled-components";
export const Main = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  & .main-page {
    flex: 1;
    display: flex;
    flex-direction: column;
    & .page-body {
      flex: 1;
      display: flex;
      flex-direction: column;
      & .page-body1 {
        flex: 1;
        overflow: hidden;
        margin-left: -16px;
        & .header {
          margin-left: 16px;
        }
        & > .ant-col {
          height: 100%;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        & .col-right {
          border-left: 1px solid #83b0fb;
        }
        & .col-left {
          & .header {
            padding: 10px 0;
            padding-top: 0;
          }
          & .thong-tin-hang-hoa {
            flex: 1;
            overflow: auto;
            display: flex;
            flex-direction: column;
            .main__container,
            .danh-sach-hang-hoa,
            .ant-table-container,
            .ant-spin-nested-loading,
            .ant-spin-container,
            .ant-table,
            .main-table-wrapper {
              height: 100%;
            }
          }
        }
      }
    }
    & .header-action {
      display: inline-flex;
      margin-left: 5px;
      & .action-btn {
        cursor: pointer;
        margin-left: 10px;
        & svg {
          width: 20px;
          height: 20px;
        }
        & img {
          width: 20px;
          height: 20px;
        }
      }
    }
    & .flexc {
      display: flex;
      flex-direction: column;
    }
    & .flex1 {
      flex: 1;
    }
  }
`;
