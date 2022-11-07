import styled from "styled-components";
import { Row } from "antd";
export const Main = styled(Row)`
  max-width: 100%;
  flex: 1;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  .button-import {
    padding: 15px 30px;
    margin-right: 20px;
  }
  .home-table-warrper {
    width: 100%;
    align-items: center;
    display: flex;
    justify-content: space-between;
    .home-title {
      font-weight: 500;
      font-size: 24px;
      line-height: 30px;
      color: #172b4d;
      padding-right: 20px;
    }
    & .header-button {
      display: flex;
      align-items: center;
      & .btn-collapse {
        padding: 0;
        position: unset;
      }
    }
    .buttonHeader {
      display: flex;
      align-items: center;
      width: 100%;
      .ant-select {
        width: 54%;
        .ant-select-selector {
          background: #ffffff;
          border-radius: 17px;
          border: 2px solid #dfe1e6;
          .ant-select-selection-item {
            font-weight: 600;
            font-size: 14px;
            line-height: 24px;
            line-height: 29px;
            color: #172b4d;
          }
        }
      }
      .button-header {
        margin-left: auto;
      }
    }
    .button-header {
      background: #049254;
      /* box-shadow: 0px 3px 0px #026138; */
      border-radius: 8px;
      border: none;
      padding: 8px 32px;
      height: auto;
      font-weight: 600;
      font-size: 16px;
      color: #ffffff;
      img {
        width: 20px !important;
        height: 20px !important;
      }
    }
    .button-header:hover {
      background: #05c270;
    }
    .btn-change-full-table {
      padding: 0px 10px !important;
      border: 0px;
      padding-top: 4px !important;
      svg:hover {
        path {
          fill: #0762f7;
        }
      }
      svg {
        width: 20px;
        height: 20px;
        path {
          fill: linear-gradient(0deg, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)),
            #0762f7;
        }
      }
    }

    .btn-collapse {
      svg:hover {
        path {
          fill: #0762f7;
        }
      }
      svg {
        width: 35px;
        height: 35px;
        path {
          fill: #054ab9;
        }
      }
      position: absolute;
      right: 44px;
      mix-blend-mode: normal;
      border-radius: 8px;
      border: 0;
      outline: 0;
      color: #fff;
      padding: 1px 10px;
      line-height: 8px;
      display: flex;
      align-items: center;
      right: 20px;
      padding: 0;
      margin-right: 5px;
    }
    .home-title {
      margin-left: 16px;
      font-family: Nunito Sans;
      font-size: 20px;
      font-style: normal;
      font-weight: 700;
      line-height: 27px;
      letter-spacing: 0px;
      text-align: left;
      padding-right: 0px;
    }
  }

  .button-left {
    margin-left: auto;
    .item {
      background: #0762f7;
      box-shadow: 0px 3px 0px #03317c;
      padding: 8px 16px;
      img {
        padding-left: 13px;
      }
      &:first-child {
        margin-right: 1.5em;
      }
    }
  }

  .main {
    &__container {
      font-family: Nunito Sans;
      width: 100%;
      height: 100%;
      overflow: hidden;
      flex: 1;
      .ant-table-warrper {
        background: rgba(255, 255, 255, 0.0001);
      }
      .ant-table-header {
        .ant-table-thead {
          tr > th {
            padding: 0;
            vertical-align: top;
          }
          .ant-table-cell {
            &.active {
              border-left: 1px solid #0762f7;
              border-right: 1px solid #0762f7;
              border-top: 1px solid #0762f7;
            }
          }
          .custome-header {
            min-height: ${(props) =>
              props.headerminheight || "55px"} !important;
            .title-box {
              // white-space: nowrap;
              text-align: center;
              min-height: 48px;
              display: flex;
              align-items: center;
              font-weight: bold;
              font-size: 14px;
              line-height: 16px;
              color: #03317c;
              padding: 7px;
              border-bottom: 2px solid #dfe1e6;
              &.center {
                justify-content: center;
                text-align: center;
              }
            }
            .addition-box {
              padding: 0 5px;
              margin: 3px 0;
              min-height: 33px;
              background: #ffffff;
              .ant-picker {
                border: 2px solid #dfe1e6;
                border-radius: 17px;
                position: relative;
                height: 34px;
              }
              .input-box {
                border: 2px solid #dfe1e6;
                border-radius: 17px;
                position: relative;
                height: 34px;
                img {
                  position: absolute;
                  top: 29%;
                  left: 0;
                  z-index: 1;
                  padding: 0 8px;
                }
                input {
                  position: absolute;
                  border: none;
                  top: 0;
                  left: 0;
                  right: 0;
                  bottom: 0;
                  border-radius: 17px;
                  padding-left: 24px;
                  font-weight: 600;
                  color: #172b4d;
                  font-size: 14px;
                  &:placeholder-shown {
                    font-weight: 600;
                    font-size: 14px;
                    color: #7a869a;
                  }
                }
                .ant-input-number {
                  display: block !important;
                  position: initial !important;
                  .ant-input-number-handler-wrap {
                    display: none;
                  }
                  height: 30px;
                  width: 100%;
                  border: none;
                  border-radius: 17px;
                }
              }
              .ant-picker {
                width: 100%;
              }
              .ant-select {
                width: 100%;
                &.ant-select-open {
                  .ant-select-selection-item {
                    color: #7a869a;
                  }
                }
                .ant-select-selector {
                  text-align: center;
                  border-radius: 17px;
                  border: 2px solid #dfe1e6;
                }
                .ant-select-selection-placeholder {
                  font-style: normal;
                  font-weight: 600;
                  font-size: 14px;
                  color: #7a869a;
                }
                .ant-select-selection-item {
                  font-style: normal;
                  font-weight: 600;
                  font-size: 14px;
                  color: #172b4d;
                }
              }
            }
          }
          .ant-table-column-sorters {
            display: -webkit-inline-box;
            display: -ms-inline-flexbox;
            display: inline-flex;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            padding: 0 !important;
            width: 100% !important;
            position: relative !important;
            display: block !important;
            > span:first-child {
              display: block;
              width: 100%;
            }
            .ant-table-column-sorter-full {
              position: absolute;
              top: 15px;
              right: 7px;
            }
          }
        }
      }
      .ant-table-body {
        max-height: initital !important;
        // @media(max-width: 1199px){
        //   max-height: 400px !important;
        // }
        .ant-table-tbody {
          .row-actived {
            td {
              background: #c1f0db !important;
              .ant-select-single {
                margin: -10px;
                width: calc(100% + 10px);
              }
            }
          }
          .row-tt35 {
            td {
              background: rgba(240, 162, 0, 0.2) !important;
            }
          }
          .ant-table-row {
            cursor: pointer;
            /* &:nth-child(2n) {
              background: linear-gradient(
                  0deg,
                  rgba(255, 255, 255, 0.9),
                  rgba(255, 255, 255, 0.9)
                ),
                #0762f7;
              .ant-table-cell-fix-left {
                background: linear-gradient(
                    0deg,
                    rgba(255, 255, 255, 0.9),
                    rgba(255, 255, 255, 0.9)
                  ),
                  #0762f7;
              }
            } */
            &:nth-child(2n) {
              td {
                background-color: #e7f0fe;
              }
            }
          }
          .ant-table-row:hover .ant-table-cell {
            background: #c1f0db;
          }
          .ant-table-cell {
            vertical-align: top;
            font-size: 14px;
            line-height: 20px;
            color: #172b4d;
            &.active {
              border-left: 1px solid #0762f7;
              border-right: 1px solid #0762f7;
            }
            .ant-select {
              width: 100%;
              border: 2px solid #dfe1e6;
              border-radius: 17px;
              .ant-select-selector {
                border: none;
                border-radius: 17px;
              }
            }
            > input,
            > .ant-input-number {
              width: 100%;
              /* border: 2px solid #dfe1e6; */
              border-radius: 17px;
              .ant-input-number-handler-wrap {
                border-radius: 0 7pt 7pt 0;
              }
            }
          }
        }
      }
      .ant-table-cell-fix-right {
        .title-box {
          justify-content: center;
          text-align: center;
        }
      }

      & .ant-table-wrapper {
        height: 100%;
        & .ant-spin-nested-loading {
          height: 100%;
          & .ant-spin-container {
            height: 100%;
            .ant-table {
              height: 100%;
              border-radius: 8px;
              border-bottom-left-radius: 8px !important;
              border-bottom-right-radius: 8px !important;
              box-shadow: none;
              .ant-table-container {
                height: 100%;
                display: flex;
                flex-direction: column;
                overflow: hidden;
                .ant-table-header {
                  border-radius: unset;
                  border-bottom: 1px solid rgba(224, 224, 224, 1);
                  border-top: 1px solid rgba(224, 224, 224, 1);
                  table::before {
                    display: none;
                  }
                  .ant-table-thead {
                    .ant-table-cell {
                      background-color: #ffffff;
                      &:before {
                        display: none;
                      }
                    }
                  }
                }
                .ant-table-body {
                  // OLD
                  /* overflow: auto scroll;
                  max-height: 100% !important;
                  flex: 1;
                  min-height: unset !important;
                  max-height: unset !important;
                  height: calc(100vh - 630px); */

                  // NEW
                  overflow: auto scroll;
                  /* max-height: 100% !important; */
                  flex: 1;
                  min-height: unset !important;
                  max-height: ${(props) =>
                    props.maxheight ? props.maxheight : "unset !important"};
                  height: ${(props) =>
                    props.maxheight ? "auto" : "calc(100vh - 630px)"};
                }
              }
            }
          }
        }
      }
      & .min-height-500 {
        .ant-spin-nested-loading {
          .ant-spin-container {
            .ant-table {
              .ant-table-container {
                .ant-table-body {
                  min-height: 500px !important;
                }
              }
            }
          }
        }
      }
    }
  }
  .support {
    img {
      padding: 0 5px;
    }
  }
  .ant-table-tbody > .ant-table-row > td,
  .ant-table tfoot > .ant-table-row > th,
  .ant-table tfoot > .ant-table-row > td {
    padding: 10px 9px !important;
  }
  /* } */
  .custom-header {
    border: 1px solid #dfe1e6;
    border-radius: 16px 16px 0px 0px;
    flex-wrap: nowrap;
    min-height: 55px !important;
    .button-header {
      font-size: 16px;
      padding: 5px 15px;
      margin: 5px 0px;
      display: flex;
      align-items: center;
      height: 37px;
    }
    .btn-collapse {
      margin: 5px 0px;
      background: unset;
      box-shadow: unset;
      right: 25px;
      svg {
        width: 35px;
        height: 35px;
      }
    }

    /* box-shadow: 0px 3px 5px rgb(9 30 66 / 20%), 0px 0px 1px rgb(9 30 66 / 31%) */
    .home-title {
      margin-left: 16px;
      font-family: Nunito Sans;
      font-size: 20px;
      font-style: normal;
      font-weight: 700;
      line-height: 27px;
      letter-spacing: 0px;
      text-align: left;
      padding-right: 0px;
      flex: 1;
    }
  }
`;
