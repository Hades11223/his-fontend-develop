import styled from "styled-components";

export const Main = styled.div`
  background: #e6effe;
  border-radius: 16px;
  padding: 16px;
  font-family: Nunito Sans, sans-serif;
  width: 100%;
  .title-header {
    font-weight: bold;
    font-size: 14px;
    line-height: 25px;
    text-transform: uppercase;
    color: #172b4d;
  }
  .infinite-container {
    overflow-y: auto;
    .demo-loading-container {
      text-align: center;
      .ant-spin {
        margin-top: 10%;
      }
    }
    .paid-highlights {
      background: #c1f0db !important;
    }
    .info {
      cursor: pointer;
      background: #ffffff;
      box-shadow: 0px 3px 5px rgba(9, 30, 66, 0.2),
        0px 0px 1px rgba(9, 30, 66, 0.31);
      border-radius: 8px;
      margin-bottom: 4px;
      padding: 2px 12px 2px 12px;
      &:first-child {
        margin-top: 2px;
      }
      &-left {
        display: flex;
        align-items: center;
        font-weight: bold;
        font-size: 14px;
        line-height: 25px;
        color: #172b4d;
        &__ic {
          height: 17px;
          width: 17px;
          margin-right: 6px;
        }
      }
      &-left-paid {
        color: #049254;
      }
      &-right {
        font-weight: bold;
        font-size: 14px;
        line-height: 25px;
        text-align: right;
        color: #b3304c;
      }
    }
  }
`;
