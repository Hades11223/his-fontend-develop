import styled, { createGlobalStyle } from "styled-components";
export const Main = styled.div`
  padding: 10px;
  height: 500px;
  display: flex;
  flex-direction: column;
  & .filter-box {
    display: flex;
    margin-bottom: 8px;
    & .filter-item {
      margin-right: 5px;
      margin-left: 2px;
      width: 300px;
    }
  }
  & .list-services {
    display: flex;
    flex: 1;
    overflow: hidden;
    .content-equal-w {
      display: flex;
      overflow-x: hidden;
      margin: 2px;
      flex: 1;
      display: flex;
      flex-direction: column;
      .name-item {
        border: 1px solid #ff8d75;
        color: black;
        padding: 10px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        margin: 1px auto;
        .arrow-icon {
          color: #ffffff;
        }
        &:hover {
          background-color: #ff5733;
          color: #ffffff;
        }
      }
      .active-item {
        background-color: #ff5733;
        color: #ffffff;
      }
      .checkall {
        display: flex;
        align-items: center;
        padding: 5px;
        .text {
          margin-left: 4px;
        }
      }
      .title-table {
        padding: 10px;
        height: 40px;
        display: flex;
        align-items: center;
        background-color: #054ab9;
        color: #ffffff;
      }
      .content-body {
        border: 1px dashed #049254;
        border-top: none;
        height: 100%;
        overflow: hidden;
        overflow-y: auto;
        .custom-tag {
          font-size: 14px;
          line-height: 20px;
          margin: 2px;
        }

        .ant-table-wrapper {
          height: 380px;
        }
      }
      & .danh-sach-dich-vu {
        flex: 1;
        border: 1px dashed #054ab9;
      }
    }

    .bundle-services {
      flex: 0.5;
    }
    .content-left {
      margin-right: 8px;
      width: 520px;
    }
    .content-right {
      flex: 1;
      margin-left: 8px;
      overflow: hidden;
    }
    .title {
      background: #049254;
      color: #ffffff;
      height: 40px;
      padding: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      &__left {
        img {
          margin-right: 8px;
        }
      }
      &__right {
        font-size: 16px;
        font-weight: bold;
      }
    }
    .main__container {
      margin-top: 0;
      .table-right {
        .ant-table-body {
          min-height: unset;
        }
      }
    }
    .group-service {
      overflow-x: hidden;
      flex-wrap: nowrap;
      display: flex;
      position: "relative";
      /* width: 725px; */
      .button-group-service {
        width: fit-content;
        border-radius: 20px;
        margin-bottom: 10px;
        border: 1px solid #99a2b1;
        color: #99a2b1;
        margin-right: 8px;
        &.active {
          background: #0762f7;
          color: white;
        }
      }
    }

    .navigation-right {
      text-align: center;
      cursor: pointer;
      line-height: 30px;
      max-width: 20px;
    }
    .navigation-left {
      text-align: center;
      cursor: pointer;
      line-height: 30px;
      max-width: 20px;
      img {
        transform: scaleX(-1);
      }
    }

    & .danh-sach-dich-vu {
      display: flex;
      flex-direction: column;
      overflow: hidden;
      & .ant-table-row {
        & .item-even {
          background-color: #e7f0fe;
        }
        &:hover {
          background-color: #c1f0db;
          & .item-even {
            background-color: #c1f0db;
          }
        }
      }

      .row-item {
        display: flex;
        align-items: center;
        justify-content: space-around;
        /* position: relative !important; */
        .left-box {
          width: 25px;
          display: flex;
          justify-content: center;
        }
        .right-box {
          padding: 4px 0;
          flex: 1;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .name {
            flex: 1;
          }
          /* .soluong {
          padding: 0 5px;
          min-width: 60px;
        } */
          .desc {
            flex: 1;
            padding-left: 5px;
            display: flex;
          }
        }
      }

      .custome-header {
        .title-box {
          min-height: 30px !important;
        }
      }
    }
    & .danh-sach-goi-dich-vu {
      width: 100%;
      overflow: hidden;
      & .main-table-wrapper {
        height: 100%;
        & .ant-table-body {
          & > table {
            width: 100% !important;
          }
        }
      }
      & .goi-dich-vu-item {
        & .ant-table-cell {
          border: 1px solid #ff8d75;
          background-color: #fff !important;
          & > div {
            display: flex;
            justify-content: space-between;
            align-items: center;
            & .anticon {
              display: none;
            }
          }
        }
      }
      & .selected-goi-dich-vu {
        & .ant-table-cell {
          background-color: #ff5733 !important;
          color: #ffffff !important;
          & > div {
            & .anticon {
              display: block;
              fill: #fff;
            }
          }
        }
      }
    }
  }
`;
