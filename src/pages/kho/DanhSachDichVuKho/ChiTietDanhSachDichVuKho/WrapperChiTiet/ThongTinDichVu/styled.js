import styled, { createGlobalStyle } from 'styled-components';
import { button } from "components/mixin";
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
    &.info {
        padding: 10px 10px 10px 14px;
        /* margin-top: 30px; */
        /* background: linear-gradient(0deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.95)), #0762F7; */
        box-shadow: 0px 0px 15px rgba(9, 30, 66, 0.07);
        border-radius: 8px;
        display: flex;
        background: white;
        /* padding: 30px; */
        .avatar-header {
            width: 96px;
            margin-right: 15px;
            .order {
                border: 1px dashed #0762F7;
                box-sizing: border-box;
                width: 96px;
                margin: auto;
                height: 30px;
                text-align: center;
                line-height: 30px;
                font-style: normal;
                font-weight: 900;
                font-size: 16px;
                color: #0762F7;
            }
            .avatar {
                cursor: pointer;
                height: 96px;
                width: 96px;
                margin: auto;
                margin-top: 18px;
                position: relative;
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
                img {
                    width: 96px;
                    height: 96px;
                    object-fit: cover;
                    border-radius: 3px;
                }
            }
        }
        .body-info {
            width: 100%;
            .title-header {
                font-size: 16px;
                font-weight: 700;
            }
            .title {
                font-size: 14px;
                font-weight: bold;
            }
            .info-full {
                /* background: linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), #0762F7; */
                border-radius: 16px;
                /* padding: 11px 15px 10px;
                margin-top: 12px; */
                .ant-col{
                    padding-left: 0px !important;
                }
                .info {
                    padding-left: 15px;
                    .person {
                        display: flex;
                        font-size: 14px;
                        line-height: 25px;
                        color: #172B4D;
                        .title {
                            width: 72px;
                        }
                        .detail {
                            font-weight: bold;
                            width: calc(100% - 72px);
                        }
                        .title.small {
                            width: 125px;
                        }
                        .detail.small {
                            font-weight: bold;
                            width: calc(100% - 125px);
                        }
                        @media  (max-width: 1599px) {
                            .title.small, .title.last {
                                width: 125px;
                            }
                            .detail.small, .detail.last {
                                width: calc(100% - 125px);
                            }
                            .title.address {
                                width: 72px;
                            }
                            .detail.address {
                                width: calc(100% - 72px);
                            }
                        }
                    }
                }
            }
        }
    }
`;

export const InputSearch = styled.div`
  background: #ffffff;
  border: 2px solid #dfe1e6;
  box-sizing: border-box;
  border-radius: 4px;
  display: flex;
  align-items: center;
  padding: 5px 8.5px;
  width: 459px;
  input {
    padding: 0 1em 0 8.5px !important;
    border: none;
    border-radius: 50px;
    font-weight: 600;
    font-size: 14px;
    line-height: 19px;
    color: #172b4d;
    &:focus {
      border: none;
      box-shadow: none;
    }
    &::placeholder {
      color: #7a869a;
    }
  }
  .icon-search {
    height: 15px;
  }
  .qr-search {
    height: 20px;
  }
`;