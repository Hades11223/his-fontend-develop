import styled from "styled-components";
export const Main = styled.div`
  display: flex;
  padding: 10px;
  flex-direction: column;
  .content-title {
    display: flex;
    align-items: center;
    width: 100%;
    .ant-select {
      min-width: 180px;
    }
    .text {
      font-weight: 700;
      font-size: 16px;
      line-height: 25px;
      color: #172b4d;
    }
    .input-box {
      position: relative;
      > img {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 0;
        z-index: 1;
        padding: 0 8px;
        width: 30px;
      }
      input {
        padding-left: 25px;
        border: 1px solid #4f4f4f;
        border-radius: 17px;
      }
    }
    margin-bottom: 10px;
  }
  .content {
    display: flex;
    padding: 10px;
    height: 450px;
  }
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
    }
    & .danh-sach-dich-vu {
      flex: 1;
      border: 1px dashed #054ab9;
    }
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
      /* position: relative !important; */
      .left-box {
        width: 25px;
        display: flex;
        justify-content: center;
      }
      .right-box {
        padding: 4px 10px;
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .name {
          flex: 5;
        }
        .soluong {
          padding: 0 5px;
          min-width: 60px;
        }
        .desc {
          flex: 3;
          display: flex;
        }
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
  .footer-btn {
    display: flex;
    padding: 5px;
    justify-content: right;
  }
`;