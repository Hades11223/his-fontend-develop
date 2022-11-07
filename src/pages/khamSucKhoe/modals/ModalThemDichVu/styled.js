import styled from "styled-components";
import { Modal } from "antd";

export const Main = styled.div`
  & .select__goiDichVu {
    width: 100%;
  }

  .info-content {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    height: 100%;
  }

  .success-title {
    background: #fc3b3a;
    border-radius: 16px;
    padding: 8px 12px;
    margin: 16px;
    display: flex;
    align-items: center;

    span {
      color: #fff;
      font-size: 14px;
      font-weight: 900;
    }

    .check-icon {
      font-size: 24px;
      padding-right: 10px;
    }
  }

  .success-content {
    margin: 5px 16px;

    .text {
      margin-bottom: 5px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1; /* number of lines to show */
      line-clamp: 1;
      -webkit-box-orient: vertical;
    }
  }

  .ant-col {
    padding: 10px;
  }

  .input-goi {
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 6 6"><circle cx="3" cy="3" r="0.4" fill="black" /></svg>')
      20px;
    background-position-y: 7px;
    background-size: 5px 25px;
    border: none;
    width: 80%;
  }

  .header {
    background-color: #0762f7;
    color: #fff;
    padding: 12px;
    font-size: 16px;
  }

  .table-service {
    height: 300px;
    border: 1px solid #172b4d40;
    border-style: none solid solid solid;
    /* overflow: scroll; */
    .ant-table-wrapper {
      height: 295px;
    }
  }

  .select-goi-item {
    background-color: #0762f7;
  }

  .list-goi-dichvu {
    height: 300px;
    border: 1px solid #172b4d40;
    border-style: none solid solid solid;
    overflow: scroll;
  }
`;
