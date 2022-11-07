import styled from "styled-components";

export const Main = styled.div`
  & .info-content {
    padding: 10px 15px;
    font-family: Nunito Sans;
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
    .container-right {
      background-color: #d5f1e5;
      border-radius: 4px;
      padding-bottom: 10px;
    }
    .ant-form-item-label {
      text-align: left;
    }
    .input-option {
      text-align: left;
    }
    .ant-picker {
      width: 100%;
      text-align: left;
      #thoiGianKetLuan {
        text-align: left;
      }
    }

    & .ant-form-horizontal {
      & .ant-form-item-control {
        flex: unset;
      }
    }
  }
  & .footer-btn {
    display: flex;
    justify-content: space-between;
    padding: 20px 15px 15px;
  }
`;
