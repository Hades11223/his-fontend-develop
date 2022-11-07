import { Collapse, Table } from "antd";
import styled from "styled-components";

export const Main = styled.div`
  .wrapper-select {
    .ant-select {
      width : 160px
    }
  }
  .main__container {
    margin: 0 !important;
    .ant-table-body .ant-table-tbody .ant-table-cell {
      vertical-align: middle !important;
    }
  }
  .action-btn {
    display: flex;
    justify-content: center;
    img {
      margin: 0 8px;
    }
  }
  .select-box {
    display : flex;
    align-items : center;
    .addition-box {
      display: flex;
      align-items: center;
      padding: 0 5px;
      margin: 3px 0;
      min-height: 33px;
      .input-box {
        width: 170px;
        border: 2px solid #dfe1e6;
        border-radius: 17px;
        position: relative;
        height: 34px;
          > img {
            position: absolute;
            top: 29%;
            left: 0;
            z-index: 1;
            padding: 0 8px;
          }
          input {
            border: none;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border-radius: 17px;
            padding-left: 24px;
            font-weight: 600;
            color: #172b4d;
            font-size: 14px;
            &:placeholder-shown {
              font-weight: 600;
              font-size: 14px;
              color: #7a869a;
            }
          }
          @media (max-width: 1400px) {
            width: unset;
          }
        }
      }
    }
`;
export const CollapseWrapper = styled(Collapse)`
  background-color: #fff !important;
  .ant-collapse-item {
    border-bottom: none !important;
    .ant-collapse-header {
      display: flex;
      justify-content: center;
      align-items: center;
      .ant-collapse-arrow {
        position: initial !important;
        margin: 0 15px 0 0 !important;
        padding: 0 !important;
      }
    }
  }
`;
export const MainTextFiled = styled.div`
      padding: 14px 30px 22px;
`;
export const HeaderWrapper = styled.div`
  font-weight: bold;
  font-size: 24px;
  line-height: 33px;
  color: #172b4d;
  > img:first-child {
    padding: 0 13px 0 8px;
  }
`;
export const TitleTable = styled.div`
  font-size: 14px;
  line-height: 25px;
  color: #172b4d;
`;
export const TableWrapper = styled(Table)``;
