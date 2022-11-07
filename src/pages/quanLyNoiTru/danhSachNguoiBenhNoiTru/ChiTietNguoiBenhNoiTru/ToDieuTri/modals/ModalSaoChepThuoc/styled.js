import styled from "styled-components";

export const Main = styled.div`
  background: #f4f5f7;
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 420px;
  padding: 10px 30px;

  .content {
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-bottom: 16px;

    .ant-select-disabled {
      & .ant-select-selector {
        color: #000 !important;
      }
    }
  }
`;
