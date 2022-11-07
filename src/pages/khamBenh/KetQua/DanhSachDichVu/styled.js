import styled, { createGlobalStyle } from "styled-components";
import { Popover } from "antd";

export const PopoverWrapper = styled(Popover)``;
export const GlobalStyle = createGlobalStyle`
  .ant-popover-inner {
    background: #FFFFFF;
    box-shadow: 0px 0px 20px rgba(9, 30, 66, 0.2);
    border-radius: 16px;
  }
`;

export const PhieuChiDinhWrapper = styled.div`
  .info-top {
    text-align: center;
    color: #0762f7;
    font-size: 14px;
  }
  .info-bottom {
    display: flex;
    justify-content: space-between;
    color: #172b4d;
    font-size: 14px;
  }
  .form-detail {
    margin-bottom: 20px;
    .group-title {
      font-style: normal;
      font-weight: bold;
      font-size: 18px;
    }
    .title-wrapper {
      display: flex;
      align-items: center;
      &__icon {
        margin-right: 8px;
      }
    }
    .child-title {
      margin-left: 7px;
      &__icon {
        font-size: 7px;
        margin-right: 10px;
        margin-left: 6px;
      }
    }
    table {
      border-bottom: 1px solid #dedede;
      .group-row-item {
        display: flex;
        &__icon {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        &__text {
          flex: 7;
          p {
            margin-bottom: 0;
          }
          .add-info {
            opacity: 0.8;
            font-style: italic;
            font-size: 13px;
          }
        }
      }
    }
    .action-btn {
      display: flex;
      justify-content: center;
      img {
        margin: 0 8px;
      }
    }
  }
  .main__container {
    .table-danh-sach{
      .ant-table-body {
        & > tr > td {
          border-bottom: 1px solid #f0f0f0;
        }
        .ant-table-tbody {
          .ant-table-row {
            &.table-row{
              background: white ;
              .ant-table-cell{
                border-bottom: 1px solid #f0f0f0;
              }
            }
            .ant-table-cell {
              &.stt-column{
                vertical-align: middle;
              }
            }
          }
        }
      }
    }
  }
`;
