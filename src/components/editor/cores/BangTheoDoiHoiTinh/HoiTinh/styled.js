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
      width: 75px !important;
      line-height: 13px;
      vertical-align: middle;
      text-align: center;
    }
    & .col-lv5,
    & .col-dich {
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
    & .col-lv5 {
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
    width: 45px;
  }
  & .fixWidth2 {
    width: 87px;
  }
  & .dich-time {
    & .value-display {
      font-size: 9px !important;
    }
  }
  & .check-groups {
    flex-wrap: wrap;
    display: flex;
    flex-direction: column;
    align-items: baseline;
    & .check-item {
      & > div {
        align-items: center;
      }
      & .check-box-contain {
        width: 12px;
        height: 12px;
      }
    }
  }
  & .tong-cu {
    input {
      text-align: left !important;
      font-weight: bold;
    }
  }
`;

export { Main };
