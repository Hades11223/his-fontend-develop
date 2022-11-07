import styled from "styled-components";

export const Main = styled.div`
  padding: 10px 20px;
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding-right: 0;
  & .ant-form {
    overflow: auto;
    flex: 1;
    margin: 10px 0;
    & .ant-form-item {
      /* margin-bottom: 15px; */
      & .ant-form-item-label {
        padding-bottom: 2px;
        font-size: 0.5rem;
        font-weight: 650;
        > label {
          color: #172b4d;
        }
      }
      & .ant-form-item-control {
      }
      margin-bottom: 10px;
    }
    .ant-select-disabled {
      & .ant-select-selector {
        color: #000 !important;
      }
    }
  }

  & .action {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;
