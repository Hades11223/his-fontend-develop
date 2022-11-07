import styled from "styled-components";

export const Main = styled.div`
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .main__container {
    .ant-select-selector {
      margin: 5px;
    } 
    .ant-select {
      border: none !important;
    }
    .ant-select-single {
      margin-top: -4px !important;
    }
    .ant-select-selection-item  {
      text-align: center;
    }
    .ant-select-dropdown .ant-select-item-option-content {
      text-align: center !important;
    }
  }

  #ghiChu {
    height: 35px;
    border: none;
    outline: none;
    padding: 10px;
  }
`;
