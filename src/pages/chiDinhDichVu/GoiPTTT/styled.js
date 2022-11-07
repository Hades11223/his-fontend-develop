import styled from "styled-components";

export const Main = styled.div`
  height: 580px;
  display: flex;
  padding: 10px;
  flex-direction: column;

  .header-search {
    width: 60%;
    padding-bottom: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    span {
      width: 100px;
      font-weight: bold;
    }

    input {
      flex: 1;
    }
  }

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
          height: 410px;
        }
      }
      & .danh-sach-dich-vu {
        flex: 1;
        border: 1px dashed #054ab9;

        .seleted-item {
          .ant-table-cell {
            background-color: #bd2c2c !important;
            color: #fff !important;
          }
        }
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
        padding: 4px 0;

        .name {
          flex: 1;
        }
        .desc {
          width: 120px;
          padding-left: 5px;

          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }
    }
  }
`;
