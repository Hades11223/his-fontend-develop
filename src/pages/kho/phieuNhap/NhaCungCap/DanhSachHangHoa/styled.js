import styled from "styled-components";

export const Main = styled.div`
  & table {
    & .item-ten,
    & .item-ma {
      font-weight: bold;
    }
    & .per20 {
      width: 20%;
    }
    & .per16 {
      width: 12%;
    }
    & .per15 {
      width: 15%;
    }
    & .per18 {
      width: 18%;
    }
    & .per30 {
      width: 30%;
    }
    & .per100 {
      width: 100%;
    }

    & .flex {
      display: flex;
      align-items: center;
    }
    & .f1 {
      flex: 1;
      overflow: hidden;
    }
    & .mt10 {
      margin-top: 10px;
      width: 12%;
    }
    & .mr5 {
      margin-right: 5px;
      text-align: left;
      font-weight: bold;
      margin-left: 10px;
    }
    .icon {
      display: flex;
      flex-direction: column;
      align-items: center;
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
      color: #000;
      padding: 0px !important;
    }
    & .ant-select {
      border-bottom: 1px solid #dfe1e6 !important;
      & .ant-select-selector {
        border-radius: 0 !important;
      }
    }
    .ant-select-disabled {
      & .ant-select-selector {
        color: #000 !important;
      }
    }
  }
  img {
    object-fit: contain;
  }
  & .danh-sach-hang-hoa {
    & .ant-table-header {
      .ant-table-thead {
        .custome-header {
          .title-box {
            min-height: 55px !important;
          }
        }
      }
      & .ant-table-body {
        max-height: initital !important;
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
            & .ant-table-cell {
              border-right: 0px;
            }
            &:hover .ant-table-cell {
              background: inherit !important;
            }
          }
          & .border-top {
            & > td {
              border-top: 1px solid #c5cad3;
              border-bottom: none;
            }
          }
        }
      }
    }
  }
`;
