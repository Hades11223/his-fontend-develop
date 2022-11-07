import styled, { createGlobalStyle } from "styled-components";

export const Main = styled.div`
  position: relative;
  z-index: 1001;
  background: white;
  max-width: 100%;
  border-radius: 16px;
  .content-popover {
    z-index: 100;
    width: 1000px;
    /* max-width: 100%; */
  }
  .main__container {
    margin: 0 !important;
    border-top: 0px;
    .justify-content-center {
      justify-content: center;
    }
    .ant-table-body {
      min-height: 0px;
      .ant-table-cell {
        border: 1px solid #d9dbe9 !important;
        border-left: none !important;
        color: #172b4d !important;
        line-height: 20px;
      }
    }
  }
`;

export const GlobalStyle = createGlobalStyle`
& .popover-trang-thai-thanh-toan{
  & .ant-popover-inner{
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px !important;
    border-radius: 8px !important;
  }
}

`;
