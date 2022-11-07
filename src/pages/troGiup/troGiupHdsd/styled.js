import styled from "styled-components";
export const Main = styled.div`
  background: #f4f5f7;
  min-height: 100vh;
  height: 100vh;
  .ant-row {
    width: 100%;
  }
  .title-header {
    font-size: 18px;
    color: #172b4d;
    font-weight: 700;
    padding-left: 10px;
    margin-top: -20px;
    margin-bottom: 10px;
  }
  .left {
    > div {
      margin-right: 15px !important;
    }
  }
  .right {
    > div {
      margin-left: 15px !important;
    }
  }
`;

export const RightStyled = styled.div`
  background-color: white;
  height: 100%;
  padding: 20px;
  border-radius: 15px;
  .title {
    font-size: 16px;
    color: #172b4d;
    font-weight: bold;
  }
  .content {
    .item {
      display: flex;
      color: #0762f7;
      align-items: center;
      margin-top: 17px;
      cursor: pointer;
      span {
        margin-left: 5px;
      }
    }
  }
`;

export const LeftStyled = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 15px;
  margin-right: 10px;
  .input-search {
    width: 50%;
    display: flex;
    align-items: center;
    border: 1px solid #cdd1d9;
    border-radius: 4px;
    padding: 2px 5px;
    margin-bottom: 10px;
    margin-left: 10px;
    :focus-within,
    :hover {
      box-shadow: 0 0 0 3px #0062ff47 !important;
    }
    input::placeholder {
      font-size: 14px;
      color: #7a869a;
    }
    input {
      border: none !important;
    }
    input:hover,
    input:focus {
      box-shadow: none !important;
    }
  }
  .title {
    font-size: 16px;
    color: #172b4d;
    font-weight: bold;
  }
  .list-item {
    height: calc(100vh - 240px);
    overflow-y: auto;
    .ant-col {
      padding: 8px;
    }
  }
`;
