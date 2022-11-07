import styled from "styled-components";

export const Main = styled.div`
  margin-bottom: 30px;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    #0762f7;
  box-shadow: 0px 0px 15px rgba(9, 30, 66, 0.07);
  border-radius: 16px;
  font-family: Nunito Sans;
  .group-title {
    padding: 8px 30px;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    color: #ffffff;
  }
  .group-content {
    max-height: 300px;
    overflow: auto;
    padding: 20px 30px;
    background: #ffffff;
    border-radius: 16px 0px 0px 0px;
    border-top: 3px solid #ef4066;
    .input-left,
    .input-right {
      input {
        font-size: 15px;
        font-weight: bold;
        color: red;
      }
    }
    .ant-form-item-label {
      > label {
        font-weight: 600;
        font-size: 14px;
        color: #172b4d;
      }
    }
    .ant-checkbox-wrapper {
      > span {
        font-weight: 600;
        font-size: 14px;
        color: #172b4d;
      }
    }
    .input-center {
        text-align: center;
      }
      .input-left {
        color: red;
        font-size: 16px;
        text-align: left;
        font-weight: 900;
      }
      .input-right {
        color: red;
        font-size: 16px;
        text-align: right;
        font-weight: 900;
      }
  }
`;
