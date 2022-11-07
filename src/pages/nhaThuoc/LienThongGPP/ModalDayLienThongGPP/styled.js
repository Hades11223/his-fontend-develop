import styled from "styled-components";

export const Main = styled.div`
  & .table-content {
    overflow: hidden;
    background: #ffffff;
    border-radius: 16px;
    margin: 0 20px;

    .ant-table-body {
      height: 100% !important;
      max-height: unset !important;
    }

    .home-title label {
      font-weight: 700;
      font-size: 16px;
      line-height: 22px;
      color: #172b4d;
      padding: 10px 0;
    }

    .main-table-wrapper {
      height: 450px;
    }
  }

  .footer-action {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: 10px 16px;
    padding-top: 16px;
    & .selected-item {
      flex: 1;
    }
  }

  .info-content {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    height: 100%;
  }

  .success-title {
    background: green;
    border-radius: 16px;
    padding: 8px 12px;
    margin: 16px;
    display: flex;
    align-items: center;

    span {
      color: #fff;
      font-size: 14px;
      font-weight: 900;
    }

    .check-icon {
      font-size: 24px;
      padding-right: 10px;
    }
  }

  .success-content {
    margin: 5px 16px;

    .filter-field {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin: 0 20px;

      label {
        width: 80px;
        margin-right: 10px;
      }
    }

    /* label {
      font-weight: 600;
      font-size: 13px;
      line-height: 18px;
      color: #172b4d;
      padding: 5px 0;
    } */

    .text {
      margin-bottom: 5px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1; /* number of lines to show */
      line-clamp: 1;
      -webkit-box-orient: vertical;
    }

    .ant-row {
      margin-bottom: 16px;
    }

    .date {
      &-left {
        padding-right: 5px;
      }

      &-right {
        padding-left: 5px;
      }
    }

    .ant-select {
      width: 100%;
      .ant-select-selector {
        border-radius: 4px;
      }
    }

    .ant-picker {
      width: 100%;
      border-radius: 4px;
    }
  }
`;
