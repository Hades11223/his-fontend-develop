import styled from "styled-components";

export const Main = styled.div`
  font-family: Nunito Sans;
  .input-option {
    /* width: 150;  */
  }
  .row-item {
    margin-top: 20px;
    height: 30px;
    align-items: center;
    &.first {
      margin-top: 0px;
    }
    &.right {
      border-bottom: 1px solid #cecece;
    }
  }
  .ant-row {
    .ant-col {
      display: flex;
      align-items: center;
      .ant-select {
        width: 100%;
      }
    }
  }
`;
