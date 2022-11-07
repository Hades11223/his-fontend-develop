import styled from "styled-components";
import { Modal } from "antd";

export const Main = styled.div`
  .footer-action {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 16px;
    & .selected-item {
      flex: 1;
    }

    .back-text {
      color: #0762F7;
    }
  }

  .info-content {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    height: 100%;

    .ant-select {
      width: 280px;
    }
  }

  .success-title {
    background: green;
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
`;


export const ModalStyled = styled(Modal)`
  padding: 0;

  .ant-modal-content {
    background: #f4f5f7;
    box-shadow: 0px 0px 20px rgba(9, 30, 66, 0.2);
    border-radius: 16px;
    font-family: Nunito Sans, sans-serif;
    height: 210px;
    .ant-modal-body {
      padding: 0;
    }
    overflow: hidden;
  }
`;