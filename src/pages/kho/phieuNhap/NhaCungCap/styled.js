import styled from "styled-components";
import { Table as TB } from "antd";
import { Page } from "components";
export const MainPage = styled(Page)`
  font-family: "Nunito Sans";
  font-size: 14px;
  background-color: #f3f4f7;
  display: flex;
  flex-direction: column;
  height: 100%;
  & .main-page {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    & .page-body {
      flex: 1;
      display: flex;
      flex-direction: column;
      & .page-body {
        padding: 16px;
      }
      & .page-body1 {
        flex: 1;
        overflow: hidden;
        margin-left: -16px;
        & .header {
          margin-left: 16px;
        }
        & > .ant-col {
          height: 100%;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        & .col-right {
          border-left: 1px solid #83b0fb;
        }
        & .col-left {
          & .header {
            padding: 10px 0;
            padding-top: 0px;
          }
        }
      }
    }
  }
`;

export const Table = styled(TB)`
  .level-1 {
  }
  .level-2 {
    border-top: none;
  }
`;
