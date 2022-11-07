import styled from "styled-components";
export const Main = styled.div`
  margin-top: 20px;
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 0px 0px 15px rgba(9, 30, 66, 0.07);
  max-height: calc(100vh - 440px);
  min-height: calc(100vh - 440px);
  overflow-y: scroll;

  & .thead {
    display: flex;
    min-width: 1650px;
    div {
      padding: 7px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #03317c;
      font-weight: 700;
      font-size: 13px;
      border: 1px solid #d3d7de;
      border-top: none;
    }
  }
  & .tbody {
    .title-dich-vu {
      font-size: 17px;
      color: #172b4d;
    }
    div {
      div {
        border: 1px solid #d3d7de;
        padding: 7px;
        color: #172b4d;
      }
    }
  }
  .notborderL {
    border-left: none;
  }
  .notborderR {
    border-right: none;
  }
  .center {
    text-align: center;
  }
  .left {
    text-align: left;
  }
  .right {
    text-align: right;
  }
  .bgTitle {
    background: #c1f0db;
  }
  .bold {
    font-weight: 700;
  }
  .triangle-up {
    width: 0;
    height: 0;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-bottom: 10px solid #172b4d;
  }
  .triangle-down {
    width: 0;
    height: 0;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-top: 10px solid #172b4d;
  }
  .w80 {
    min-width: 80px;
    max-width: 80px;
  }
  .w60 {
    min-width: 60px;
    max-width: 60px;
  }
  .w120 {
    min-width: 120px;
    max-width: 120px;
  }
  .w150 {
    min-width: 150px;
    max-width: 150px;
  }
  .w250 {
    min-width: 250px;
    max-width: 250px;
  }
  .w370 {
    min-width: 370px;
    max-width: 370px;
  }
`;
