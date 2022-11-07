import styled, { createGlobalStyle } from "styled-components";
import { input, select, button } from "components/mixin";
import { Popover } from "antd";

export const PopoverWrapper = styled(Popover)``;

export const GlobalStyle = createGlobalStyle`
    .ant-popover-inner {
        background: #1b1d21;
        box-shadow: 0px 0px 20px rgba(9, 30, 66, 0.2);
        border-radius: 15px;
        height: 30px;
        }
    & .ant-popover-arrow-content {
        background-color: #1b1d21;
    }
    & .ant-popover-inner-content {
        color: #ffffff;
        padding: 4px 16px;
    }
`;

export const Main = styled.div`
  .body-info {
    .box-item {
      .ant-checkbox {
        input:focus + span {
          border: 1px solid #1890ff;
          border-color: #1890ff;
        }
      }
    }
  }
  &.main-header {
    margin: 20px 2px 0px 10px;
    border-radius: 16px;
    padding: 0;
    display: flex;
    /* background: linear-gradient(0deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.95)), #0762F7; */
    /* box-shadow: 0px 0px 15px rgba(9, 30, 66, 0.07); */
    .avatar {
      cursor: pointer;
      height: 90%;
      width: 100%;
      margin: auto;
      /* margin-top: 14px; */
      position: relative;
      &__image {
        width: 100%;
        border-radius: 3px;
        height: 96%;
        object-fit: cover;
        @media (min-width: 1440px) {
          border-radius: 10px;
          height: 100%;
          object-fit: contain;
        }
      }
      &__icon {
        position: absolute;
        right: 9px;
        width: 32px;
        height: 32px;
        bottom: 9px;
      }
      & .wrapperCamera {
        position: relative;
        height: 100%;
        width: 100%;
        & .hangTheIcon {
          position: absolute;
          right: -10px;
          top: -10px;
          transform: rotateZ(30deg);
          & img {
            width: 30px;
            height: 30px;
            object-fit: contain;
          }
        }
      }
    }
    .avatar-no-drop {
      cursor: no-drop;
    }
    .body-info {
      width: 100%;
      .ant-col {
        padding: 0 10px;
        &:first-of-type {
          padding-left: 0;
          /* padding-right: 0; */
        }
        .header-item {
          .item-input {
            margin-bottom: 18px;
            &.input-ma-dinh-danh {
              position: relative;
              & svg.qr-icon {
                position: absolute;
                right: 10px;
                bottom: 4px;
                @media (min-width: 1400px) {
                  bottom: 8px;
                }
                width: 24px;
                height: 24px;
              }
            }
            ${input};

            .d-flex {
              display: flex;
              justify-content: space-between;
              label {
                display: flex;
                .sub-color {
                  font-style: italic !important;
                  color: #7a869a;
                }
                &:first-of-type {
                }
                &:last-of-type {
                  flex: 1;
                  display: flex;
                  align-items: center;
                  justify-content: end;
                  padding-right: 2px;
                }
              }
            }
          }
          .item-select {
            margin-bottom: 18px;
            ${select};
          }
          .item-text-area {
            margin-bottom: 18px;
            ${input};
          }
        }
        .meta-info {
          .header-item {
            &:first-of-type {
              padding-left: 0;
            }
            &:last-of-type {
              padding-right: 0 !important;
            }
            padding-left: 0;
          }
        }
      }
      .header-button {
        padding-right: 0;
        display: flex;
        margin-top: 18px;
        .button-item {
          ${button};
          @media screen and (max-width: 1815px) {
            font-size: 14px;
          }
          @media screen and (max-width: 1660px) {
            font-size: 12px;
          }
          @media screen and (max-width: 1599px) {
            font-size: 15px;
          }
          @media screen and (max-width: 1440px) {
            font-size: 14px;
          }
          @media screen and (max-width: 1024px) {
            margin-right: 0 !important;
            margin-bottom: 24px;
          }
          @media screen and (max-width: 768px) {
            font-size: 14px;
          }
        }
        @media screen and (max-width: 1024px) {
          display: block;
        }
      }
      .box {
        margin-top: 39px;
        &-item {
          font-weight: 400;
          color: #172b4d;
          margin-left: 0 !important;
          margin-bottom: 9px;
          line-height: 20px;
          font-size: 16px;
          .ant-checkbox-inner {
            width: 16px;
            height: 16px;
            border-color: white;
            border: 1px solid #bfbfbf;
          }
          /* .ant-checkbox {
                    border: 1px solid #bfbfbf
                } */
          > span {
            font-weight: 600;
            font-size: 13px;
            line-height: 20px;
          }
        }
        @media screen and (max-width: 1024px) {
          margin-top: 28px;
        }
        @media (min-width: 1440px) {
          &-item {
            > span {
              font-size: 16px;
            }
          }
        }
      }
    }
  }
  .detail-view {
    color: #054ab9;
    /* padding-left: 10px; */
    font-size: 16px;
    line-height: 20px;
    align-items: center;
    cursor: pointer;
    display: flex;
    & svg {
      margin-left: 5px;
      width: 20px;
      height: 20px;
    }
  }

  & .label {
    display: flex !important;
    align-items: center;
  }
`;
