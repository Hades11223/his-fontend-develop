import styled from "styled-components";

const Main = styled("div")`
  margin-top: ${(props) =>
    props.itemProps?.marginTop ? props.itemProps?.marginTop + "px" : 0};
  margin-bottom: ${(props) =>
    props.itemProps?.marginBottom ? props.itemProps?.marginBottom + "px" : 0};
  margin-right: ${(props) =>
    props.itemProps?.marginRight ? props.itemProps?.marginRight + "px" : 0};
  margin-left: ${(props) =>
    props.itemProps?.marginLeft ? props.itemProps?.marginLeft + "px" : 0};

  position: relative;

  & .td-contain {
    position: relative;
    height: 100%;
  }

  & .in-side-col {
    height: 100%;
    min-height: ${(props) => props.colMinHeight || 24}px;
    line-height: ${(props) => props.lineHeightText || 1.5};

    & .resize-col {
      height: 100%;
      background-color: ${({ theme }) => theme.primary};
      width: 3px;
      position: absolute;
      right: -3px;
      z-index: 1;
      display: none;
      cursor: col-resize;
    }
  }

  & .in-side-col:hover {
    & .resize-col {
      display: block;
    }
  }

  & .table-bar {
    background-color: ${({ theme }) => theme.primary};
    z-index: 1;
    height: 4px;
    position: absolute;
    top: -4px;
    left: 0px;
    right: 0px;
    display: none;
  }

  & .table-config {
    position: absolute;
    z-index: 2;
    top: -24px;
    left: 0px;
    right: 0px;
    display: none;
  }

  &:hover {
    & .table-config {
      display: inline-table;
    }
    & .table-bar {
      display: inline-table;
    }
  }

  & table {
    border: solid 1px;

    & .col-selected {
      background-color: #e6f7ff;
    }

    & td {
      vertical-align: top;
      border-right: 1px solid #000;
      position: relative;
      padding: ${(props) => (props.mode === "config" ? "0" : "")};

      &:first-child {
        border-left: 1px solid #000;
      }
    }

    & tr {
      border-top: 1px solid #000;
      &:first-child {
        border-top: 0;
      }
    }

    & p {
      margin-bottom: 0;
    }
  }
`;

export { Main };
