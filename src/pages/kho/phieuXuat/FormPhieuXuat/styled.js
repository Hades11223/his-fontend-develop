import styled from "styled-components";

export const Main = styled.div`
  display: flex;
  background: white;
  font-size: 14px !important;
  .ant-select-selection-placeholder{
    font-size: 14px !important;
  }
  & .ant-input,
  & .ant-select-selection-item {
    font-size: 14px !important;
  }
  & .form-item {
    & .label {
      font-size: 14px !important;
      color: #172b4d;
      font-weight: 600;
    }
    & .ant-select {
      width: 100%;
    }
    & input::placeholder {
      /* Chrome, Firefox, Opera, Safari 10.1+ */
      /* color: #c1cde3 !important; */
      font-size: 14px !important;
      opacity: 1; /* Firefox */
    }
  }
`;
