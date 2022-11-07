import { Col } from "antd";
import styled from "styled-components";

const Main = styled(Col)`
  padding-left: 20px;
  @media (max-width: 991px) {
    padding-left: 0px;
    margin-top: 20px;
  }
  .title {
    font-weight: bold;
    font-size: 24px;
    line-height: 20px;
    color: #172b4d;
    margin-bottom: 29px;
  }
  .ant-collapse {
    font-family: Nunito Sans, sans-serif !important;
    border: none;
    .ant-collapse-item {
      border-radius: 3px;
      margin-bottom: 36px;
      border: none;
      .ant-collapse-content {
        display: none;
      }
      .ant-collapse-header {
        padding: 20px 56px 20px 20px;
        background: #fff9f2;
        .item {
          display: flex;
          line-height: 20px;
          color: #172b4d;
          &--icon {
            padding-right: 18px;
          }
          &--title {
            font-weight: 600;
            font-size: 16px;
          }
          &--description {
            font-size: 14px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            margin: 8px 0;
          }
          &--link {
            color: #0762f7;
          }
        }
      }
    }
    .content-right-panel {
      background: linear-gradient(
          0deg,
          rgba(255, 255, 255, 0.95),
          rgba(255, 255, 255, 0.95)
        ),
        #0762f7;
      white-space: pre-wrap;
    }
    .content-right-success {
      background: linear-gradient(
          0deg,
          rgba(255, 255, 255, 0.9),
          rgba(255, 255, 255, 0.9)
        ),
        #05c270 !important;
      white-space: pre-wrap;
    }
    .content-right-warn {
      background: linear-gradient(
          0deg,
          rgba(255, 255, 255, 0.95),
          rgba(255, 255, 255, 0.95)
        ),
        #fe8803;
      white-space: pre-wrap;
    }
  }
  .ant-collapse-item-active {
    .item--description {
      overflow: inherit !important;
      text-overflow: initial !important;
      display: block !important;
    }
  }
`;

export { Main };
