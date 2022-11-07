import styled from "styled-components";
import { Modal } from "antd";

export const Main = styled.div`
  .left-panel {
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
      #0762f7;

    .khoa-info {
      margin-top: 16px;
      display: flex;
      width: 100%;
      justify-content: center;
    }

    .khoa-giuong-info {
      width: 100%;
      text-align: center;
      color: #08cfde;
      font-size: 14px;
      line-height: 19px;
      font-weight: 400;
      margin-top: 20px;

      a {
        color: #08cfde;
      }

      .selected {
        color: #1890ff;
      }
    }

    &-ds-pg {
      margin-top: 50px;

      &-item {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 50px;

        &-label {
          font-weight: 400;
          font-size: 16px;
          line-height: 22px;
          color: #ffffff;
        }
      }

      &-selected-item {
        display: flex;
        background-color: #fff;
        justify-content: space-around;
        align-items: center;
        height: 50px;
        margin-left: 20px;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;

        &-label {
          font-weight: 400;
          font-size: 16px;
          line-height: 22px;
          color: #0762f7;
        }

        &-icon {
          font-size: 20px;
          color: #0762f7;
        }

        &-arrow {
          font-size: 20px;
          color: #0762f7;
        }
      }
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
    height: 800px;
    .ant-modal-body {
      padding: 0;
    }
    overflow: hidden;
  }
`;

export const TabContentStyled = styled.div`
  overflow-y: scroll;

  height: 500px;
`;

export const CircleKhoaStyled = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  color: #08cfde;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 900;
  font-size: min(1.8vw, 1.5vh);
  line-height: 33px;
  padding-top: 20px;

  text-transform: uppercase;
  border: 1px solid rgba(8, 207, 222, 0.4);
`;
