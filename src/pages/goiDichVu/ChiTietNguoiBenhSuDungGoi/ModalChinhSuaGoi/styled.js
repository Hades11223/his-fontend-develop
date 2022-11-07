import styled from "styled-components";
export const Main = styled.div`
  padding: 10px;

  .header-box {
    padding-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .ten-goi {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      & label {
        width: 70px;
      }

      & .name-item {
        width: 300px;
      }
    }
  }
  .table-content {
    border: 2px dashed #049254;
    border-style: dashed;
    height: 500px;

    &-header {
      background-color: #d9d9d9;
      padding-top: 5px;
    }
  }
  & .ic-action {
    width: 20px;
    height: 20px;
  }
`;
