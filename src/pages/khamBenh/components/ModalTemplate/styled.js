import styled from "styled-components";
import { Modal } from "antd";
export const ModalStyled = styled(Modal)`
  padding: 0;
  .ant-modal-content {
    background: #03317c;
    box-shadow: 0px 0px 20px rgba(9, 30, 66, 0.2);
    border-radius: 16px 16px 0 0;
    font-family: Nunito Sans, sans-serif;
    .ant-modal-body {
      padding: 0;
    }
    overflow: hidden;
  }
  & .action-group {
    display: flex;
    justify-content: center;
    & .btn-action {
      border: none;
      background-color: transparent;
      padding: 0;
      margin: 5px;
      outline: none;
      color: #0762f7;
      cursor: pointer;
      :hover {
        text-decoration: underline;
        color: #004ac3;
      }
      :active {
        color: #0762f7;
      }
    }
  }
`;
export const Main = styled.div`
  .main__container {
    margin: 0 !important;
  }
  .header-table {
    padding: 8px 17px 8px 30px;
    flex-flow: initial;
    align-items: center;
    &__left {
      white-space: nowrap;
      font-weight: bold;
      font-size: 18px;
      color: #ffffff;
      width: 100%;
    }
    &__right {
      margin-left: auto;
      img {
        cursor: pointer;
      }
    }
  }
  & .modal-content {
    overflow: hidden;
    border-top: 2px solid #ef4066;
    background: #ffffff;
    border-radius: 16px 0px 0px 0px;
  }
  & .modal-footer {
    margin-top: 2px;
    display: flex;
    justify-content: flex-end;
    padding: 5px;
    background-color: #fff;
  }
`;
