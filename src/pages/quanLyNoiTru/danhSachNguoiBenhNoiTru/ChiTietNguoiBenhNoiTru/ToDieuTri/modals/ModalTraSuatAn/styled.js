import styled from "styled-components";

export const Main = styled.div`
  background: #f4f5f7;
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 450px;
  padding: 10px 20px;

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

    .header {
      background-color: #049254;
      color: #fff;
      padding: 12px;
      font-size: 16px;

      border-top-left-radius: 12px;
      border-top-right-radius: 12px;
    }

    .table {
      height: 360px;
      border: 2px dashed #049254;
      border-style: none dashed dashed dashed;
      border-radius: 12px;
    }
  }
`;
