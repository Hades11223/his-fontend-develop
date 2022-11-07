import { Page } from "components";
import styled from "styled-components";
export const MainPage = styled(Page)`
  font-family: "Nunito Sans";
  font-size: 14px;
  background-color: #f3f4f7;
  display: flex;
  flex-direction: column;
  height: 100%;

  & .main-page .page-body.ant-row {
    width: 100%;
    margin-top: 16px;
    flex-direction: column;
  }

  & .main-page {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .wrap-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      /* overflow-y: auto; */
      .ant-tabs-top {
        .ant-tabs-nav {
          margin-bottom: 8px;
        }
      }
      .tab-content {
        flex: 1;
        margin-bottom: 0;
        padding-bottom: 10px;
      }
      .ant-tabs-nav-list {
        .ant-tabs-tab {
          padding: 11px 16px;
          margin: 0;
          .ant-tabs-tab-btn {
            color: #7a869a;
            font-size: 16px;
          }
          &.ant-tabs-tab-active {
            .ant-tabs-tab-btn {
              font-weight: 700;
              color: #172b4d !important;
            }
          }
        }
        .ant-tabs-ink-bar {
          background: #0762f7 !important;
          height: 2px;
        }
      }
    }
    & .page-wrapper {
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
    & .header {
      display: flex;
      & .header-action {
        display: flex;
        margin-left: 5px;
        & .action-btn {
          cursor: pointer;
          & svg {
            width: 20px;
            height: 20px;
            margin-left: 10px;
            transform: translateY(5px);
          }
        }
      }
    }

    & .item-select {
      & .label {
        margin-bottom: 5px;
        line-height: 17px;
      }
    }
  }
  .footer-btn {
    display: unset;
    & .left {
      width: 100%;
      & .action {
        width: 100%;
        display: flex;
        justify-content: space-between;
      }
    }
  }
`;
