import styled from "styled-components";

export const Main = styled.div`
  background: #f4f5f7;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  & .main-page {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    & .page-body {
      flex: 1;
      overflow: hidden;
      padding: 10px 1px;
      & > .ant-col {
        height: 100%;
        display: flex;
        flex-direction: column;
      }
      & > .ant-spin-nested-loading {
        height: 100%;
        overflow: hidden;
        & .ant-spin-container {
          height: 100%;
          overflow: hidden;
        }
      }
    }
    & .base-search_component {
      margin-bottom: 10px;
    }
  }

  & .footer-btn {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0;
    padding: 0 40px;
    & .left,
    & .right {
      display: flex;
      align-items: center;
    }
  }

  & .edit-wrapper {
    & .children {
      overflow: auto;
      margin-top: 10px;
    }
    & .bottom-actions {
      & .left-actions {
        flex: 1;
      }
      & .button-bottom-modal {
        position: unset;
        flex: unset;
      }
    }
  }
`;
