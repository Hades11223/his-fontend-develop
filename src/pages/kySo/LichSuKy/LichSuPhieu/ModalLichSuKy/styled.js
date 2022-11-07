import styled from "styled-components";
import { Modal, Button, Row, Input, Select, InputNumber } from "antd";
import bgCalendar from "assets/images/kho/calendar.png";
import TableWrapper from "components/TableWrapper";

export const ModalStyled = styled(Modal)`
  padding: 0;
  .ant-modal-content {
    background: linear-gradient(
        0deg,
        rgba(23, 43, 77, 0.05),
        rgba(23, 43, 77, 0.05)
      ),
      #ffffff;
    box-shadow: 0px 0px 20px rgba(9, 30, 66, 0.2);
    border-radius: 16px 16px 16px 16px;
    font-family: Nunito Sans, sans-serif;
    .ant-modal-body {
      padding: 0;
    }
    overflow: hidden;
  }
  & .action-group {
    display: flex;
    justify-content: center;
    & .btn-action {
      border: none;
      background-color: transparent;
      padding: 0;
      margin: 5px;
      outline: none;
      color: #0762f7;
      cursor: pointer;
    }
  }
`;
export const Main = styled.div`
  .ant-spin-nested-loading {
    width: 100%;
  }
  .main__container {
    margin: 0 !important;
  }
  .header-table {
    border-bottom: 1px solid #cecece;
    padding: 8px 17px 8px 16px;
    flex-flow: initial;
    align-items: center;
    &__left {
      font-family: Nunito Sans;
      font-size: 16px;
      font-style: normal;
      font-weight: 700;
      line-height: 24px;
      letter-spacing: 0px;
      text-align: left;
    }
    &__right {
      margin-left: auto;
      img {
        cursor: pointer;
      }
    }
  }
  .ant-table-body {
    .ant-table-row {
      &.active {
        .ant-table-cell {
          background: #c1f0db;
        }
      }
    }
  }
  .ant-card-body {
    padding: 0;
  }
  #pdfDocument {
    height: 670px;
    width: 840px;
    margin: auto;
    display: block;
  }

  .pdf-view {
    /* border: 1px solid #ddd; */
    /* padding: 10px; */
    border-top: 0;
    border-bottom: 0;
  }
  canvas.react-pdf__Page__canvas {
    /* width: 788px !important;
    height: 920px !important; */
    margin: auto;
  }
  .action {
    display: flex;
    align-items: center;
    padding: 10px;
    justify-content: flex-end;

    .pager {
      padding: 0 6px;
    }
    .previous,
    .next {
      font-size: 14px;
      cursor: pointer;
      width: 24px;
      height: 24px;
      background: #2679ff;
      line-height: 24px;
      margin: 2px;
      color: #fff;
      display: inline-block;
      border-radius: 12px;
      text-align: center;
    }
    span.divider {
      margin-left: 12px;
    }
    .divider-right {
      margin-right: 12px;
    }
  }
  .react-pdf__Document {
    background-color: #bfbfbf;
    border: 1px solid #ddd;
    border-top: 0;
    border-bottom: 0;
    overflow: auto;
    height: 420px;
    & .react-pdf__Page {
      margin: 0 auto;
    }
  }

  .history-list {
    padding-top: 15px;
  }
  .sign-container {
    .title-sign {
      padding: 10px;
    }
    .item-btn {
      width: 100%;
      margin-bottom: 20px;
      font-weight: bold;
      & .anticon {
        vertical-align: 0;
      }
    }
  }
  .ant-tree li .ant-tree-node-content-wrapper {
    height: auto;
    width: 100%;
  }
  .sign-wrapper {
    padding: 10px;
  }
  .btn-sign {
    display: none;
    z-index: 101;
    position: absolute;
    top: 30%;
    border-radius: 5px 0 0 5px;
    border-right: 0px;
    box-shadow: -2px 0px 6px #d6d6d630;
    right: 0;
  }
  @media screen and (max-width: 991px) {
    .react-pdf__Document {
      overflow: auto !important;
    }
    .btn-sign {
      display: block;
    }
    .sign-wrapper {
      position: absolute;
      z-index: 100;
      top: 0;
      right: 0;
      width: 0;
      opacity: 0;
      height: 0;
      overflow: hidden;
      background: rgba(255, 255, 255);
      transition: width 0.3s, opacity 0.3s;
      &.actived {
        width: 100%;
        height: 100%;
        display: block;
        opacity: 1;
      }
    }
  }
`;
export const ContentTable = styled.div`
  overflow: hidden;
  /* border-top: 2px solid #ef4066; */
  background: #ffffff;
  border-radius: 16px 0px 0px 0px;
  height: 500px;
  .right-box {
    margin-top: 15px;
    border-radius: 10px;
    box-shadow: 0px 0px 15px rgba(9, 30, 66, 0.07);
    margin-left: 20px;
    height: 470px;
  }
  .left-box {
    margin-top: 15px;
    border-radius: 10px;
    box-shadow: 0px 0px 15px rgba(9, 30, 66, 0.07);
    padding-right: 10px;
    height: 470px;
    margin-left: 20px;
  }
`;

export const Footer = styled(Row)`
  padding: 10px;
  position: absolute;
  bottom: 0;
  width: 100%;
  /* background: linear-gradient( 0deg, rgba(255,255,255,0.9), rgba(255,255,255,0.9) ), #0762f7; */
`;


export const InputCustom = styled(Input).attrs((props) => ({
  disabled: props.disabled ? true : false,
}))`
  text-align: "right";
  border-radius: 0px !important;
`;
export const InputCustomNumber = styled(InputNumber).attrs((props) => ({
  disabled: props.disabled ? true : false,
}))`
  text-align: "right";
  border-radius: 0px !important;
`;
export const SelectCustom = styled(Select)`
  border-radius: 0px !important;
  .ant-select-selector {
    border-radius: 0px !important;
  }
`;
export const RangePickerCustom = styled.div`
  background: white;
  .ant-picker {
    border: 0px;
    padding: 0px;
    .ant-picker-input {
      border: 1px solid #d9d9d9;
      .icon-suffix {
        width: 30px;
        height: 20px;
        background-image: url(${bgCalendar});
        background-repeat: no-repeat;
      }
    }
  }
  .title-1 {
    padding: 0px 10px;
  }
  .ant-picker-active-bar {
    opacity: 0 !important;
  }
`;
export const TableWrapperStyled = styled(TableWrapper)`
  .ant-spin-nested-loading {
    .ant-spin-container {
      .ant-table {
        border-radius: 0px !important;
        box-shadow: none !important;
        .title-box {
          justify-content: center;
        }
        .ant-table-cell {
          vertical-align: middle;
        }
      }
    }
  }
`;
