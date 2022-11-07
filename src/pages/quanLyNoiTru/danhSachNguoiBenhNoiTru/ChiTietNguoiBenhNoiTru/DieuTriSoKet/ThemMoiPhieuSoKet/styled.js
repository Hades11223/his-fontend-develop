import styled from "styled-components";
export const Main = styled.div`
  background: #f4f5f7;
  height: 100%;
  display: flex;
  flex-direction: column;
  .container {
    padding: 0 8px !important;
  }
  .icon-tab {
    margin-right: 10px;
  }
  .ant-row {
    width: 100%;
  }
  .header-left {
    background: linear-gradient(
        0deg,
        rgba(255, 255, 255, 0.95),
        rgba(255, 255, 255, 0.95)
      ),
      #0762f7;
    /* shadow-khung */

    box-shadow: 0px 0px 15px rgba(9, 30, 66, 0.07);
    border-radius: 8px;
  }
  .content {
    background: #fff;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    height: 100%;
    .title {
      display: flex;
      span {
        font-size: 16px;
        margin-left: 30px;
      }
      .left {
        display: flex;
        align-items: center;
        .date {
          display: flex;
          padding-left: 20px;
          align-items: center;
          .title{
            padding-right: 7px;
            font-size: 16px;
          }
        }
      }
      .right {
        margin-left: auto;
      }
    }
    .info {
      height: calc(100vh - 360px);
      overflow: auto;
    }
  }
  h1 {
    font-family: "Nunito Sans";
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
  }

  .footer {
    margin-top: 20px;
    display: flex;
    justify-content: end;
  }
`;
