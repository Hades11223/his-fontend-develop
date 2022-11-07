import styled, { createGlobalStyle } from "styled-components";
import { Modal as MD } from "antd";

export const Main = styled.div`
  margin-top: -6px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  .main__container {
    margin-top: 0px;
  }
  .title-box {
    justify-content: center;
  }
  .row-actived {
    background: #c1f0db !important;
  }
  .header {
    padding: 13px 16px;
    flex-flow: initial;
    align-items: center;
    color: #ffffff;
  }
  & .bottom-action {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    & .left,
    & .center {
      flex: 1;
    }
    & .right {
      display: flex;
      align-items: center;
    }
  }
`;

export const ContentTable = styled.div`
  flex: 1;
  overflow: hidden;
  background: #ffffff;
  border-radius: 16px 0px 0px 0px;
  .ant-table-body {
    height: 100% !important;
    max-height: unset !important;
  }
`;

export const Modal = styled(MD)`
  .ant-modal-content {
    /* max-height: calc(100vh - 100px); */
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background: linear-gradient(
        0deg,
        rgba(23, 43, 77, 0.05),
        rgba(23, 43, 77, 0.05)
      ),
      #ffffff;
    /* shadow-khung */

    box-shadow: 0px 0px 15px rgba(9, 30, 66, 0.07);
    border-radius: 8px;
    overflow: hidden;

    & .ant-modal-close {
      display: ${(props) => (props.closableX ? "block" : "none")};
    }

    & .ant-modal-close-x {
      height: 43px;
      width: 43px;
      line-height: 43px;
    }

    .ant-modal-header {
      background-color: #f3f4f6;
      min-height: 43px;
      padding: 0;
      display: flex;
      align-items: center;
      padding: 0 16px;
      .title {
        line-height: 24px;
        font-style: normal;
        font-weight: bold;
        font-size: 17px;
        display: flex;
        justify-content: space-between;
        h2 {
          margin-bottom: 0;
          display: -webkit-box;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
        & > div {
          font-weight: normal;
        }
        .font-color {
          color: #7a869a;
          font-weight: bold;
        }
        .normal-weight {
          color: #7a869a;
          font-weight: normal;
        }
        .rightTitle {
          display: -webkit-box;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
      }
    }
    .ant-modal-title {
      width: 100%;
    }
    .ant-modal-body {
      padding: 0 !important;
      background-color: #f3f4f6;
      flex: 1;
      /* overflow: auto; */
    }
  }
`;

export const GlobalStyle = createGlobalStyle`
  & .modal-template {
    /* max-height: calc(100vh - 100px); */
     &.modal-phieu-linh{
        & .ant-modal-body{
          &::before{
            border-top: 2px solid #0762f7;
          }
        }
      }
    & .ant-modal-content {
        position: relative;
        background-color: #fff;
        background-clip: padding-box;
        border: 0;
        border-radius: 2px;
        box-shadow: 0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%), 0 9px 28px 8px rgb(0 0 0 / 5%);
        pointer-events: auto;
        border-radius: 16px;
        overflow: hidden;
        background: #fff;
        & .ant-modal-header{
          padding: 8px 30px 16px;
          background: linear-gradient( 0deg, rgba(23,43,77,0.05), rgba(23,43,77,0.05) );
          color: rgba(0, 0, 0, 0.85);
          border-bottom: 1px solid #f0f0f0;
          border-radius: 2px 2px 0 0;          
        }
        & .ant-modal-body{
          padding: 18px 30px 30px;
          &::before
          {
            position: absolute;
            content: "";
            width: 100%;
            height: 25px;
            top: 40px;
            background-color: transparent;
            z-index: 1;
            border-radius: 20px 0 0 0;
            border-top: solid 3px #e8eaed;
            margin-left: 0px;
          }
        }
    }

    /* & .ant-modal-close
    {
      display: ${(props) => (props.closable ? "block" : "none")};
    }      */
  }
`;
