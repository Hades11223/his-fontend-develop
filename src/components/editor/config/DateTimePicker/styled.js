import styled from "styled-components";
import DatePicker from "react-datepicker";
import { Input, Popover, Button } from "antd";
import { createGlobalStyle } from "styled-components";

export const Main = styled("div")`
  ${(props) => (props.width ? `{width: ${props.width}px}` : "")}
  ${(props) => (props.height ? `{height: ${props.height}px}` : "")}
  & .input-date-time {
    height: 100%;
  }
  & .react-datepicker-popper {
    z-index: 1000;
  }
  & .react-datepicker__input-container {
    & input {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-variant: tabular-nums;
      list-style: none;
      font-feature-settings: "tnum";
      position: relative;
      display: inline-block;
      width: 100%;
      height: 32px;
      padding: 4px 11px;
      color: rgba(0, 0, 0, 0.65);
      font-size: 13px;
      line-height: 1.5;
      background-color: #fff;
      background-image: none;
      border: 1px solid #d9d9d9;
      border-radius: 4px;
      transition: all 0.3s;
      height: 24px;
      padding: 1px 7px;
    }
  }
`;
export const DatePickerMain = styled(DatePicker)`
  & .picker-footer {
    display: inline-block;
    width: 100%;
    border-top: 1px solid #cac;
    padding: 2px;
    text-align: center;
    & .action-bottom {
      width: 100%;
      padding-top: 2px;
      padding-bottom: 2px;
      border-top: 1px solid rgb(170, 204, 170);
      display: inline-block;
      text-align: center;
    }
  }
`;

export const GlobalStyle = createGlobalStyle`
 .datepicker-disabled-date{
  pointer-events: none;
 }
`;
export const PopoverMain = styled(Popover)``;
