import styled from "styled-components";

export const Main = styled.div`
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    #0762f7;
  border-radius: 16px;
  .main__container {
    margin: 0px;
  }
  .header {
    padding: 13px 16px;
    flex-flow: initial;
    align-items: center;
    color: #ffffff;
    &__left {
      font-family: Nunito Sans;
      font-style: normal;
      font-weight: bold;
      font-size: 18px;
      line-height: 24px;
      text-align: center;
    }
    &__right {
      margin-left: 10px;
      .btn_new {
        background: #049254;
        width: 139px;
        height: 36px;
      }
      button {
        height: auto;
        margin: 0 8px;
        border-radius: 8px;
        border: 1px solid #049254;
        box-shadow: 0px 3px 0px #03317c;
        font-weight: 600;
        font-size: 16px;
        color: #ffffff;
      }
    }
  }
`;

export const ContentTable = styled.div`
  overflow: hidden;
  border-top: 2px solid #ef4066;
  background: #ffffff;
  border-radius: 16px 0px 0px 0px;
  padding-left: 20px;
  .ant-table-body {
    height: calc(100vh - 535px) !important;
    max-height: unset !important;
  }
  .title {
    padding-top: 20px;
    padding-bottom: 10px;
    font-family: Nunito Sans;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 27px;
    display: flex;
    align-items: center;
  }
  .documentno-info {
    width: 100%;
    padding: 10px;
    background: linear-gradient(
        0deg,
        rgba(255, 255, 255, 0.9),
        rgba(255, 255, 255, 0.9)
      ),
      #0762f7;
    border-radius: 16px 0px 0px 16px;
    .info-content {
      display: flex;
      .custom-col {
        flex: 4;
        table {
          tbody {
            tr {
              td {
                font-family: Nunito Sans;
                font-style: normal;
                font-weight: normal;
                font-size: 14px;
                line-height: 25px;
              }
              .info {
                font-family: Nunito Sans;
                font-style: normal;
                font-weight: bold;
                font-size: 14px;
                line-height: 25px;
                padding-left: 10px;
              }
            }
          }
        }
      }
    }
  }
  .table {
    margin-top: 15px;
    background: linear-gradient(
        0deg,
        rgba(23, 43, 77, 0.1),
        rgba(23, 43, 77, 0.1)
      ),
      #ffffff;

    box-shadow: 0px 0px 15px rgba(9, 30, 66, 0.07);
    border-radius: 16px 0px 16px 0px;
    .header-table {
      padding: 15px;
      font-family: Nunito Sans;
      font-style: normal;
      font-weight: bold;
      font-size: 18px;
      line-height: 24px;
    }

  }
`;
