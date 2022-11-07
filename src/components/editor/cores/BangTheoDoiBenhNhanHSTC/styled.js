import styled from "styled-components";

const Main = styled("div")`
  position: relative;

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
      display: block;
    }
    & .table-bar {
      display: block;
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
  }
`;

export { Main };
