import styled from "styled-components";

const Main = styled("div")`
  & hr {
    margin: 0px;
    border-top: ${(props) =>
      (props.itemProps.weight || 1) +
      "px " +
      (props.itemProps.type || "solid")};
    border-top-color: ${(props) => props.itemProps.color || "#000"};
    margin-top: ${(props) => (props.itemProps.marginTop || 0) + "px"};
    margin-bottom: ${(props) => (props.itemProps.marginBottom || 0) + "px"};
    margin-left: ${(props) => (props.itemProps.marginLeft || 0) + "px"};
    margin-right: ${(props) => (props.itemProps.marginRight || 0) + "px"};
  }
  @media print {
    & .ant-btn {
      display: none;
    }
  }
  &.active {
    -webkit-box-shadow: 0px 0px 5px 1px rgba(35, 194, 194, 0.94);
    -moz-box-shadow: 0px 0px 5px 1px rgba(35, 194, 194, 0.94);
    box-shadow: 0px 0px 5px 1px rgba(35, 194, 194, 0.94);
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
    & .mark-focus {
      display: ${(props) => (props.mode === "config" ? "block" : "none")};
    }
  }
`;

export { Main };
