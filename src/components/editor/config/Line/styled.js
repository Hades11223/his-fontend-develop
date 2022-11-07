import styled from "styled-components";

const Main = styled("div")`
  &.line-style {
    display: flex;
    position: relative;
    min-height: ${(props) => (props.minHeight || 24) + "px"};
    // background-color: #fff;
    border-bottom: ${({ theme, mode }) =>
      mode === "config" ? theme.border : ""};
    border-color: ${({ theme, focusing }) =>
      focusing ? theme.primary : theme.borderColor};
    & > div {
      max-width: 100%;
      & > div {
        max-width: 100%;
      }
    }
    &.active {
      -webkit-box-shadow: 0px 0px 5px 1px rgba(35, 194, 194, 0.94);
      -moz-box-shadow: 0px 0px 5px 1px rgba(35, 194, 194, 0.94);
      box-shadow: 0px 0px 5px 1px rgba(35, 194, 194, 0.94);
    }
    & table {
      color: #000 !important;
    }
  }

  & .line-action {
    position: absolute;
    z-index: 1;
    right: 0;
    bottom: -25px;
    white-space: nowrap;
    max-width: initial !important;
    visibility: hidden;
    opacity: 0;
    transition: visibility 1s, opacity 0.5s;
  }
  &.line-style:hover {
    & > .line-action {
      visibility: visible;
      opacity: 1;
    }
  }
`;

export { Main };
