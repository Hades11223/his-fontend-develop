import styled from "styled-components";

export const Main = styled.div`
  .ant-table-cell-fix-right {
    .title-box {
      justify-content: center;
    }
  }
  .ant-table-header {
    tr {
      th {
        &.ant-table-cell {
          border-right: none !important;
          .custome-header {
            .addition-box {
              .input-box {
                border-radius: 5px !important;
              }
            }
          }
        }
      }
    }
  }
  .ant-table-tbody {
    .ant-table-row {
      cursor: pointer;
      svg {
        height: 24px !important;
        width: 24px !important;
      }
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
          background-color: #e6effe !important;
        }
      }
      & td {
        border-bottom: 1px solid #c5cad3;
        border-right: none !important;
        padding: 5px !important;
      }
      & .ant-table-cell {
        border-right: 0px;
        & .ant-input,
        & .ant-input-number {
          border: none !important;
          border-bottom: 1px solid #d9d9d9 !important;
          border-radius: 0px !important;
        }
        & input {
          padding-left: 0;
          padding-right: 0;
        }
      }
      &:hover .ant-table-cell {
        background: inherit !important;
      }
    }
    & .ant-input,
    & .ant-input-number {
      border-radius: 2px !important;
    }
  }
`;
