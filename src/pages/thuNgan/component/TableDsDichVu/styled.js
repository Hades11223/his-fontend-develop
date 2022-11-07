import styled from "styled-components";
export const Main = styled("div")`
  background: #fff;
  min-height: calc(100vh - 240px);
  max-height: calc(100vh - 240px);
  border-radius: 8px;
  box-shadow: 0px 0px 15px rgba(9, 30, 66, 0.07);
  color: #172b4d;
  .title {
    color: #172b4d;
    font-weight: bold;
    font-size: 18px;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    .anticon {
      margin-left: 10px;
      :hover {
        cursor: pointer;
      }
    }
  }

  .table {
    min-height: calc(100vh - 340px);
    max-height: calc(100vh - 340px);
    overflow-y: scroll;

    table {
      position: relative;
      width: 100%;
      border-bottom: 2px solid #c5cad3;
      tbody {
        max-height: calc(100vh - 310px);
      }
      th,
      td {
        border-left: 1px solid #c5cad3;
      }
      th,
      tr {
        border-top: 2px solid #c5cad3;
      }
      th {
        color: #03317c;
        padding: 5px;
        position: sticky;
        top: 0px;
        background: #fff;
      }
      thead {
        tr {
          th {
            border-top: 2px solid #c5cad3;
          }
        }
      }
      td {
        padding: 10px;
      }
      .odd {
        background: #e6effe;
      }
      .icon-delete {
        svg {
          width: 20px;
          height: 20px;
          path {
            fill: #054ab9;
          }
        }
      }
    }
    .left {
      text-align: left;
    }
    .right {
      text-align: right;
    }
    .center {
      text-align: center;
    }
    .noBg {
      background: #fff !important;
    }
  }
`;
