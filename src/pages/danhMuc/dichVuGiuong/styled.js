import styled from "styled-components";

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
  .main {
    &__container {
      width: 100%;
      .ant-table-warrper {
        background: rgba(255, 255, 255, 0.0001);
      }
      .ant-table-header {
        .ant-table-thead {
          tr > th {
            padding: 0;
          }
          .custome-header {
            .title-box {
              min-height: 48px;
              display: flex;
              align-items: center;
              font-weight: bold;
              font-size: 14px;
              line-height: 16px;
              color: #03317c;
              padding: 7px;
              border-bottom: 2px solid #dfe1e6;
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
                  &::placeholder {
                    font-weight: 600;
                    font-size: 14px;
                    color: #6b778c;
                  }
                }
              }
              .ant-select {
                width: 100%;
                .ant-select-selector {
                  border-radius: 17px;
                  border: 2px solid #dfe1e6;
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
          .ant-table-row {
            cursor: pointer;
            &:nth-child(2n) {
              background: linear-gradient(
                  0deg,
                  rgba(255, 255, 255, 0.9),
                  rgba(255, 255, 255, 0.9)
                ),
                #0762f7;
              .ant-table-cell-fix-right {
                background: linear-gradient(
                    0deg,
                    rgba(255, 255, 255, 0.9),
                    rgba(255, 255, 255, 0.9)
                  ),
                  #0762f7;
              }
            }
          }
          .ant-table-row:hover .ant-table-cell {
            background: #c1f0db;
          }
          .ant-table-cell {
            font-size: 14px;
            line-height: 20px;
            color: #172b4d;
          }
        }
      }
      .ant-table-cell-fix-right {
        .title-box {
          justify-content: center;
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
`;
