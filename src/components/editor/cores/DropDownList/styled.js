import styled from "styled-components";

const Main = styled("div")`
  background-color: ${(props) => (props.focusing ? "#E6F7FF" : "")};
  font-size: ${(props) => props.fontSize || 12}pt;
  min-height: ${(props) => props.minHeight * (props.minRow || 1)}px;
  display: flex;
  ${(props) =>
    props.showMarkSpanRow &&
    (props.mode == "config" || !props.disabled) &&
    `line-height: ${props.lineHeight}px;
    background:
   url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 6 6"><circle cx="3" cy="3" r="0.4" fill="black" /></svg>') 
   ${props.lineHeight}px;
     background-position-y: 7px;
     -webkit-background-size: 5px ${props.lineHeight}px;
    -moz-background-size: 5px ${props.lineHeight}px;
    -ms-background-size: 5px ${props.lineHeight}px;
    -o-background-size: 5px ${props.lineHeight}px;
    background-size: 5px ${props.lineHeight}px;

    `}
  & .ant-select {
    font-size: ${(props) => props.fontSize || 12}pt;
    font-family: initial;
    display: block;
    background-color: transparent;
    flex: 1;
    & .ant-select-selection {
      background-color: transparent;
      min-height: ${(props) => props.minHeight}px;
      border: none;
      &__rendered {
        margin-left: 0px !important;
        margin-right: 0px !important;
        line-height: ${(props) => props.lineHeight}px;
        min-height: ${(props) => props.minHeight}px;
        & .ant-select-selection-selected-value {
          text-align: ${(props) => props.contentAlign};
          float: unset !important;
        }
        & ul {
          display: flex;
          flex-wrap: wrap;
          justify-content: ${(props) =>
            props.contentAlign == "left"
              ? "flex-start"
              : props.contentAlign == "center"
              ? "center"
              : "flex-end"};
          li {
            height: auto;
            line-height: unset;
            margin-top: auto;
          }
        }
        &:after {
          display: none;
        }
        & .ant-select-search.ant-select-search--inline {
          margin-top: 0;
        }
      }
      &__choice {
        border: none;
        float: none;
        padding: 0;
        margin: 0;
        position: static;
        display: flex;
        align-items: center;
        color: ${(props) => props.itemProps?.contentColor || "black"};
        &:after {
          content: ", ";
          margin-right: 2px;
        }
        &:nth-last-child(2) {
          &:after {
            display: none;
          }
        }

        background-color: transparent;
        &:hover {
          & .ant-select-selection__choice__remove {
            display: ${(props) => (props.readOnly ? "none" : "block")};
          }
        }
        &__remove {
          position: static;
          display: none;
          & .anticon {
            vertical-align: unset;
          }
        }
      }
      &-selected-value {
        color: ${(props) => props.itemProps?.contentColor || "black"};
      }
      &--multiple {
        min-height: ${(props) => props.minHeight}px;
      }
      &--single {
        height: auto;
        & .ant-select-arrow {
          display: none;
        }
      }
    }
  }
  & .text-select {
    font-size: ${(props) => props.fontSize || 12}pt;
    font-family: initial;
    text-align: ${(props) => props.contentAlign};
    text-decoration: ${(props) => props.textDecoration || "none"};
    font-weight: ${(props) => props.fontWeight || "none"};
    font-style: ${(props) => props.fontStyle || "none"};
  }
  & > span {
    background-color: #fff;
  }

  & .icon-clear {
    display: none;
    svg {
      fill: #080808;
      margin-top: 5px;
      padding-bottom: 5px;
    }
  }
  @media only screen and (min-width: 100px) {
    & .icon-clear {
      display: inline-block;
      & svg {
        width: 8px;
        fill: #a0a0a0 !important;
      }
    }
  }
`;

export { Main };
