import styled from "styled-components";
export const Main = styled.div`
  background: #f4f5f7;
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  & .main-page {
    display: flex;
    flex-direction: column;
  }
  .top-level-category {
    min-height: 41px;
    padding: 0px 30px;
    padding-top: 10px;
    .container {
      padding: 0px;
    }
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
`;
