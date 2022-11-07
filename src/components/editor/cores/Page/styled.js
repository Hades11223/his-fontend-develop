import styled from "styled-components";
import { getLayout } from "utils/editor-utils";
const Main = styled("div")`
  line-height: ${({ lineHeightText }) => lineHeightText};
  font-size: ${({ fontSize }) => fontSize}pt;
  width: ${({ layoutType }) => getLayout(layoutType).width}px;
  min-height: ${({ layoutType }) => getLayout(layoutType).height}px;
  background-color: #fff;
  border: ${(props) => (props.mode === "config" ? "1px dashed blue" : "")};
  padding-top: ${(props) =>
    props.itemProps?.paddingTop ? props.itemProps?.paddingTop + "px" : 0};
  padding-bottom: ${(props) =>
    props.itemProps?.paddingBottom ? props.itemProps?.paddingBottom + "px" : 0};
  padding-right: ${(props) =>
    props.itemProps?.paddingRight ? props.itemProps?.paddingRight + "px" : 0};
  padding-left: ${(props) =>
    props.itemProps?.paddingLeft ? props.itemProps?.paddingLeft + "px" : 0};
  margin-bottom: ${(props) => (props.mode === "config" ? "12px" : "")};
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
