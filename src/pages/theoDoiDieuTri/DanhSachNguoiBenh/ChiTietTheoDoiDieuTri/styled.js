import styled from "styled-components";
export const Main = styled.div`
  background: #f4f5f7;
  min-height: 100vh;
  margin-bottom: 30px;
  .header-screen {
    h3 {
      font-size: 20px;
      font-weight: bold;
      padding-left: 10px;
      margin-bottom: 0;
    }
  }
  .ant-row {
    width: 100%;
  }
  .left {
    > div {
      margin-right: 15px !important;
    }
  }
  .right {
    > div {
      margin-left: 15px !important;
    }
  }
`;

export const Body = styled.div`
  /* display: flex; */
  /* background-color: white; */
  margin-top: 8px;
  border-radius: 5px;
  height: 80vh;
  overflow: hidden;
  /* flex-wrap: wrap; */
  .left-body {
    width: 20%;
  }
  .right-body {
    width: 80%;
    .ant-tabs-nav {
      height: 44px;
      padding-left: 5px;
      margin-bottom: 0;
      border-bottom: 1px solid #c6cbd3;
      .ant-tabs-tab-btn {
        font-weight: bold;
      }
    }
  }
`;
