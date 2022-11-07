import styled from "styled-components";

export const Main = styled.div`
  flex: 1;
  overflow: hidden;
  display: flex;
  background-color: white;
  margin-top: 8px;
  border-radius: 5px;
  display: flex;
  .left-body {
    width: 270px;
  }
  .right-body {
    flex: 1;
    overflow: hidden;
    .ant-tabs {
      height: 100%;
      .ant-tabs-content {
        height: 100%;
      }
    }
    .ant-tabs-tab-btn {
      font-size: 16px;
    }
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
  .ant-tabs-content {
    display: flex;
    .ant-tabs-tabpane {
      width: 100%;
    }
  }
  & .tab-title {
    display: flex;
    align-items: center;
    & svg.icon {
      margin-left: 10px;
      width: 20px;
      height: 20px;
      cursor: pointer;
    }
  }
`;
