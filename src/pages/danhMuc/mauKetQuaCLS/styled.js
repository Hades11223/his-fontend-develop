import styled from "styled-components";
export const Main = styled.div`
  height: 100%;
  display: flex;
  .row-actived {
    background: #c1f0db !important;
  }
  .ant-row {
    width: 100%;
  }
  .left {
    > div {
      margin-right: 10px !important;
    }
  }
  .right {
    > div {
      margin-left: 10px !important;
    }
  }
`;
