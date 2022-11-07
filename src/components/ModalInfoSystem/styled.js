import styled from "styled-components";

export const Main = styled.div`
  padding: 10px;
  max-height: 450px;
  overflow: hidden;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  & .multi-level-tab {
    display: flex;
    flex-direction: column;
    & .ant-tabs-top {
      overflow: hidden;
      height: 100%;
      display: flex;
      flex-direction: column;
      & .ant-tabs-content-holder {
        overflow: hidden;
        display: flex;
        flex-direction: column;
        max-height: unset;
        min-height: unset;
        & .ant-tabs-content-top {
          max-height: unset;
          min-height: unset;
          height: 100%;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          & .ant-tabs-tabpane-active {
            flex: 1;
          }
        }
      }
    }
  }
  .log {
    display: flex;
    align-items: center;
    overflow-y: auto;
    height: 100%;
    a:hover {
      text-decoration: underline;
    }
  }
`;
