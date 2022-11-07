import styled from "styled-components";
import { Row } from "antd";
export const Main = styled(Row)`
  width: 100%;
  .ant-row {
    width: 100%;
  }
  .info {
    padding: 15px;
  }

  .content-tab {
    .item-sub {
      margin-bottom: 10px;
    }
    .content-tab_1 {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
    }
  }
  .item {
    padding: 10px;
    margin-bottom: 5px;
    background: linear-gradient(
        0deg,
        rgba(23, 43, 77, 0.05),
        rgba(23, 43, 77, 0.05)
      ),
      #ffffff;
    border-radius: 4px 0px 0px 4px;
    cursor: pointer;
    &.actived {
      background: linear-gradient(0deg, #c0f0db, #c0f0db), #05c270;
    }
    & .item-content {
      display: flex;
      width: 100%;
      .left {
        display: flex;
        flex-direction: column;
        font-weight: bold;
      }
      .right {
        margin-left: auto;
        display: flex;
        align-items: baseline;
        img {
          object-fit: contain;
          margin-right: 10px;
        }
      }
    }
  }
  .date {
    display: flex;
    .title {
      display: flex;
      flex: 1 0 auto;
    }
  }
  .content-item {
    height: calc(100vh - 400px);
    overflow-y: auto;
  }
  .right-body {
    height: 100%;
  }
  & .header {
    height: 38px;
    margin-bottom: 0;
    align-items: center;
    display: flex;
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
    justify-content: space-between;
  }
`;
export const SelectGroup = styled.div`
  line-height: 25px;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 6 6"><circle cx="3" cy="3" r="0.4" fill="black" /></svg>')
    20px;
  background-position-y: 12px;
  background-size: 5px 28px;
  margin-top: 10px;
  display: flex;
  > span {
    display: inline-block;
    padding-right: 5px;
    background: #ffffff;
    vertical-align: sub;
    flex: 1 0 auto;
    /* height: ${(props) =>
      props.dataHeight ? props.dataHeight + "px" : "auto"}; */
  }
  .select-box {
    display: inline-block;
    .ant-select-selector {
      margin-top: -13px;
      background: none;
      border: 0;
    }
  }
  .red-text {
    color: #ef4066;
  }
  .select-box-chan-doan {
    display: inline-block;
    width: 100%;
    &
      .ant-select
      .ant-select-multiple
      .ant-select-allow-clear
      .ant-select-show-search {
      width: auto;
    }
    & .ant-select {
      width: 100%;
      &.ant-select-show-search {
        width: auto;
      }
    }
    & .ant-select-selector {
      background: none;
      border: 0;
      & .ant-select-selection-overflow {
        width: 380px;
      }
    }
  }
`;

export const MainToDieuTri = styled(Row)`
  margin: 0 !important;
  & .mr8 {
    padding-right: 8px;
  }
  & .ml8 {
    padding-left: 8px;
  }
  .date {
    display: flex;
    align-items: center;
    .title {
      display: flex;
      flex: 1 0 auto;
    }
  }
`;
