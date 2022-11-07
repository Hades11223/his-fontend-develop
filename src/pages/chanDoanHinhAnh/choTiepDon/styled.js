import styled from "styled-components";

export const Main = styled.div`
  background: #f4f5f7;
  min-height: 100vh;
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

  .scroll-content {
    max-height: 85vh;
    overflow: scroll;
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;
