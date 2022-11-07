import styled from "styled-components";
export const Main = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 10px 20px 5px 20px;
  .head {
    display: flex;
    justify-content: space-between;
    position: absolute;
    width: 100%;
    top: -25px;
    left: 5px;
    color: #054ab9;
    .d-flex {
      display: flex;
      align-items: center;
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
    height: 274px;
    overflow-y: auto;
    div {
      margin-bottom: 10px;
    }
  }
`;
