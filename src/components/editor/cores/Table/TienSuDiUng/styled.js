import styled from "styled-components";

export const MainTable = styled("table")`
  & tr {
    & td {
      vertical-align: middle;
    }
  }
  & .button-add-row,
  & .button-remove-row {
    margin-right: 10px;
    // display: none;
    height: 0;
    opacity: 0;
  }

  &:hover {
    & .button-add-row,
    & .button-remove-row {
      // display: block;
      height: 24px;
      transition: height 0.5s, opacity 0.5s;
      opacity: 1;
    }
  }

  @media print {
    & .button-add-row,
    & .button-remove-row {
      // display: none;
      height: 0;
      opacity: 0;
    }

    & table {
      & .mark-span {
        display: none;
      }
    }
  }
  & .col-ten-thuoc-di-nguyen {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    & div {
      &:first-child {
        width: 100%;
      }
    }
  }

  & .dong-col-1 {
    padding: 2px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
`;
