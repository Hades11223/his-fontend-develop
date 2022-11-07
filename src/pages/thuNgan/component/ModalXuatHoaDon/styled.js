import styled from "styled-components";
import { Modal } from "antd";
export const Main = styled(Modal)`
  & .ant-modal-header {
    border-radius: 8px 8px 0 0 !important;
    padding: 8px 24px !important;
    background: #e8eaed;
    & .ant-modal-title {
      color: #172b4d;
    }
    border-bottom: 1px solid #0762f7;
  }
  & .ant-modal-content {
    border-radius: 8px !important;
    .ant-modal-close-x {
      display: flex !important;
      justify-content: center;
      align-items: center;
      height: 40px;
      svg {
        fill: #0762f7;
      }
    }
  }
  & .row {
    border: 2px solid #054ab9;
    border-radius: 8px;
    padding: 10px;
    display: flex;
    :hover {
      cursor: pointer;
    }
  }
  & .row-center {
    margin: 10px 0px;
  }
  & .col-1 {
    min-width: 70px;
    width: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      width: 35px;
      height: 35px;
      path {
        fill: #054ab9;
      }
    }
  }
  & .col-2 {
    & .title {
      color: #172b4d;
      font-weight: 800;
      line-height: 19px;
      font-size: 14px;
    }
    & .content {
      color: #172b4d;
      line-height: 19px;
      font-size: 14px;
    }
  }
`;
