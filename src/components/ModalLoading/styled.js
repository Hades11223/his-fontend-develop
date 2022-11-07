import { Modal, Row } from "antd";
import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  & .modal-loading{
    z-index: 2000;
    & .ant-modal-content{
      background-color:#FFF;
      & .ant-modal-body{
        display: flex;
        flex-direction: column;
        & .loading-text{
          text-align: center;
          margin-top: 20px;
          font-weight: 600;
          font-size: 13pt;
        }
      }
    }
  }
`;
