import styled, { createGlobalStyle } from "styled-components";
import { Modal } from "antd";
export const ModalStyled = styled(Modal)`
  .ant-modal-content {
    border-radius: 16px;
    .ant-modal-body {
      padding: 0px;
      background: linear-gradient(
          0deg,
          rgba(23, 43, 77, 0.05),
          rgba(23, 43, 77, 0.05)
        ),
        #ffffff;

      border-radius: 16px;
      .ant-table-tbody {
        .ant-table-cell {
          .ant-select {
            border-radius: 0px;
            .ant-select-selector {
              border-radius: 0px;
            }
          }
          .ant-input {
            border-radius: 0px;
          }
          .ant-input-number {
            border-radius: 0px;
          }
        }
      }

      .ant-select-selector {
        border-radius: 0px;
      }
    }
  }
`;

export const Main = styled.div`
  .title-box.d-flex.justify-content-center.mn-sortable {
    justify-content: center;
  }
  .header {
    display: flex;
    padding: 12px 10px 0px 20px;
    span {
      font-family: Nunito Sans;
      font-style: normal;
      font-weight: bold;
      font-size: 18px;
      line-height: 24px;
    }
  }
  .footer {
    display: flex;
    height: 52px;
    background: linear-gradient(
        0deg,
        rgba(255, 255, 255, 0.95),
        rgba(255, 255, 255, 0.95)
      ),
      #0762f7;
    border-radius: 0px 0px 16px 16px;
    .right {
      margin-left: auto;
      align-items: center;
      display: flex;
      justify-content: center;
      .btn-accept {
        background: #0762f7;
        mix-blend-mode: normal;
        box-shadow: 0px 3px 0px #03317c;
        border-radius: 8px;
        color: #fff;
        margin-right: 10px;
      }
      .btn-cancel {
        background: #ffffff;
        mix-blend-mode: normal;
        /* #0762F7 */

        border: 1px solid #0762f7;
        box-shadow: 0px 3px 0px #03317c;
        border-radius: 8px;
        margin-right: 10px;
      }
    }
  }
`;
export const ContentTable = styled.div`
  overflow: hidden;
  background: #ffffff;
  border-radius: 16px;
`;
export const ContentWrapper = styled("div")`
position: relative;
  z-index: 1001;
  .content-popover {
    background-color: white;
    input[type=number]::-webkit-inner-spin-button, 
    input[type=number]::-webkit-outer-spin-button { 
      -webkit-appearance: none; 
      margin: 0; 
    }
    .popover-btn-list {
      display: flex;
      justify-content: space-between;
      padding-bottom: 10px;
      button {
        height: auto;
        padding: 6px 32px;
        margin: 0 8px;
        border-radius: 8px;
        border: 1px solid #0762f7;
        box-shadow: 0px 3px 0px #03317c;
        font-weight: 600;
        font-size: 16px;
        color: #172b4d;
        @media (max-width: 1366px) {
          padding: 4px 20px;
        }
      }
      &__cancel {
        margin-left: 18px;
        background: #ffffff;
        @media (max-width: 1366px) {
          margin-right: 0.5em;
        }
      }
      &__ok {
        background: #0762f7;
        color: white !important;
      }
    }
  }
`;
export const GlobalStyle = createGlobalStyle`
.popover-table-thuoc-ke-ngoai{
  .ant-popover-inner-content{
    padding: 0px !important;
  }
  &_lieu-dung{
      .ant-form{
        padding: 8px 8px 0px 8px;
        .ant-form-item-label{
          padding : 0px ; 
        }
        .ant-form-item{
          margin-bottom : 15px !important;
        }
      }
  }
  label {
      /* margin-bottom: 4px;
      line-height: 20px;
      font-size: 14px;
      font-weight: 600;
      color: #172b4d; */
      &.ant-form-item-required {
        &:after {
          display: inline-block;
          margin-right: 4px;
          color: red;
          font-size: 16px;
          font-weight: 600;
          font-family: inherit;
          line-height: 1;
          content: "*";
        }
        &:before {
          display: none !important;
        }
      }
    }
  }
  
`;