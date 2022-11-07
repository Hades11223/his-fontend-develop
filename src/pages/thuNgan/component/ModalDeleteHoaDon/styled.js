import Modal from "antd/lib/modal/Modal";
import styled from "styled-components";
export const Main = styled(Modal)`
  color: #172b4d;
  & .ant-modal-content {
    border-radius: 8px;
  }
  &.ant-modal-title {
    color: #172b4d !important;
    font-size: 16px;
    display: none;
  }
  & .ant-modal-header {
    border-bottom: 1px solid #fc3b3a;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    & .ant-modal-title {
      font-size: 20px;
      color: #172b4d;
    }
  }
  & .f-w-600 {
    font-weight: 600;
  }
  & .f-w-700 {
    font-weight: 700;
  }
  & .pd-tb-10 {
    padding: 10px 0;
  }
  & .footer {
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
    .ant-btn {
      border-radius: 8px;
      span {
        font-size: 14px;
        font-weight: 700;
      }
    }
    .btn-ok {
      background: #fc3b3a;
      border: none;
      :hover {
        background: #de3433;
        cursor: pointer;
      }
      color: #fff;
    }
    .btn-cancel {
      color: #172b4d;
      background: #fff;
      border: 1px solid #054ab9;
      margin-right: 10px;
      :hover {
        background: #e7f0fe;
        cursor: pointer;
      }
    }
  }
`;
