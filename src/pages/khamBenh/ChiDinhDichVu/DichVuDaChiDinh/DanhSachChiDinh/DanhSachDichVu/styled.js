import styled from "styled-components";

export const Main = styled.div`
  .form-info {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    padding: 0 15px !important;
    .text {
      position: absolute;
      background: #ffffff;
      z-index: 1;
      left: 0;
      text-indent: initial;
    }
    display: flex;
    align-items: center;

    &__left {
      align-items: center;
      display: flex;
      min-height: 34px !important;
      width: 40%;
      position: relative;
      .ant-select-focused {
        &:not(.ant-select-disabled).ant-select {
          &:not(.ant-select-customize-input) {
            .ant-select-selector {
              border: none !important;
              box-shadow: none !important;
            }
          }
        }
      }

      .ant-select-selector {
        border-color: none !important;
        border: none;
        .ant-select-selection-item {
          background: #ffffff;
          border: none;
        }
      }
      .ant-select-arrow {
        display: none;
      }
      & .thongTinBenhPham {
        margin-bottom: 0;
        & .ant-col {
          &:first-of-type {
            flex: unset;
            width: auto;
          }
          flex: 1;
        }
      }
    }
    &__center {
      align-items: center;
      min-height: 34px !important;
      display: flex;
      justify-content: center;
      position: relative;
      width: 20%;
      text-align: center;
      .form-id {
        span {
          color: #0762f7;
          font-weight: bold;
          cursor: pointer;
          font-size: 18px;
          line-height: 25px;
        }
      }
    }
    &__right {
      align-items: center;
      display: flex;
      justify-content: center;
      min-height: 34px !important;
      position: relative;
      width: 40%;
      span {
        font-weight: bold;
        display: inline-block;
        margin-left: 5px;
      }
    }
  }
`;

export const PhieuChiDinhWrapper = styled.div`
  .form-detail {
    margin-bottom: 20px;
    .group-title {
      font-style: normal;
      font-weight: bold;
      font-size: 18px;
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
  & .group-row-item {
    align-items: center;
  }
`;
