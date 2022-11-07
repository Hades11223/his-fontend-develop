import styled from "styled-components";

export const Main = styled.div`
  .main__container {
    margin: 0 !important;
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
      margin-left: auto;
      font-size: 18px;
      overflow: hidden;
      max-width: 100%;
      white-space: nowrap;
      height: 35px;
    }
  }
  .content {
    background: #ffffff;
    height: 100%;
    display: flex;
    flex-direction: column;
    /* height: 100vh; */
    .info {
      max-width: 100%;
    }
  }
`;
export const ContentTable = styled.div`
  overflow: hidden;
  background: #ffffff;
  border-radius: 16px 0px 0px 0px;
  .ant-table-body {
    height: 100% !important;
    min-height: calc(100vh - 530px);
  }
  .title-box {
    justify-content: center;
  }
`;
