import styled from "styled-components";
export const Main = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 5px 20px;
  .title {
    padding-bottom: 15px;
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
    height: 265px;
    overflow-y: auto;
    padding-top: 5px;
    .line {
      margin-bottom: 3px;
      display: flex;
      align-items: center;
      span{
        font-weight: bold;
      }
      input,.ant-select-selector {
        width: 200px;
        border: none;
        margin-left: 20px;
        border-radius: 0;
        border-bottom: 1px dashed #222;
      }
    }
  }
`;
