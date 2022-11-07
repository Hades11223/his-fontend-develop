import styled from "styled-components";

const Main = styled("div")`
  /* ${(props) =>
    props.showInput
      ? `
      & .value-display: 
      {
        display: none;
      }`
      : `
    & .date-picker{
      width: 0;
      opacity: 0;
    }

`} */
  font-size: ${(props) => props.fontSize || 12}pt;
  min-height: ${(props) => props.minHeight}px;
  position: relative;
  display: inline-flex;
  align-items: center;
  height: 24px;
  width: 100%;

  & .ant-calendar-picker-input {
    & .ant-input {
      height: 24px;
    }
  }

  & .date-picker {
    width: ${(props) => (props.showInput ? "auto" : 0)};
    opacity: ${(props) => (props.showInput ? 1 : 0)};
    /* opacity: 0;
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    right: 0; */
  }

  & .value-display {
    /* position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    right: 0; */
    /* pointer-events: none; */
    width: 100%;
    display: ${(props) => (props.showInput ? "none" : "block")};
    text-align: ${(props) => props.contentAlign};
    cursor: pointer;
    text-decoration: ${(props) =>
      props.dateTimeFormat == "yyyy" ? props.textDecoration : "none"};
    font-weight: ${(props) =>
      props.dateTimeFormat == "yyyy" ? props.fontWeight : "none"};
    font-style: ${(props) =>
      props.dateTimeFormat == "yyyy" ? props.fontStyle : "none"};
  }
`;

export { Main };
