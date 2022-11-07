import styled, { createGlobalStyle } from "styled-components";
import { Popover } from "antd";

const Main = styled.div`
  display: flex;
  height: 416px;
  padding-bottom: 10px;
  & .empty-table {
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    & label {
      color: rgb(122, 134, 154);
      font-size: 14px;
    }
    & button {
      width: auto;
    }
  }
  .input-box {
    position: relative;
    flex: 1;
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
    }
  }
  .content-equal-w {
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
    .custom-list {
      border: 1px solid #f0f0f0;
      .item-even {
        background-color: #e7f0fe;
      }

      .row-item {
        display: flex;
        align-items: center;
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
          .desc {
            flex: 3;
            display: flex;
          }
        }
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
      max-height: 430px;
      overflow: hidden;
      overflow-y: auto;
      .custom-tag {
        font-size: 14px;
        line-height: 20px;
        margin: 2px;
      }
    }
  }
  .content-left {
    margin-right: 8px;
    width: 520px;
    overflow-x: hidden;
    height: 100%;
    display: flex;
    flex-direction: column;
    .table-row-even {
      &.ant-table-row-selected {
        .ant-table-cell {
          background-color: #c1f0db;
        }
      }
      &.add-border {
        .ant-table-cell {
          border-bottom: 1px solid #ececec;
        }
      }
      .ant-table-cell {
        background-color: white;
      }
    }
    .table-row-odd {
      &.ant-table-row-selected {
        .ant-table-cell {
          background-color: #c1f0db;
        }
      }
      &.add-border {
        .ant-table-cell {
          border-bottom: 1px solid #ececec;
        }
      }
      .ant-table-cell {
        background-color: #eaf0fe;
      }
    }
    .ant-table-body {
      height: 252px;
    }
    .content-left-header-table {
      border: 2px dashed #049254;
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      .style-version2 {
        margin: 5px !important;
      }
    }
    .input-header {
      height: 40px;
      margin: 5px 0px 5px 10px;
    }
    .header {
      padding-top: 10px;
      border-bottom: 1px solid #172b4d;
      display: flex;
      .group-service {
        display: flex;
        .button-group-service {
          border-radius: 16px;
          margin-right: 8px;
          margin-bottom: 10px;
          border: 1px solid #7a869a;
        }
      }

      .navigation-right {
        text-align: center;
        cursor: pointer;
        line-height: 30px;
        max-width: 20px;
        margin-left: auto;
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
    }
  }
  .content-right {
    flex: 1;
    margin-left: 8px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .table-row-even {
      &.add-border {
        .ant-table-cell {
          border-bottom: 1px solid #ececec;
        }
      }
      .ant-table-cell {
        background-color: white;
      }
    }
    .table-row-odd {
      &.add-border {
        .ant-table-cell {
          border-bottom: 1px solid #ececec;
        }
      }
      .ant-table-cell {
        background-color: #eaf0fe;
      }
    }
    &_table {
      border: 2px dashed #049254;
      border-top: 0;
      .ant-table-body {
        height: 297px;
      }
      flex: 1;
      overflow: auto;
      & .main-table-wrapper {
        height: 100%;
      }
    }
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
        .ant-table-cell {
          .ant-input-number {
            border-radius: 0px;
          }
        }
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
      border: 1px solid #7a869a;
      color: #172b4d;
      margin-right: 8px;
      &.active {
        background: #0762f7;
        color: white;
      }
    }
  }
`;
const StickyWrapper = styled.div`
  position: sticky;
  z-index: 2;
  top: 0;
  width: 100%;
  background-color: #ffff;
  .info {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    font-size: 14px;
    line-height: 19px;
    &__left {
      span {
        font-weight: bold;
      }
    }
    &__right {
      span {
        font-weight: bold;
      }
    }
  }
`;

const BlankContentWrapper = styled.div`
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 18px;
`;
const PopoverStyled = styled(Popover)`
  .ant-popover-inner-content {
    padding: 0px !important;
  }
  .ant-popover-content {
    width: 640px;
    height: 260px;
    .title-popup {
      background: linear-gradient(
          0deg,
          rgba(23, 43, 77, 0.1),
          rgba(23, 43, 77, 0.1)
        ),
        linear-gradient(0deg, #ffffff, #ffffff);
      font-family: Nunito Sans;
      font-size: 16px;
      font-style: normal;
      font-weight: 700;
      line-height: 24px;
      letter-spacing: 0px;
      text-align: left;
      padding-left: 16px;
    }
  }
  .ant-popover-arrow-content {
    display: hidden;
  }
`;

export const GlobalStyle = createGlobalStyle`
  .modal-error-thuoc-ke-ngoai{
      button {
        height: auto;
        padding: 6px 32px;
        margin: 0 8px;
        border-radius: 8px;
        border: 1px solid #0762f7;
        box-shadow: 0px 3px 0px #03317c;
        font-weight: 600;
        font-size: 16px;
        color: #172b4d;
        background: #0762f7;
        color: white !important;
        @media (max-width: 1366px) {
          padding: 4px 20px;
        }
      }
  }
.popover-table-thuoc-ke-ngoai{
  .ant-popover-arrow{
    z-index: 10000000
  }
  z-index: 1001;
  .ant-popover-inner-content{
    padding: 0px !important;
  }
  &_lieu-dung{
      .ant-form{
        padding: 8px 8px 0px 8px;
        .ant-form-item-label{
          padding : 0px ; 
        }
        .ant-form-item{
          margin-bottom : 15px !important;
        }
      }
  }
}
  
`;
export const WrapperInput = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;
  /* span{
      flex: 1
    } */

  input {
    outline: 0;
    border-width: 0 0 1px;
    font-weight: 600;
    font-size: 14px;
    background: transparent;
    color: #172b4d;
    width: 49px;
    padding-right: 0px;
    text-align: right;
    padding-left: 0px;
    &::placeholder {
      color: black;
    }
    &:hover {
      border-color: unset;
      border-right-width: 0px !important;
    }
    &:focus {
      outline: 0;
      border-color: unset;
      border-right-width: 0px !important;
      box-shadow: 0px;
    }
  }
  span {
    /* width: 50px; */
    flex: 1;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const WrapperSelect = styled.div`
  .ant-select {
    border-radius: 0px !important;
    border: none !important;
    border-bottom: 1px solid #d9d9d9 !important;
  }
  input {
    outline: 0;
    border-width: 0 0 1px;
    font-weight: 600;
    font-size: 14px;
    background: transparent;
    color: #172b4d;
    width: 80px;
    &::placeholder {
      color: black;
    }
    &:hover {
      border-color: unset;
      border-right-width: 0px !important;
    }
    &:focus {
      outline: 0;
      border-color: unset;
      border-right-width: 0px !important;
      box-shadow: 0px;
    }
  }
`;

export { Main, StickyWrapper, BlankContentWrapper, PopoverStyled };
