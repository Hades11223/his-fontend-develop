import styled from "styled-components";
import { Modal as MD, Collapse } from "antd";

export const Main = styled.div`
  h1 {
    padding-top: 5px;
  }
  .selection {
    z-index: 3;
    padding: 0px 18px 7px;
    display: flex;
    .ant-select {
      min-width: 275px;
    }
    .input-box {
      position: relative;
      width: 275px;
      > img {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 0;
        z-index: 1;
        padding: 0 8px;
        width: 30px;
      }
      input {
        padding-left: 25px;
      }
    }
  }
  height: 100%;
  .collapse-content {
    height: calc(100% - 71px);
    .site-collapse-custom-collapse {
      height: 100%;
      overflow-y: scroll;
    }
  }
`;
export const HeaderWrapper = styled.div`
  font-weight: bold;
  font-size: 24px;
  line-height: 33px;
  display: flex;
  justify-content: flex-start;
  color: #172b4d;
  > img:first-child {
    padding: 0 13px 0 8px;
  }
  img {
    object-fit: contain;
  }
`;
export const MainTable = styled.div`
 
  .action-btn {
    display: flex;
    justify-content: center;
    img {
      margin-left: 10px;
    }
  }
`;

export const Modal = styled(MD)`
  .ant-modal-content {
    height: 100%;
    @media screen and (max-width: 1366px) {
      margin-top: -95px;
    }
    .ant-modal-body {
      padding: 10px;
    }
    overflow: hidden;
  }
  .ant-modal-header {
    padding: 10px;
  }
  .title-header {
    display: flex;
    justify-content: center;
    font-size: 18px;
    font-weight: 700;
  }
`;

export const CollapseWrapper = styled(Collapse)`
  background-color: #fff !important;
  .ant-collapse-item {
    border-bottom: none !important;
    .ant-collapse-header {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .ant-collapse-arrow {
        position: initial !important;
        margin: 0 15px 0 0 !important;
        padding: 0 !important;
      }
    }
  }
`;
