import styled from "styled-components";

export const Main = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  border: 1px solid rgba(23, 43, 77, 0.25);
  border-radius: 8px;
  -moz-border-radius: 8px;
  -webkit-border-radius: 8px;
  padding-bottom: 16px;
  width: 100%;
  height: 100%;
  .header {
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
    align-items: center;
    background: linear-gradient(
        0deg,
        rgba(23, 43, 77, 0.05),
        rgba(23, 43, 77, 0.05)
      ),
      #ffffff;
    padding: 2px 10px;
    width: 100%;
    display: flex;
    flex-direction: row;
    height: 24px;
    ._title {
      width: 55%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-style: normal;
      font-weight: 700;
      font-size: 14px;
      line-height: 24px;
      color: #172b4d;
    }
    ._search {
      width: 45%;
      padding: 0 5px;
      border-radius: 6px;
      height: 100%;
      display: flex;
      flex-direction: row;
      background-color: #ffff;
      border: 1px solid rgba(23, 43, 77, 0.25);
      align-items: center;
      .ant-input {
        border: none;
        padding: 0;
        height: 100%;
        &:hover,
        &:active,
        &:focus {
          box-shadow: none;
        }
      }
    }
    ._right_btn {
      width: 45%;
      display: flex;
      flex-direction: row-reverse;
      align-items: flex-end;
    }

    @media screen and (min-width: 1921px) {
      height: 34px;
      ._title {
        width: 68%;
        font-size: 22px;
      }
      ._search {
        width: 32%;
        font-size: 20px;
      }
    }
    @media screen and (min-width: 1661px) and (max-width: 1920px) {
      height: 32px;
      ._title {
        width: 65%;
        font-size: 20px;
      }
      ._search {
        width: 35%;
        font-size: 18px;
      }
    }
    @media screen and (min-width: 1441px) and (max-width: 1660px) {
      height: 30px;
      ._title {
        width: 63%;
        font-size: 18px;
      }
      ._search {
        width: 37%;
        font-size: 16px;
      }
    }
    @media screen and (min-width: 1367px) and (max-width: 1440px) {
      height: 28px;
      ._title {
        width: 60%;
        font-size: 16px;
      }
      ._search {
        width: 40%;
        font-size: 14px;
      }
    }
  }
  .wrapper {
    width: 100%;
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    & .ant-table-wrapper {
      height: 100%;
      overflow: auto;
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
                overflow: auto scroll;
                max-height: 100% !important;
                flex: 1;
                min-height: unset !important;
                max-height: unset !important;
                height: calc(100vh - 630px);
                border-radius: 0 0 8px 8px;
                .ant-table-tbody {
                  .ant-table-row {
                    .ant-table-cell {
                      /* border-bottom: none; */
                      border: none !important;
                      cursor: pointer;
                      &:last-of-type {
                        &:before {
                          display: none;
                        }
                      }
                      &:before {
                        position: absolute;
                        top: 50%;
                        right: 0;
                        width: 1px;
                        height: 100%;
                        background-color: rgba(0, 0, 0, 0.06);
                        transform: translateY(-50%);
                        transition: background-color 0.3s;
                        content: "";
                      }
                    }
                  }
                }
                @media screen and (max-height: 710px) {
                  /* height: calc(100vh - 590px); */
                }
                @media (min-height: 711px) and (max-height: 768px) {
                  /* height: calc(100vh - 610px); */
                }
                @media screen and (min-height: 769px) and (max-height: 800px) {
                  /* height: calc(100vh - 590px); */
                }
                @media screen and (min-height: 801px) and (max-height: 900px) {
                  /* height: calc(100vh - 630px); */
                }
                @media screen and (min-height: 901px) and (max-height: 1040px) {
                  /* height: calc(100vh - 830px); */
                }
                @media screen and (min-height: 1041px) {
                  /* height: calc(100vh - 860px); */
                }
              }
            }
          }
        }
      }
    }
    .ant-table-cell {
      padding: 4px 5px;
    }
    .bg-blue {
      background: linear-gradient(
          0deg,
          rgba(255, 255, 255, 0.95),
          rgba(255, 255, 255, 0.95)
        ),
        #0762f7;
    }
    .custome-header .title-box {
      justify-content: flex-start;
      align-items: center;
      border-bottom: none !important;
    }
  }
`;
