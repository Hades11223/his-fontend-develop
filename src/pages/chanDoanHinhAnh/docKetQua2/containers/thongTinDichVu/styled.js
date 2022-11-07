import styled from "styled-components";
export const Main = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 10px 20px 5px 20px;
  .head {
    display: flex;
    justify-content: flex-end;
    position: absolute;
    width: 100%;
    top: -25px;
    right: 5px;
    color: #054ab9;
    .d-flex {
      display: flex;
      align-items: center;
    }
    .ml-1 {
      margin-left: 1em;
    }
    .green {
      color: #049254;
    }
    .bg-green {
      path {
        fill: #049254;
      }
    }
    .pointer {
      cursor: pointer;
    }
    svg {
      width: 16px;
      height: 16px;
      margin-left: 5px;
      path {
        fill: #054ab9;
      }
    }
  }
  .title {
    display: flex;
    justify-content: space-between;
    h3 {
      padding-left: 10px;
      font-weight: bold;
      font-size: 18px;
    }
  }
  .content {
    height: 116vh;
    overflow-y: auto;
    div {
      margin-bottom: 10px;
    }
    & .actions {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      justify-content: space-between;
      padding: 0 20px;
      margin-top: 10px;
      & .d-flex {
        justify-content: space-between;
        & .icon {
          margin-bottom: 0;
          text-align: center;
          & svg {
            width: 1.5em;
            height: 1.5em;
          }
        }
        & .name {
          color: #0762F7;
          font-size: 14px;
          line-height: 19px;
        }
        & .circle {
          background-color: #0762F7;
          border-radius: 50%;
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: space-around;
        }
      }
       & .pointer {
          cursor: pointer;
        }
    }
  }
  .direction-col {
    flex-direction: column;
  }
  .align-center {
    align-items: center;
  }
`;
