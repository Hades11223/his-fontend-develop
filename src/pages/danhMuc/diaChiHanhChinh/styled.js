import styled from "styled-components";

export const Main = styled.div`
  height: 100%;
  overflow: auto;

  .table-tab {
    max-width: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .ant-tabs-content {
      display: flex;

      .ant-tabs-content-holder {
        width: 100%; 
        height: 100%;
        overflow: hidden;
        flex: 1;
      }
    }
  }
  .ant-tabs-content {
    display: flex;
  }
  .ant-tabs-tabpane {
    width: 100%;
  }
`;
