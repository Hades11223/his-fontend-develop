import styled from "styled-components";
import { Popover } from "antd";
export const Main = styled.div`
  box-shadow: 0px 0px 15px rgba(9, 30, 66, 0.07);
  border-radius: 16px;
  padding: 13px 30px 21px;
  height: 100%;
  position: relative;
  background-color: #fff;
  .info-partinent {
    align-items: center;
    margin-top: 15px;
    &__index {
      font-weight: 900;
      font-size: 16px;
      color: #0762f7;
      border: 1px dashed #0762f7;
      padding: 8px;
    }
    &__name {
      padding: 0 35px;
      font-size: 18px;
      line-height: 25px;
      color: #172b4d;
      span {
        font-weight: 900;
        text-transform: uppercase;
      }
    }
    &__detail {
      color: #054ab9;
      font-size: 16px;
      line-height: 20px;
      position: relative;
      cursor: pointer;
      img {
        padding-left: 8px;
      }
      .icon-info {
        position: absolute;
        z-index: 9999;
        top: 31.5px;
        right: -11px;
      }
    }

    &__history {
      color: #054ab9;
      font-size: 16px;
      line-height: 20px;
      position: relative;
      cursor: pointer;
      padding-left: 25px;
      img {
        padding-left: 8px;
      }
      .icon-info {
        position: absolute;
        z-index: 9999;
        top: 31.5px;
        right: -11px;
      }
    }
  }
  .modalThongTinBN {
    position: absolute;
    width: 100%;
    right: 0;
    top: calc(100% + 5px);
    background: linear-gradient(0deg, #fffffff2, #fffffff2), #0762f7;
    box-shadow: 0px 0px 20px rgb(9 30 66 / 20%);
    border-radius: 16px;
    padding: 30px;
    z-index: 999;
  }
`;
export const InputSearch = styled.div`
  background: #ffffff;
  border: ${(props) =>
    !props.focusInput ? "2px solid #dfe1e6" : "1px solid #0762f7"};
  box-sizing: border-box;
  border-radius: 50px;
  display: flex;
  align-items: center;
  padding: 3px 8px;
  margin-right: 36px;
  width: 251px;
  box-shadow: ${(props) => (props.focusInput ? "0 0 0 3px #0062ff47" : null)};
  :hover {
    border: 1px solid #0762f7;
    box-shadow: 0 0 0 3px #0062ff47;
  }
  input {
    padding: 0 1em 0 8.5px !important;
    border: none;
    border-radius: 50px;
    font-weight: 600;
    font-size: 14px;
    line-height: 19px;
    color: #172b4d;
    &:focus,
    &:hover {
      border: none !important;
      box-shadow: none !important;
    }
    &::placeholder {
      color: #7a869a;
    }
  }
  .icon-search {
    height: 15px;
  }
  .qr-search {
    height: 24px;
  }
`;
export const PopoverCustome = styled(Popover)`
  .ant-popover {
    right: 0 !important;
    width: 100%;
    left: initial !important;
  }
  .ant-popover-inner {
    background: linear-gradient(0deg, #fffffff2, #fffffff2), #0762f7;
    box-shadow: 0px 0px 20px rgb(9 30 66 / 20%);
    border-radius: 16px;
    min-width: 100%;
    .ant-popover-inner-content {
      padding: 30px;
    }
  }
`;
