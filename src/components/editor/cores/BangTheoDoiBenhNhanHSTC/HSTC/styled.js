import styled from "styled-components";

const Main = styled("div")`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  & .canvas-vital-signs {
    margin-top: -2px;
  }
  & canvas {
    background-color: transparent;
  }
  & table {
    font-size: 11px !important;
    border-collapse: collapse;
    color: #000 !important;
    line-height: 11px;
    & td {
      height: 14px;
    }

    & .col-lv0 {
      width: 20px !important;
      line-height: 13px;
    }
    & .col-lv1 {
      padding: 0 3px;
      width: 20px;
    }
    & .col-lv2 {
      padding: 0 3px;
      width: 50px !important;
      border-left: 1px solid #000;
      vertical-align: middle;
    }
    & .col-lv3 {
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
              font-size: 11px;
            }
          }
        }
      }
    }
    & .col-lv4,
    .col-lv3 {
      & .drop-list {
        min-height: 11px;
      }
      & .signature {
        border: none;
        width: 100% !important;
        & .sign-body {
          width: 100%;
        }
        .text-field-label:after {
          margin-right: 0px;
        }
        & .btn-signature {
          font-size: 9px;
          line-height: 11px;
          height: 15px;
          span {
            font-size: 9px;
            line-height: 11px;
          }
        }
      }
      & .ant-input-number {
        padding: 0;
        width: auto;
        border: none;
        height: 11px;
        font-size: 11px;
        line-height: 11px;
        & .ant-input-number-handler-wrap {
          display: none;
        }
        & .ant-input-number-input-wrap {
          height: 11px;
        }
      }
      & input {
        color: #000 !important;
        padding: 0;
        font-size: 11px;
        line-height: 11px;
        text-align: center;
        height: 11px;
        border: none;
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
    & .col-lv4 {
      width: ${(props) => props.columnWidth}px;
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
    & .flex {
      display: flex;
    }
    & .f1 {
      flex: 1;
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

    & .lh15 {
      line-height: 15px;
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
    & .old-value {
      width: 30px !important;
      font-weight: bold;
      margin-right: 10px;
      & .ant-input-number-input {
        padding: 0;
        font-weight: bold;
      }
    }
    & .leftColumnWidth {
      width: ${(props) => props.leftColumnWidth}px;
    }
  }
`;

export { Main };
