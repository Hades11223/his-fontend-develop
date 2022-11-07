import styled, { createGlobalStyle } from "styled-components";
import Box from "../Box";

export const GlobalStyle = createGlobalStyle`
& .popover-scan{
  .ant-popover-inner-content{
    padding: 0 !important;
  }
  & .list-action-upload{
    p{
        :hover{
            cursor: pointer;
            background: linear-gradient(0deg,rgba(255,255,255,0.75),rgba(255,255,255,0.75)),#0762F7;
        }
        margin: 0 !important;
    }
    .item{
      padding: 5px 10px;
        span{
            svg{
                margin-right: 10px;
                fill: #0762F7 ;
                width: 20px;
                height: 20px;
                path {
                    fill: #0762F7 ;
                }
            }
        }
    }

   }
}
`;

export const Main = styled(Box)`
  height: 100%;
  display: flex;
  flex-direction: column;
  .header {
    justify-content: space-between;
  }
  table {
    &::before {
      border-radius: unset !important;
      border-top: 0 !important;
    }
    border-top: 0 !important;
  }
  .ant-table-body {
    border-radius: unset;
    table {
    }
    max-height: 58vh;
    min-height: 58vh;
    .ant-table-cell {
      font-weight: 700;
      border-bottom: 0 !important;
      border-top: 0 !important;
      padding: 6px 4px !important;
    }
    .ant-table-row {
      &.active {
        background: #c1f0db !important;
        & td {
          background: #c1f0db !important;
        }
      }
      &:nth-child(2n) {
      }
      &:nth-child(2n + 1) {
        background-color: #ffffff;
      }
    }
  }
  .ant-table-fixed-header {
    border-radius: unset !important;
  }
  .main__container {
    margin-top: 0 !important;
    .title-box {
      min-height: 26px !important;
      padding: 0px !important;
      border-bottom: 0 !important;
      justify-content: center !important;
      align-items: center;
      border-bottom: 1px solid #dfe1e6 !important;
    }
  }
  & .container {
    flex: 1;
    display: flex;
    flex-direction: column;
    & .__list {
      flex: 1;
    }
  }
  & .__list {
    overflow: hidden;
    & .main-table-wrapper {
      height: 100%;
    }
  }
  & .__button {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: 10px 0;
  }
`;
