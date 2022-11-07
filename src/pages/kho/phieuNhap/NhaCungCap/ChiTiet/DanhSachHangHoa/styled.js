import styled from "styled-components";

export const Main = styled.div`
  height: calc(100% - 132px);
  & table {
    & .item-ten,
    & .item-ma {
      font-weight: bold;
      color: #0762f7;
    }
    & .fit-content {
      width: fit-content;
    }
    & .bold {
      font-weight: bold;
    }
    & .per20 {
      width: 20%;
    }
    & .per16 {
      width: 16%;
    }
    & .per100 {
      width: 100%;
    }

    & .flex {
      display: flex;
    }
    & .f1 {
      flex: 1;
      overflow: hidden;
    }
    & .mt10 {
      margin-top: 10px;
    }
    & .mr5 {
      margin-right: 5px;
    }

    input,
    & .ant-input-number,
    & .ant-picker,
    & .ant-select {
      border-top: none !important;
      border-right: none !important;
      border-left: none !important;
      /* border-bottom: 2px solid #dfe1e6 !important; */
      background: transparent;
      border-radius: 0 !important;
    }
    & .ant-select {
      border-bottom: 1px solid #dfe1e6 !important;
      & .ant-select-selector {
        border-radius: 0 !important;
      }
    }
  }
  & .ant-table-header {
    & .ant-table-cell {
      & .custome-header {
        min-height: auto !important;
      }
    }
  }

  & .danh-sach-hang-hoa {
    & .ant-table-body {
      max-height: initital !important;
      height: 100% !important;
      // @media(max-width: 1199px){
      //   max-height: 400px !important;
      // }
      /* max-height: 370px !important;
      min-height: calc(100vh - 650px) !important; */

      .ant-table-tbody {
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
              background-color: inherit !important;
            }
          }
          &:nth-child(2n + 4) {
            td {
              border-top: 1px solid #c5cad3;
            }
          }
          &:nth-child(2n + 1) {
            .table_line {
              .font-normal {
                font-weight: normal;
              }
              .table_line_1 {
                margin-bottom: 10px;
                margin-top: 10px;
                display: flex;
                .line_1_col:nth-child(1) {
                  width: 20%;
                  display: flex;
                  div:first-child {
                    width: 82px;
                    font-weight: bold;
                  }
                  div:last-child {
                    width: calc(100% - 82px);
                  }
                }
                .line_1_col:nth-child(2) {
                  width: 22%;
                  display: flex;
                  div:first-child {
                    width: 130px;
                    font-weight: bold;
                  }
                  div:last-child {
                    width: calc(100% - 130px);
                  }
                }
                .line_1_col:nth-child(3) {
                  width: 18%;
                  display: flex;
                  div:first-child {
                    width: 60px;
                    font-weight: bold;
                  }
                  div:last-child {
                    width: calc(100% - 60px);
                  }
                }
                .line_1_col:nth-child(4) {
                  width: 35%;
                  display: flex;
                  div:first-child {
                    width: 110px;
                    font-weight: bold;
                  }
                }
              }
              .table_line_2 {
                display: flex;
                .line_2_col:nth-child(1) {
                  width: 20%;
                  display: flex;
                  div:first-child {
                    width: 82px;
                    font-weight: bold;
                  }
                  div:last-child {
                    width: calc(100% - 82px);
                  }
                }
                .line_2_col:nth-child(2) {
                  width: 22%;
                  display: flex;
                  div:first-child {
                    width: 82px;
                    font-weight: bold;
                  }
                  div:last-child {
                    width: calc(100% - 82px);
                  }
                }
                .line_2_col:nth-child(3) {
                  width: 18%;
                  display: flex;
                  div:first-child {
                    font-weight: bold;
                  }
                  div:last-child {
                    margin-left:15px;
                  }
                }
                .line_2_col:nth-child(4) {
                  width: 15%;
                  display: flex;
                  div:first-child {
                    font-weight: bold;
                  }
                  div:last-child {
                    margin-left:15px;
                  }
                }
                .line_2_col:nth-child(5) {
                  width: 20%;
                  display: flex;
                  div:first-child {
                    font-weight: bold;
                  }
                  div:last-child {
                    margin-left:15px;
                  }
                }
              }
            }
          }
          & .ant-table-cell {
            border-right: 0px;
          }
          &:hover .ant-table-cell {
            background: inherit !important;
          }
        }
        & .border-top {
          & > td {
            /* border-top: 1px solid #c5cad3; */
            border-bottom: none;
          }
        }
      }
    }
  }
`;
