import styled from "styled-components";
import { Modal } from "antd";

export const ModalStyled = styled(Modal)`
  padding: 0;
  .ant-modal-content {
    background: #f4f5f7;
    box-shadow: 0px 0px 20px rgba(9, 30, 66, 0.2);
    border-radius: 16px;
    font-family: Nunito Sans, sans-serif;
    .ant-modal-body {
      padding: 0;
    }
    overflow: hidden;
  }
`;

export const Main = styled.div`
  height: 608px;
  .main__container {
    padding: 0 !important;
  }
  .header {
    padding: 8px 17px 8px 30px;
    flex-flow: initial;
    align-items: center;
    display: flex;
    &__left {
      white-space: nowrap;
      font-size: 18px;
    }
    &__right {
      margin-left: auto;
      img {
        cursor: pointer;
      }
    }
  }
  .infopatient-room {
    border-radius: 16px 0px 0px 0px;
    background: #ffffff;
    height: 565px;
    & .info-room {
      padding: 10px 30px 30px;
      & .table-service {
        background: #03317c;
        border-radius: 16px;
        height: 362px;
        & .header-table {
          padding: 8px 17px 8px 20px;
          & .header-table__left {
            font-style: italic;
            font-weight: bold;
            font-size: 16px;
            line-height: 24px;
            color: #ffffff;
          }
        }
      }
    }
  }

  .btn_back {
    margin-top: 20px;
    width: 123px;
    height: 36px;
    background: #ffffff;
    mix-blend-mode: normal;
    margin-left: 15px;
    border: 1px solid #0762f7;
    box-shadow: 0px 3px 0px #03317c;
    border-radius: 8px;
    align-items: center;
    text-align: center;
    font-weight: 600;
    font-size: 16px;
  }
  .btn_save {
      span{
        font-weight: 600;
        font-size: 16px;
      }
      img{
        padding-left:5px;
        padding-bottom:4px;
      }
    width: 93px;
    height: 36px;
    left: 500px;
    color: #ffffff;
    background: #0762f7;
    border-radius: 8px;
  }
`;
export const ContentTable = styled.div`
  overflow: hidden;
  border-top: 2px solid;
  background: #ffffff;
  border-radius: 16px;
  height: 321px;
`;
