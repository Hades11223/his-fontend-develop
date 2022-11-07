import styled, { createGlobalStyle } from "styled-components";
import { Col } from "antd";

export const Main = styled(Col)`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 8px;
  min-height: 150px;
  & .tong-tien {
    flex: 1;
    overflow: hidden;
    & .wrapper {
      .main {
        padding: 5px 10px;
        background: #ffffff;
        overflow-y: scroll;
        height: 100%;
        .note {
          font-weight: 400;
          font-size: 14px;
          line-height: 19px;
          color: #ef4066;
          span {
            font-weight: bold;
          }
        }
        .not-pay {
          font-weight: bold;
          font-size: 16px;
          line-height: 22px;
          color: #172b4d;
          padding: 2px;
        }
        .content-main {
          .item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: #d9dbe9 solid 1px;
            .title {
              font-weight: 400;
              font-size: 14px;
              line-height: 19px;
              color: #14142b;
              padding: 7px 0 5px;
            }
            .price {
              font-size: 14px;
              line-height: 19px;
              color: #14142b;
              font-weight: 400;
            }
            &:last-child {
              border-bottom: none;
              .title {
                font-size: 20px;
                line-height: 27px;
                color: #fc3b3a;
                font-weight: 400;
              }
              .price {
                font-size: 20px;
                line-height: 27px;
                color: #fc3b3a;
                font-weight: 700;
              }
            }
          }
        }
      }
    }
  }
  .footer {
    position: relative;
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    margin-bottom: 0px;
    align-items: center;
    .person {
      .title {
        span {
          margin-right: 8px;
          color: #ffffff;
        }
        padding-right: 10px;
      }
      border: 1px solid #0762f7;
      background: #0762f7;
      height: 38px;
    }
  }
  & .next-patient {
    color: #7a869a;
    text-align: right;
  }
`;
export const GlobalStyle = createGlobalStyle`
  .tiep-don-in-options{
    &.right{
      padding-left: 15px;
      .ant-space{
        gap: 0px !important;
      }
      &::after{
        top: 10px;
        left: 5px;
        content: '';
        position: absolute;
        width: 0;
        height: 0;
        border-bottom: 10px solid transparent;
        border-right: 10px solid white;
        border-top: 10px solid transparent;
        clear: both;
      }
      .ant-popover-arrow{
        display: none !important;
        .ant-popover-arrow-content{
        }
      }
      .ant-popover-inner-content{
        width: fit-content;
      }
    }
    .ant-popover-inner-content{
      padding: 0px;
      .ant-space-item{
        padding: 10px;
        margin: 0;
        &:hover {
          background: linear-gradient(0deg,rgba(255,255,255,0.75),rgba(255,255,255,0.75)),#0762F7;
        }
        white-space : nowrap;
      }
    }
  }
`;
