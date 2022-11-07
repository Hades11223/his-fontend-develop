import styled from "styled-components";

const Main = styled("div")`
  overflow: hidden;
  display: flex;
  flex-direction: column;

  & .canvas-vital-signs {
    top: 12px;
  }
  & canvas {
    background-color: transparent;
  }
  & .btn-add-khung {
    margin-top: 10px;
    @media print {
      display: none !important;
    }
  }
  & .active-column {
    background: #d0d0f2;
  }
  & .btn-remove-col {
    background: #f75653;
    padding: 1px 10px;
    color: #fff;
    border-radius: 4px;
    :hover {
      cursor: pointer;
    }
    @media print {
      display: none;
    }
  }
  @media print {
    .active-column {
      background: none !important;
    }
  }
  & table {
    font-size: 9px !important;
    border-collapse: collapse;
    color: #000 !important;
    & .btn-remove-khung {
      position: fixed;
      left: 0px;
      z-index: 1;
      @media print {
        display: none !important;
      }
    }
    &.khung {
      margin-bottom: 20px;
    }
    line-height: 9px;
    & td {
      height: 14px;
    }

    & .col-lv1 {
      width: 50px !important;
      line-height: 13px;
      vertical-align: middle;
      text-align: center;
    }
    & .col-lv2 {
      padding: 0 3px;
      width: 30px !important;
    }
    & .col-lv3 {
      padding: 0 3px;
      width: 30px !important;
    }
    & .col-lv4 {
      padding: 0 3px;
      width: 20px !important;
      border-left: 1px solid #000;
      vertical-align: middle;
    }
    & .col-lv5 {
      padding: 0 3px;
      width: 20px !important;
      border-left: 1px solid #000;
      vertical-align: middle;
    }
    & .col-lvx {
      width: 127px;
      padding: 0 3px;
      box-sizing: border-box;
      & > div.ant-select {
        width: 100%;
        & .ant-select-selection {
          height: 15px;
          border: none;
          outline: none;
          & svg {
            width: 7px;
            height: 7px;
          }
          & .ant-select-selection__rendered {
            line-height: 15px;
            & .ant-select-selection-selected-value {
              font-size: 9px;
            }
          }
        }
      }
    }
    & .col-lv6 {
      & .time {
        width: ${(props) => props.columnWidth - 2.1}px;
      }
      & .red {
        & .editing-content {
          color: red !important;
        }
      }
      & .drop-list {
        min-height: 9px;
      }
      & .ant-input-number {
        padding: 0;
        width: auto;
        border: none;
        height: 9px;
        font-size: 9px;
        line-height: 9px;
        & .ant-input-number-handler-wrap {
          display: none;
        }
        & .ant-input-number-input-wrap {
          height: 9px;
        }
      }

      & textarea {
        resize: none;
        padding: 0;
        border: none;
        height: 20px;
        font-size: 9px;
        line-height: 9px;
        min-height: 9px;
      }
    }
    & .col-lv6 {
      width: 50px;
      /* width: ${(props) => props.columnWidth}px; */
      & .ant-input.red {
        color: red !important;
      }
    }
    & .center {
      text-align: center;
    }
    & .bold {
      font-weight: bold;
    }
    & .red {
      color: red;
    }
    & .p02 {
      padding: 0 2px;
    }
    & .p22 {
      padding: 2px;
    }
    & .m20 {
      margin: 2px 0;
    }
    & .ml10 {
      margin-left: 10px;
    }
    & .mr5 {
      margin-right: 5px;
    }
    & .mb5 {
      margin-bottom: 5px !important;
    }
    & .mb10 {
      margin-bottom: 10px;
    }
    & .fo8 {
      font-size: 7px;
    }
    & .curp {
      cursor: pointer;
    }
    & .danhGia {
      & .drop-list {
        min-height: 9px;
        align-self: baseline;
        text-align: left;
        justify-content: left;
        margin-left: 2px;
      }
    }
    & .cbox {
      display: flex;
      align-items: center;
      & .ant-checkbox {
        & .ant-checkbox-inner {
          border-radius: 0;
          width: 9px;
          height: 9px;
          border: 1px solid #000;
        }
        &.ant-checkbox-checked {
          & .ant-checkbox-inner::after {
            top: 40%;
            left: 6%;
            width: 2px !important;
            height: 7.142857px !important;
            border: 1px solid #000 !important;
            border-top: 0 !important;
            border-left: 0 !important;
          }
        }
      }
      & > label.label {
        margin-bottom: 0px !important;
        flex: 1;
        margin-left: 2px;
      }
    }
    & label {
      margin-bottom: 0 !important;
    }
    & .input-multiple-line {
      background-position-y: 5px;
      background-size: 3px 12px;
      &.disabled {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    & td {
      & input {
        color: #000 !important;
        padding: 0;
        font-size: 9px;
        line-height: 9px;
        text-align: center;
        height: 9px;
        border: none;
      }
    }
    & .vertical {
      text-align: center;
    }
    & .no-border-left {
      border-left: none !important;
    }
    & .no-border-right {
      border-right: none !important;
    }
    & .left-column-row-height {
      height: 14px;
    }
    & .block {
      display: block;
    }
    & .flex {
      display: flex;
    }
    & .f1 {
      flex: 1;
    }
    & .fdc {
      flex-direction: column;
    }
    & .jcenter {
      justify-content: center;
    }
    & .acenter {
      align-items: center;
    }

    & .vamid {
      vertical-align: middle;
    }

    & .w50 {
      width: 50px;
    }
    & .w75 {
      width: 75px;
    }
    & .pa {
      position: absolute;
    }
    & .pr {
      position: relative;
    }
    & .table-left-vital-signs {
      position: absolute;
      top: -1px;
      left: -1px;
      right: -1px;
      width: calc(100% + 2px);
    }
    & .vital-sign-left-column {
      width: 120px;
    }
  }
  & .fixWidth1 {
    width: 105px;
  }
  & .fixWidth2 {
    width: 87px;
  }
`;

export { Main };
