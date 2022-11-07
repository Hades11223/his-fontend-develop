import styled, { createGlobalStyle } from "styled-components";
export const GlobalStyle = createGlobalStyle`
.bang-ke-chi-phi{
 position: relative;
  & .table-config {
    position: absolute;
    z-index: 2;
    top: -24px;
    left: 0px;
    right: 0px;
    display: none;
  }
  .col-2,
  .col-3,
  .col-14 {
    text-align: center;
  }
  .col-4,
  .col-5,
  .col-6,
  .col-7,
  .col-8,
  .col-9,
  .col-10,
  .col-11,
  .col-12,
  .col-13 {
    text-align: right;
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
    margin-bottom: 10px;
    td,
    td {
      font-size: 13px;
    }
    thead {
      tr {
        td {
          font-weight: bold;
        }
      }
    }
    border: solid 1px;

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
      /* &:first-child {
        border-top: 0;
      } */
    }
  }
  & .center {
    text-align: center;
  }
  & .bold {
    font-weight: bold;
  }

  & .red {
    color: red;
  }

  & .vertical {
    text-align: center;
  }
  & .no-border-left {
    border-left: none !important;
  }
  & .no-border-right {
    border-right: none !important;
  }
  & .left-column-row-height {
    height: 14px;
  }
  & .flex {
    display: flex;
  }
  & .f1 {
    flex: 1;
  }
  & .jcenter {
    justify-content: center;
  }
  & .jSpaceBetween {
    justify-content: space-between;
  }
  & .acenter {
    align-items: center;
  }
  & .vamid {
    vertical-align: middle;
  }

  & .lh15 {
    line-height: 15px;
  }

  & .w75 {
    width: 75px;
  }
  & .pa {
    position: absolute;
  }
  & .pr {
    position: relative;
  }
  & .table-left-vital-signs {
    position: absolute;
    top: -1px;
    left: -1px;
    right: -1px;
    width: calc(100% + 2px);
  }
  & .ml5 {
    margin-left: 5px;
  }
  & .muc-huong {
    .box {
      margin-left: 10px;
      border: solid 1px #000;
      display: inline-block;
      text-align: center;
      line-height: 1;
      padding: 3px;
      min-width: 50px;
      height: 20px;
      border-right: 0px;
      &:last-child {
        border-right: solid 1px #000;
      }
    }
  }
}
`;
export const Main = styled.div``;
