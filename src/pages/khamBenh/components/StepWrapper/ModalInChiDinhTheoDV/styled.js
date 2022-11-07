import styled from "styled-components";

export const Main = styled.div`
  padding: 10px;
  padding-bottom: 0;
  .main__container {
    margin: 0 !important;
    .ant-table-body {
      min-height: 265px;
    }
  }
  .header {
    padding: 8px 17px 8px 30px;
    flex-flow: initial;
    align-items: center;
    &__left {
      padding-right: 16px;
      white-space: nowrap;
      font-size: 18px;
    }
    &__right {
      padding-left: 16px;
      font-size: 18px;
      overflow: hidden;
      max-width: 100%;
      white-space: nowrap;
      margin-left: auto;
    }
  }
  .service {
    border-radius: 16px 0px 0px 0px;
    background: #ffffff;
    height: 442px;
    & .info-content {
      height: 330px;
      display: flex;
      & .custom-col {
        margin-left: 30px;
        flex: 4;
        table {
          tbody {
            tr {
              height: 40px;
              td {
                padding-right: 30px;
                &:first-child {
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  max-width: 200px;
                }
              }
              & .info {
                font-weight: bold;
                color: #172b4d;
                max-width: 250px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
            }
          }
        }
      }
    }
    & .btn_back {
      width: 123px;
      height: 36px;
      background: #ffffff;
      mix-blend-mode: normal;
      margin-left: 30px;
      border: 1px solid #0762f7;
      box-shadow: 0px 3px 0px #03317c;
      border-radius: 8px;
    }
  }
  & .table-service {
    height: 100vh;
    max-height: calc(100vh - 300px);
    display: flex;
    flex-direction: column;
  }
`;
