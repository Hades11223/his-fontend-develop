import styled from "styled-components";
export const Main = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 5px 20px;
  position: relative;
  .title {
    padding-bottom: 15px;
    .action {
      position: absolute;
      top: 10px;
      right: 15px;
      display: flex;
      align-items: center;
      color: #0762F7;
      >span {
        font-size: 14px;
      }
      .icon {
        margin-left: 5px;
        svg {
          width: 25px;
          height: 25px;
          path {
            fill: #0762F7;
          }
        }
      }
    }
  }
  .search-select {
    background: #ffffff;
    border: 2px solid #dfe1e6;
    box-sizing: border-box;
    border-radius: 5px;
    display: flex;
    align-items: center;
    margin-left: 5px;
    height: 32px;
    img {
      padding-left: 7px;
    }
    .ant-select-open {
      border: none;
    }
    .ant-select {
      width: 100%;
    }
    .ant-select-selector {
      height: 28px;
      border: none;
      box-shadow: none !important;
      .ant-select-selection-item {
        font-weight: 600;
        line-height: 10px;
        color: #172b4d;
      }
      &:focus {
        border: none;
        box-shadow: none;
      }
      &::placeholder {
        color: #7a869a;
      }
    }
  }
  .content {
    /* height: 265px; */
    overflow-y: auto;
    padding-top: 5px;
    .line {
      width: 100%;
      margin-bottom: 3px;
      display: flex;
      color: #172B4D;
      align-items: flex-end;
      margin-bottom: 5px;
      >div {
        width: 70%;
      }
      span{
        font-weight: bold;
        margin-right: 10px;
        /* min-width: 12%; */
      }
      input,.ant-select-selector, .ant-input {
        /* width: 200px; */
        padding: 0;
        border: none;
        width: 100%;
        /* margin-left: 20px; */
        border-radius: 0;
        border-bottom: 1px dashed #222;
        &:hover, &:active , &:focus{
          box-shadow: none;
        }
      }
      ul {
        li {
          list-style-type: circle;
          margin-left: 30px;
        }
      }
    }
    .flex-start {
      align-items: flex-start;
    }
    .direction-col {
      flex-direction: column;
    }
  }
  .pointer {
    cursor: pointer;
  }
`;
