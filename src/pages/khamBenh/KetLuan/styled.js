import styled from "styled-components";
import { Collapse } from "antd";

export const PhieuChiDinhWrapper = styled.div`
  .save-info {
    font-size: 16px;
    line-height: 20px;
    color: #054ab9;
    display: flex;
    padding-top: 16px;
    cursor: pointer;
    svg {
      width: 18px;
      height: 18px;
      margin-left: 9px;
    }
  }
  &.form-detail {
    .flex-center {
      display: flex;
      justify-content: center;
    }
    h3 {
      font-style: normal;
      font-weight: 900;
      font-size: 18px;
    }
    .action-btn {
      display: flex;
      justify-content: center;
      img {
        margin: 0 8px;
      }
    }
    .reason {
      .label {
        font-style: normal;
        font-weight: 900;
        font-size: 18px;
      }
    }
    .mr-17 {
      margin: 17px 0;
    }
    .mr-20 {
      margin: 20px 0;
    }
    .mr-5 {
      margin: 5px 0;
    }
    .mrb-5 {
      margin-bottom: 5px;
    }
    .mrl-5 {
      margin-left: 5px;
    }
    .mrr-20 {
      margin-right: 20px;
    }
    .sign-box {
      margin-bottom: 200px;
      &__text {
        display: inline-block;
        width: 100px;
        > span {
          display: inline-block;
        }
      }
      .sign-bottom {
        display: flex;
        flex-direction: column;
        align-items: center;
        &__text {
          display: inline-block;
          width: 100px;
          > span {
            display: inline-block;
            width: 100px;
          }
        }

        &__title {
          font-size: 20px;
          font-weight: bold;
        }
      }
    }
    .sign-kb {
      .sign-location {
        display: inline-block;
        width: 100px;
        > span {
          display: inline-block;
        }
      }
    }
  }
  & .flex {
    display: flex;
  }
  & .flex1 {
    flex: 1;
  }
  & .ant-select {
    & .ant-select-arrow {
      margin-top: -15px;
    }
  }
  & .sign-bottom__title {
    font-weight: 900;
    color: #172b4d;
  }
  & .sign-bottom__sign {
    font-size: 12px;
    color: #172b4d;
  }
  & .ant-picker-input > input::placeholder {
    color: #172b4d;
    opacity: 1;
  }
  & .ant-picker {
    padding: 0px;
  }
  & .disabled {
    & .ant-checkbox-wrapper {
      cursor: default !important;
      & .ant-checkbox-input {
        cursor: default !important;
      }
      &:hover {
        & .ant-checkbox-inner {
          border: 1px solid #d9d9d9 !important;
        }
      }
    }
  }
`;

export const SelectGroup = styled.div`
  line-height: 25px;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 6 6"><circle cx="3" cy="3" r="0.4" fill="black" /></svg>')
    20px;
  background-position-y: 12px;
  background-size: 5px 28px;
  display: flex;
  > span {
    display: inline-block;
    padding-right: 5px;
    background: #ffffff;
    vertical-align: sub;
    height: ${(props) =>
      props.dimension?.firstHeight
        ? props.dimension?.firstHeight + "px"
        : "auto"};
    /* width: ${(props) =>
      props.dimension?.firstWidth
        ? props.dimension?.firstWidth + "px"
        : "auto"}; */
  }
  .select-box {
    display: inline-block;
    flex: 1;
    & .ant-select {
      width: 100%;
      & .ant-select-selector {
        margin-top: -13px;
        background: none;
        border: 0;
      }
    }
  }
  .select-box-chan-doan {
    display: inline-block;
    width: 734px;
    &
      .ant-select
      .ant-select-multiple
      .ant-select-allow-clear
      .ant-select-show-search {
      width: auto;
    }
    & .ant-select {
      width: 100%;
      &.ant-select-show-search {
        width: auto;
      }
      & .ant-select-selector {
        margin-top: -13px;
        background: none;
        border: 0;
        /* & .ant-select-selection-overflow {
        display: block;
        } */
      }
    }
  }
`;

export const CollapseWrapper = styled(Collapse)`
  width: 100%;
  .ant-collapse-content {
    border: none;
  }
  .ant-collapse-arrow {
    display: none !important;
  }
  > .ant-collapse-item {
    background: #ffffff;
  }
`;

export const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  .info {
    display: flex;
    align-items: center;
    justify-content: center;
    .collapse-arrow {
      transform: ${(props) => (props.isCollapsed ? "rotate(90deg)" : "unset")};
      transition: 0.3s;
    }
    &__name {
      font-weight: bold;
      font-size: 24px;
      line-height: 33px;
      margin: 0 2px 0 6px;
    }
    img {
      margin: 0 6px;
    }
  }
  .form-info {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    margin: 0 15px;
    .text {
      position: absolute;
      background: #ffffff;
      z-index: 1;
      left: 0;
      text-indent: initial;
    }
    &__left {
      width: 33.33%;
      position: relative;
    }
    &__center {
      width: 33.33%;
      text-align: center;
      position: relative;
      .form-id {
        color: #0762f7;
        font-size: 14px;
        line-height: 25px;
      }
    }
    &__right {
      position: relative;
      width: 33.33%;
    }
  }
`;
export const StickyWrapper = styled.div`
  position: sticky;
  background-color: #fff;
  z-index: 2;
  top: 0;
  width: 100%;
  .info {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    font-size: 14px;
    line-height: 19px;
    &__left {
      span {
        font-weight: bold;
      }
    }
    &__right {
      span {
        font-weight: bold;
      }
    }
  }
`;
