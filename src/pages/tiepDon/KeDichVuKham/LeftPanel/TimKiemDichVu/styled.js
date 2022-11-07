import styled from "styled-components";
import { Row } from "antd";

export const Main = styled.div`
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .box {
    &-item {
      .ant-checkbox-inner {
        border-color: #b9b9b9;
      }
    }
  }
  .header {
    height: 40px;
    background-color: #ffffff;
    padding: 0 16px 0 16px !important;
    margin-bottom: 0px;
    margin-top: 16px !important;
    .content {
      color: #172b4d;
    }
    .content-note {
      display: flex;
      .ant-select {
        margin-right: 6px;
        .ant-select-selector {
          border-radius: 4px;
          width: 250px;
          display: block;
          @media (max-width: 768px) {
            width: 180px;
          }
          .ant-select-selection-item {
            font-weight: 600;
            line-height: 30px;
            color: #172b4d;
          }
          .ant-select-selection-placeholder {
            color: #7a869a;
            font-weight: 600;
          }
        }
      }
      .input-text {
        img {
          position: absolute;
          z-index: 6;
          bottom: 12px;
          margin-left: 10px;
        }
        .ant-input {
          background: #ffffff;
          border-radius: 4px;
          font-size: 14px;
          line-height: 22px;
          color: #172b4d;
          font-weight: 600;
          padding-left: 36px;
          width: 254px;
          @media (max-width: 768px) {
            width: 200px;
          }
          &::placeholder {
            color: #7a869a;
          }
        }
      }
      .icon-option {
        padding: 5px 0 0 14px;
        & img {
          cursor: pointer;
        }
        & img:first-child {
          padding-right: 16px;
          transform: scale(0.8);
        }
      }
    }
  }
  & .main-table-wrapper {
    flex: 1;
    overflow: hidden;
    box-shadow: 0px 0px 15px rgb(9 30 66 / 7%);
    & .main__container {
      height: 100%;
      & .custome-header {
        & .title-box {
          border-bottom: none !important;
        }
      }
    }
  }
`;
