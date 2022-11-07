import styled from "styled-components";

export const Main = styled.div`
  height: 100%;
  .ant-table-header {
    .ant-table-thead {
      .custome-header {
        .addition-box {
          padding: 0 5px;
          margin: 3px 0;
          min-height: 33px;
          background: #ffffff;
          .input-box {
            border-radius: 17px;
            position: relative;
            height: 32px !important;
            img {
              position: absolute;
              top: 29%;
              left: 0;
              z-index: 1;
              padding: 0 8px;
            }
            input {
              &::placeholder {
                font-weight: 600;
                font-size: 14px;
                color: #7a869a;
                text-align: center;
              }
            }
          }
          .ant-picker {
            height: 32px !important;
          }
        }
      }
    }
    .ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input)
      .ant-select-selector {
      border-color: #aed2f2 !important;
      border-right-width: 1px !important;
      outline: 0;
      box-shadow: 0 0 0 0px;
    }
  }
  .row-actived {
    td {
      background: #c1f0db !important;
    }
  }
`;
