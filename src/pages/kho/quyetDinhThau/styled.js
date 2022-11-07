import styled from "styled-components";

export const Main = styled.div`
  height: 100%;
  overflow: auto;

  & .ant-tabs {
    max-width: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  & .ant-tabs-content-holder {
    width: 100%; 
    height: 100%;
    overflow: hidden;
    flex: 1;
    min-height: unset !important;
    max-height: unset !important;
    & .ant-tabs-content-top {
      min-height: unset !important;
      max-height: unset !important;
      & .ant-tabs-tabpane {
        height: 100%;
        width: 100%;
      }
    }
  }
  & .ant-tabs-content {
    display: flex;
    border-radius: 0px !important;
    border-left: 0px;
    border-right: 0px;
  }
  & .multi-level-tab {
    height: 100%;

    & .ant-tabs-top {
      height: 100%;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    & .ant-tabs-nav-list {
      margin-left: 0px !important;
      padding-top: 0px !important;
    }
  }
  & .main-info {
    background: linear-gradient(
        0deg,
        rgba(23, 43, 77, 0.1),
        rgba(23, 43, 77, 0.1)
      ),
      #ffffff;
    border-radius: 20px 0px 0px 0px;
    width: 100%;
    & .title-info {
      padding: 5px 30px;
      color: #172b4d;
      font-style: normal;
      font-weight: bold;
      font-size: 18px;
      & .right-info {
        float: right;
        color: #0762f7;
        font-style: normal;
        font-weight: bold;
        font-size: 14px;
        line-height: 24px;
        background: transparent;
        border: none;
        cursor: pointer;
      }
    }
    & .table-info {
      border-radius: 20px 0px 0px 0px;
      border-top: 2px solid #3984ff;
      overflow: auto;
      padding-top: 2px;

      & .main-table-wrapper {
        width: 100%;
        margin-bottom: 0;
        padding: 0;
        font-weight: 600;
        color: #172b4d;
        & .home-table-warrper {
          margin: 0;
        }
      }
    }
  }
  & .ant-tabs-top {
    height: 100%;
  }
`;
