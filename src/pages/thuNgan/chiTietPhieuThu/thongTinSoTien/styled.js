import styled from "styled-components";

export const Main = styled.div`
  background: #e6effe;
  border-radius: 16px;
  padding: 16px;
  font-family: Nunito Sans, sans-serif;
  width: 100%;
  .title-header {
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    font-size: 14px;
    line-height: 25px;
    text-transform: uppercase;
    color: #172b4d;
    .ic-history {
      width: 20px;
      height: 20px;
      path {
        fill: #0762f7;
      }
    }
    &-text {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .info {
    padding-top: 3px;
    &-left {
      font-size: 14px;
      /* line-height: 25px; */
      color: #172b4d;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    &-right {
      font-weight: bold;
      font-size: 14px;
      line-height: 25px;
      color: #b3304c;
    }
  }
`;
