import styled from "styled-components";

export const Main = styled.div`
  padding: 16px;
  width: 100%;
  & .box {
    margin-top: 0px;
    & .content-box {
      padding: 16px;
    }
  }
  & .box-left {
    margin-right: 8px;
    min-width: 500px;
    & .content-box {
      & > .ant-row {
        margin-bottom: 5px;
        & .input-content,
        & .ant-select,
        & .hanlde-textfield {
          width: 100% !important;
        }
        & .ant-form-item {
          margin-bottom: 0px;
        }
      }
    }
  }
  & .box-right {
    margin-left: 8px;
    width: 100%;
    min-width: 500px;
    & .header-box__left {
      & .ant-select {
        margin-left: 5px;
      }
    }
    & .text-field {
      margin-bottom: 5px;
      min-height: 45px;
    }
  }
`;
