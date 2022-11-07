import styled from "styled-components";
export const Main = styled.div`
  width: 100%;
  border-radius: 5px;
  height: 100%;

  .title {
    height: 44px;
    padding: 10px;
    font-size: 16px;
    font-weight: bold;
    span {
      font-weight: normal;
      color: #7a869a;
    }
  }
  .history {
    overflow-y: scroll;
    height: calc(100% - 44px);
    .li-head {
      font-weight: bold;
    }
    .li-content {
      max-height: 62px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    li {
      padding: 12px;
      cursor: pointer;
    }
  
    li:hover,
    .active {
      background-color: #c1f0db !important;
    }
  }
`;
