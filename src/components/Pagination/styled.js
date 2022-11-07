import styled from "styled-components";
import { Pagination } from "antd";
export const Main = styled(Pagination)`
  text-align: center;
  > li {
    margin: 0;
  }
  .ant-pagination-item-active {
    background: #253858;
    border-radius: 3px;
    border: none;
    a {
      color: #f4f5f7 !important;
    }
  }
  .ant-pagination-item {
    border: none;
    min-height: 31px;
    min-width: 32px;
    line-height: 31px;
    a {
      display: inline-block;
      font-size: 14px;
      line-height: 20px;
      color: #172b4d;
    }
  }
  .ant-pagination-item-link {
    border: none;
  }
  .ant-pagination-options {
    display: none !important;
  }
`;
export const MainPagination = styled.div`
  .popover-version2 {
    .ant-popover-inner-content {
      padding: 0px !important;
      > span {
        padding-left: 32px;
        height: 32px;
        display: flex !important;
        align-items: center;
      }
    }
  }
  margin: 1em;
  position: relative;
  display: flex;
  justify-content: space-between !important;
  &.style-version1 {
    justify-content: space-between;
  }
  @media screen and (max-width: 1500px) {
    justify-content: end;
  }
  .select-size {
    font-size: 14px;
    line-height: 20px;
    color: #7a869a;
    height: 100%;
    &.flex {
      display: flex;
      align-items: center;
    }
    .ant-select {
      border-radius: 3px;
      margin: 0 4px;
      .ant-select-selector {
        background: #fafbfc;
        border: 2px solid #e0e0e0;
      }
      .ant-select-selection-item {
        font-weight: bold;
        font-size: 15px;
        line-height: 28px;
        color: #172b4d;
      }
    }
  }
  .pagination-current {
    display: flex;
    align-items: center;
    .current-page {
      border: none;
      height: 31px;
      width: 10px;
      font-size: 12px;
      border: none;
      background: #0000;
      padding: 0;
      svg {
        &:hover {
          fill: #1890ff !important;
        }
      }
    }
  }
  & svg.ic-setting {
    width: 20px;
    height: 20px;
    margin-left: 5px;
    margin-top: 3px;
  }
`;

export const PopoverVersion2 = styled.div`
  .popover-version2 {
    .ant-popover-inner-content {
      padding: 0px !important;
    }
  }
`;
