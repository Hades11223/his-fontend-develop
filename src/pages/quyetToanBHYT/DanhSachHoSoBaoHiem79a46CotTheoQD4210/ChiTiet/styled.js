import styled from "styled-components";
export const Main = styled.div`
  background: #f4f5f7;
  height: 100%;
  overflow: hidden;

  .ant-table-body {
    height: 370px !important;
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

  & .page-body {
    display: flex;
    flex-direction: column;
    & > .ant-row {
      flex: 1;
      overflow: hidden;
      & > .ant-col {
        height: 100%;
        overflow: hidden;
        & > div {
          height: 100%;
          padding-bottom: 3px;
        }
        & .multi-level-tab {
          height: 100%;
          & .ant-tabs-content-holder {
            min-height: unset !important;
            max-height: unset !important;
            & .ant-tabs-content-top {
              height: 100% !important ;
              min-height: unset !important;
              max-height: unset !important;
              & .ant-tabs-tabpane {
                height: 100%;
              }
            }
          }
          & .ant-tabs-top {
            height: 100%;
            overflow: hidden;
            display: flex;
            flex-direction: column;
          }
          & .ant-tabs-content {
            border-radius: 0px !important;
            border-left: 0px;
            border-right: 0px;
          }
          & .ant-tabs-nav-list {
            margin-left: 0px !important;
            padding-top: 0px !important;
          }
        }
      }
    }
    .footer {
      width: 100% !important;
      display: flex;
      justify-content: flex-end;
      bottom: 0px;
      right: 0px;
      margin-top: 10px;
      padding-right: 10px;
    }
  }
`;
