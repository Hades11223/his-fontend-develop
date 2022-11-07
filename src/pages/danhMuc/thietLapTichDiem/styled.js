import styled from "styled-components";

export const Main = styled.div`
  flex: 1;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .ant-col {
    border-radius: 20px;
  }

  .main {
    width: 100%;
    padding: 20px 50px;

    .text {
      color: #172b4d;
      font-size: 1rem;
      margin-bottom: 10px;
      min-width: 180px;
    }
    .text-bold {
      font-size: 1.1rem;
      font-weight: 600;
    }
    .line {
      width: 80%;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      margin-bottom: 20px;
      align-items: baseline;
      &:last-of-type {
        margin-bottom: 0;
      }
      &:only-child {
        width: 20%;
      }
    }
    .ml-3 {
      margin-left: 30px;
    }
    .mr-1 {
      margin-right: 10px;
    }
    .mr-3 {
      margin-right: 30px;
    }
    .mw-50 {
      min-width: 50px;
    }
  }
  .body {
    font-family: "Nunito Sans" !important;
    position: relative;
    margin: auto;
  }
  .item-input-numer {
    width: 20%;
    input {
      border-radius: 30px;
    }
  }
`;

export const WrapButtonRight = styled.div`
  display: flex;
  justify-content: flex-end;
`;