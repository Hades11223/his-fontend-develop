import styled from "styled-components";
export const Main = styled.div`
  background: #ffffff;
  border-radius: 17px;
  display: flex; 
  height: 100%;
  overflow: auto; 
  flex-direction: column;

  .header {
    padding: 5px 0px 0px 20px;
    span {
      font-weight: bold;
      margin-left: -5px;
    }
    .title {
        font-family: Nunito Sans;
        font-style: normal;
        font-weight: bold;
        font-size: 24px;
        line-height: 24px;
    }
    .btn-new {
      width: 110px;
      height: 38px;
      background: #049254;
      mix-blend-mode: normal;
      border-radius: 8px;
      color: #fff;
      margin-left: 10px;
    }
    img {
      padding-left: 5px;
    }
  }
  .ant-row {
    overflow: hidden;

    .main__container {
      margin-top: 2px;
      .ant-table-body {
        min-height: calc(100vh - 260px) !important;
      }
    }
  }
  .parrent-wrapper {
    margin-top: 43px;
    .create-body {
      min-height: auto !important;
      max-height: auto !important;
    }
  }

`;
