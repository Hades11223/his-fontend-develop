import styled from "styled-components";
import { Collapse } from "antd";

export const Main = styled.div`
  h1 {
    padding-top: 5px;
    text-transform: uppercase;
  }
  .selection {
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
`;

export const HeaderWrapper = styled.div`
  font-weight: bold;
  font-size: 24px;
  line-height: 33px;
  display: flex;
  align-items: center;
  color: #172b4d;
  > img:first-child {
    padding: 0 13px 0 8px;
  }
  img {
    /* object-fit: contain; */
  }
  > img:last-child {
    margin-left: 13px;
    height: 19px;
    width: 17px;
    margin-bottom: -2px;
  }
`;
export const MainTable = styled.div`
  table {
    width: fit-content !important;
    table-layout: unset !important;
  }
  .action-btn {
    display: flex;
    justify-content: center;
    img {
      margin-left: 10px;
    }
  }
`;

export const CollapseWrapper = styled(Collapse)`
  background-color: #fff !important;
  .ant-collapse-item {
    border-bottom: none !important;
    .ant-collapse-header {
      display: flex;
      /* justify-content: center; */
      align-items: center;
      .ant-collapse-arrow {
        position: initial !important;
        margin: 0 15px 0 0 !important;
        padding: 0 !important;
      }
    }
  }
`;
