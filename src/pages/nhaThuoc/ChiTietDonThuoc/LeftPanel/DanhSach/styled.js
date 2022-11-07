import styled from "styled-components";
import { Button, Popover, InputNumber } from "antd";
import bgPageBottom from "assets/images/kho/calendar.png";
import { InputTimeout } from "components";
export const Main = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  .ant-table-cell {
    vertical-align: middle !important;
  }
  & .content {
    display: flex;
    align-items: center;
    & svg.icon {
      width: 20px;
      height: 20px;
      cursor: pointer;
      margin-left: 5px;
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
  &:focus-within {
    border: 1px solid #0762f7 !important;
    box-shadow: 0 0 0 3px #0062ff47 !important;
    /* box-shadow: 0 0 0 2px rgb(24 144 255 / 20%); */
    /* border: 0; */
  }

  input {
    padding: 0 1em 0 8.5px !important;
    border: none;
    border-radius: 50px;
    font-weight: 600;
    font-size: 14px;
    line-height: 19px;
    color: #172b4d;
    &:hover {
      border: none !important;
      box-shadow: none !important;
    }
    &:focus {
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
    height: 20px;
  }
`;

export const Header = styled.div`
  position: relative;
  width: 100%;
  .header {
    padding: 0 30px 0 30px;
    display: flex;
    align-items: center;
    width: 100%;
    height: 60px;
    padding-left: 16px;
    &-row {
      width: 100%;
      height: 100%;
      align-items: center;
      padding-bottom: 10px;
      justify-content: space-between;
    }
    .ant-row {
      width: 100%;
    }
    .mienGiam {
      margin-left: auto;
    }
    .content {
      /* margin-top: -17px; */
      /* padding-top: 10px; */
      font-style: normal;
      font-weight: bold;
      font-size: 18px;
      /* line-height: 24px; */
      &-note {
        /* margin-top: -17px; */
        font-size: 14px;
        margin-left: 14px;
        height: 30px;
        /* line-height: 24px; */
        color: white;
        span {
          font-weight: 900;
        }
      }
      @media screen and (min-width: 1200px) and (max-width: 1599px) {
        font-size: 15px !important;
        &-note {
          font-size: 11px;
        }
      }
    }
  }
`;

export const InputText = styled(InputTimeout)`
  border: 0px;
  padding: 0px;
  width: 100%;
  background: transparent;
  pointer-events: ${(props) => (props.isAdvised ? "unset" : "none")};
  text-align: ${(props) => (props.align ? props.align : "unset")};
`;
export const InputNumberStyled = styled(InputNumber)`
  border: 0px;
  padding: 0px;
  width: 100%;
  background: transparent;
  pointer-events: ${(props) => (props.isAdvised ? "unset" : "none")};
  text-align: ${(props) => (props.align ? props.align : "unset")};
`;
export const PopoverCash = styled.div`
  .input-discount {
    border: 0px;
    border-bottom: 1px solid grey;
    padding: 0;
    text-align: right;
    width: 100px;
  }

  .button-choose {
    .percent {
      width: 44px;
      height: 22px;
      text-align: center;
      cursor: pointer;
      border-top: 1px solid gray;
      border-left: 1px solid gray;
      border-bottom: 1px solid gray;
    }
    .cash {
      width: 44px;
      height: 22px;
      text-align: center;
      cursor: pointer;
      border-top: 1px solid gray;
      border-right: 1px solid gray;
      border-bottom: 1px solid gray;
    }
    .action {
      background: #0762f7;
      color: white;
    }
  }
  .range-picker {
    border: 0px;
    border-bottom: 1px solid grey;
  }
`;

export const ButtonBack = styled(Button)`
  height: 36px;
  color: #172b4d;
  font-style: normal;
  /* font-weight: 600; */
  font-size: 16px;
  background: #ffffff;
  mix-blend-mode: normal;
  border: ${(props) =>
    props.borderButtonBack ? props.borderButtonBack : "1px solid #0762f7"};
  /* box-shadow: 0px 3px 0px #03317c; */
  border-radius: 8px;
  height: auto;
  &:hover,
  &:active,
  &:focus {
    background: #ffffff;
    color: #172b4d;
  }
  .btn-checkout {
    &__text {
      vertical-align: text-bottom;
    }
    &__icon {
      margin-left: 5px;
    }
  }
`;

export const PopoverCustom = styled(Popover)`
  .ant-popover-inner-content {
    width: 484px;
  }
`;
export const RangePickerCustom = styled.div`
  background: white;
  .ant-picker {
    border: 0px;
    padding: 0px;
    .ant-picker-input {
      border: 1px solid #d9d9d9;
      .icon-suffix {
        width: 30px;
        height: 20px;
        background-image: url(${bgPageBottom});
        background-repeat: no-repeat;
      }
    }
  }
  .title-1 {
    padding: 0px 10px;
  }
  .ant-picker-active-bar {
    opacity: 0 !important;
  }
`;

export const ButtonNext = styled(Button).attrs((props) => ({
  disabled: props.disabled ? true : false,
}))`
  height: 36px;
  background: #0762f7;
  mix-blend-mode: normal;
  /* font-weight: 600; */
  font-size: 16px;
  /* box-shadow: 0px 3px 0px #03317c; */
  border-radius: 8px;
  border: 0;
  color: #ffffff;
  &:hover,
  &:active,
  &:focus {
    background: #2679ff;
    color: #ffffff;
  }
  .btn-checkout {
    &__text {
      vertical-align: text-bottom;
    }
    &__icon {
      margin-left: 5px;
    }
  }
`;
