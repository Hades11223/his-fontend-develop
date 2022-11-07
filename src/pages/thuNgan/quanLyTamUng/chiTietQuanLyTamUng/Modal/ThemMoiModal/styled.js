import styled from "styled-components";

export const Main = styled.div`
  font-family: Nunito Sans;
  font-size: 16px;
  .input-option {
    /* width: 150;  */
  }
  .row-item {
    margin-top: 20px;
    height: 30px;
    align-items: center;
    &.first {
      margin-top: 0px;
    }
    &.right {
      border-bottom: 1px solid #cecece;
    }
  }
  .ant-row {
    padding: 20px 30px;
    .ant-col {
      display: flex;
      align-items: center;
      .ant-select {
        width: 100%;
      }
    }
  }
  .footer-btn {
    display: flex;
    justify-content: space-between;
    padding: 20px 15px 15px;
    button {
      font-size: 18px;
    }
  }
`;
export const ModalHeader = styled.div`
  display: flex;
  .font-color {
    color: #7a869a;
  }
  .normal-weight {
    color: #7a869a;
    font-weight: normal;
  }
  .right {
    font-size: 20px;
  }
  .left {
    margin-left: auto;
    text-align: center;
    font-style: normal;
    font-size: 16px;
  }
`;
