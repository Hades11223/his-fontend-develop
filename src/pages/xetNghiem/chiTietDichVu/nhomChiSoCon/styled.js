import styled from "styled-components";

export const Main = styled.div`
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    #0762f7;
  box-shadow: 0px 0px 15px rgba(9, 30, 66, 0.07);
  border-radius: 16px;
  font-family: Nunito Sans;
  .table-title {
    padding: 8px 30px;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    color: #ffffff;
  }
  > .ant-row {
    background: #ffffff;
    border-radius: 16px 0px 0px 0px;
    border-top: 3px solid #ef4066;
    overflow: hidden;
    .main__container {
      margin-top: 0 !important;
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
  }
`;
