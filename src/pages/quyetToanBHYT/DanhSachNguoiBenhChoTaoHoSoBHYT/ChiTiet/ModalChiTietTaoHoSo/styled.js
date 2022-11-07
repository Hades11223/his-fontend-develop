import styled, { createGlobalStyle } from "styled-components";

export const Main = styled.div`
  padding: 10px;
  .main__container {
    margin: 0 !important;
  }
  .header-table {
    border-bottom: 1px solid #cecece;
    padding: 8px 17px 8px 16px;
    flex-flow: initial;
    align-items: center;
    &__left {
      font-family: Nunito Sans;
      font-size: 16px;
      font-style: normal;
      font-weight: 700;
      line-height: 24px;
      letter-spacing: 0px;
      text-align: left;
    }
    &__right {
      margin-left: auto;
      img {
        cursor: pointer;
      }
    }
  }
  .ant-table-body {
    .ant-table-row {
      &.active {
        .ant-table-cell {
          background: #c1f0db;
        }
      }
    }
  }
  & .ant-row-middle {
    display: flex;
    & .ant-form-item {
      flex: 1;
      &:first-of-type {
        margin-right: 5px;
      }
      & .ant-picker {
        width: 100%;
      }
    }
  }
`;

export const GlobalStyles = createGlobalStyle`
  .time-picker-danh-sach-nguoi-benh{
    .ant-picker-ok{
        display: none;
    } 
  }
`;
