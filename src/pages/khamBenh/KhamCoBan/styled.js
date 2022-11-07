import styled, { createGlobalStyle } from "styled-components";

import { Input, Tag, Row, Checkbox, Radio } from "antd";
export const Main = styled.div`
  padding: 17px 30px;
  @media (max-width: 1368px) {
    padding: 17px 15px;
  }
  pointer-events: ${(props) =>
    props.trangThaiKham === 150 || [10, 30, 40].includes(props.trangThaiKSK)
      ? "none"
      : ""};
  .save-info {
    font-size: 16px;
    line-height: 20px;
    color: #054ab9;
    display: flex;
    padding-top: 16px;
    svg {
      cursor: pointer;
      width: 18px;
      height: 18px;
      margin-left: 9px;
    }
  }
`;

export const SelectGroup = styled.div`
  line-height: 25px;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 6 6"><circle cx="3" cy="3" r="0.4" fill="black" /></svg>')
    20px;
  background-position-y: 12px;
  background-size: 5px 28px;
  margin-top: 10px;
  display: flex;
  > span {
    display: inline-block;
    padding-right: 5px;
    background: #ffffff;
    vertical-align: sub;
    white-space: nowrap;
    /* flex: 1 0 auto; */
    /* height: ${(props) =>
      props.dataHeight ? props.dataHeight + "px" : "auto"}; */
  }
  .select-box {
    display: inline-block;
    .ant-select-selector {
      margin-top: -13px;
      background: none;
      border: 0;
    }
  }
  .red-text {
    color: #ef4066;
  }
  .select-box-chan-doan {
    display: inline-block;
    flex: 1;
    width: 100px;
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
        & .ant-select-selection-overflow {
          width: 380px;
        }
      }
    }
    .ant-select-item-option-active {
      background-color: #c7c7c7 !important;
      &:hover {
        background-color: #c7c7c7 !important;
      }
    }
    .ant-select-item-option-selected {
      background-color: #d1edfb !important;
    }
  }
`;

export const HanhChinh = styled.div`
  display: flex;
  .info-partient__left {
    position: relative;
    width: 220px;
    border-radius: 6.46875px;
    border: 2px solid #e8eaed;
    height: 220px;
    margin-right: 15px;
    overflow: hidden;
    @media (max-width: 1368px) {
      height: 150px;
    }
    & .patient-avatar {
      width: 100%;
      height: 100%;
      object-fit: cover;
      overflow: hidden;
    }
    .ant-image {
      display: initial !important;
      .ant-image-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 6.46875px;
      }
    }
    .info-popover {
      position: absolute;
      bottom: 6px;
      right: 6px;
      width: 32px;
      height: 32px;
      background: #fff;
      border-radius: 22px;
      padding: 6px;
    }
  }
  .info-partient__right {
    // width: calc(100% - 250px);
    .info-profile {
      font-size: 14px;
      line-height: 25px;
      color: #172b4d;
      span {
        margin-left: 3px;
        font-weight: bolder;
      }
    }
    .checkbox-ksk {
      .ant-checkbox {
        margin-left: 0px;
        margin-right: 5px;
      }
      font-weight: bolder;
      color: #0762f7;
    }
    .info-date {
      display: flex;
      > span {
        white-space: nowrap;
      }
      .ant-picker {
        padding: 0;
        height: 21px;
      }
    }
  }
  .info-partient__detail {
    position: relative;
    .icon-info {
      position: absolute;
      z-index: 9999;
      top: 40.5px;
      right: -11px;
    }
  }
`;
export const Tags = styled(Tag)`
  color: ${(props) => (props.cl ? props.cl : "#172b4d")};
  font-weight: ${(props) => (props.cl ? "Bold" : "")};
  &:hover {
    color: ${(props) => (props.cl ? props.cl : "#172b4d")};
    font-weight: ${(props) => (props.cl ? "Bold" : "")};
  }
`;
export const Title = styled.div`
  font-weight: 900;
  font-size: 18px;
  line-height: 25px;
  color: #172b4d;
  padding-top: 16px;
`;
export const TitleSub = styled.div`
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  color: ${(props) => (props.hightlight ? "red" : "#172B4D")};
  padding-top: 10px;
  width: ${(props) => (props.width ? props.width + "px" : "unset")};
`;
export const DivInfo = styled.div`
  max-width: ${(props) => `${props.maxWidth} ? ${props.maxWidth}px : ${null}`};
  /* position: relative; */
  /* span:last-child {
    position: absolute;
    right: 0;
    top: 0;
  } */
  display: flex;
  & .ant-select {
    & .ant-select-selector {
      &:hover {
        border: 0;
      }
    }
    & .ant-select-arrow {
      display: none;
    }
  }
`;

export const RowCustom = styled(Row)`
  align-items: center;
`;
export const CheckboxGroup = styled(Checkbox.Group)`
  width: 100%;
`;
export const RadioGroup = styled(Radio.Group)`
  margin-left: 5px;
`;
