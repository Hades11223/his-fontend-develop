import styled from "styled-components";
const getBorder = (config = {}, border) => {
  let { size, type, color } = config;
  if (!size) {
    return "none";
  } else {
    if (type === undefined) type = "solid";
    if (color === undefined) color = "black";
    return size + "px " + type + " " + color;
  }
};

const Main = styled("div")`
  line-height: ${({ lineHeightText }) => lineHeightText};
  font-size: ${({ fontSize }) => fontSize}pt;
  background-color: #fff;
  position: relative;
  margin-top: ${(props) =>
    props.itemProps?.marginTop ? props.itemProps?.marginTop + "px" : 0};
  margin-bottom: ${(props) =>
    props.itemProps?.marginBottom ? props.itemProps?.marginBottom + "px" : 0};
  margin-right: ${(props) =>
    props.itemProps?.marginRight ? props.itemProps?.marginRight + "px" : 0};
  margin-left: ${(props) =>
    props.itemProps?.marginLeft ? props.itemProps?.marginLeft + "px" : 0};
  padding-top: ${(props) =>
    props.itemProps?.paddingTop ? props.itemProps?.paddingTop + "px" : 0};
  padding-bottom: ${(props) =>
    props.itemProps?.paddingBottom ? props.itemProps?.paddingBottom + "px" : 0};
  padding-right: ${(props) =>
    props.itemProps?.paddingRight ? props.itemProps?.paddingRight + "px" : 0};
  padding-left: ${(props) =>
    props.itemProps?.paddingLeft ? props.itemProps?.paddingLeft + "px" : 0};

  border-top: ${(props) =>
    props.itemProps?.border
      ? "1px solid black"
      : getBorder(props.itemProps?.borderTop, props.itemProps)};
  border-bottom: ${(props) =>
    props.itemProps?.border
      ? "1px solid black"
      : getBorder(props.itemProps?.borderBottom, props.itemProps)};
  border-right: ${(props) =>
    props.itemProps?.border
      ? "1px solid black"
      : getBorder(props.itemProps?.borderRight, props.itemProps)};
  border-left: ${(props) =>
    props.itemProps?.border
      ? "1px solid black"
      : getBorder(props.itemProps?.borderLeft, props.itemProps)};

  min-height: ${(props) =>
    Math.max(
      props.itemProps?.layoutMinHeight || 0,
      props.minHeight
    )}px !important;
  &.active {
    -webkit-box-shadow: 0px 0px 5px 1px rgba(35, 194, 194, 0.94);
    -moz-box-shadow: 0px 0px 5px 1px rgba(35, 194, 194, 0.94);
    box-shadow: 0px 0px 5px 1px rgba(35, 194, 194, 0.94);
  }
  &:hover {
    & .action-line {
      height: 24px;
      opacity: 1;
      visibility: visible;
      transition: all 0.5s;
    }
  }
  & .mark-focus {
    position: absolute;
    width: 100%;
    height: 5px;
    top: -5px;
    left: 0;
    right: 0;
    background-color: #1890ff;
    display: none;
    cursor: pointer;
  }
  & > div {
    & > .btn-setting {
      display: none;
    }
  }
  &:hover {
    & > div {
      & > .btn-setting {
        display: block;
      }
    }
    & > div > .mark-focus {
      display: ${(props) => (props.mode === "config" ? "block" : "none")};
    }
  }
`;

export { Main };
