import styled from "styled-components";
import { Collapse } from "antd";

export const Main = styled.div`
  .collapse-content {
    padding: 20px;
    height: 700px;
    overflow-y: scroll;
  }

  .text-err {
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    color: #fc3b3a;
    padding-bottom: 5px;
  }

  .thoi-gian-item {
    padding: 10px 0;
  }

  .phan-giuong {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    a {
      padding-left: 10px;
      font-weight: 400;
      font-size: 14px;
      line-height: 19px;
      color: #0762f7;

      span {
        padding-right: 4px;
      }
    }
  }
`;

export const CollapseWrapper = styled(Collapse)`
  background-color: #fff !important;
  .ant-collapse-item {
    border-radius: 5px;
    border: 1px solid rgba(23, 43, 77, 0.25);
    margin-bottom: 5px;

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

    :last-child {
      border-radius: 5px;
      border: 1px solid rgba(23, 43, 77, 0.25);
      margin-bottom: 5px;
    }
  }
`;

export const HeaderStyled = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;

  .title {
    color: #172b4d;
  }

  .so-khoan {
    color: #fc3b3a;
  }

  .pl-5 {
    padding-left: 10px;
  }
`;

export const KhoaTitleStyled = styled.div`
  text-transform: uppercase;
  font-weight: bold;
`;
