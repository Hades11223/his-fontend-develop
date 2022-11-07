import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
 .ant-modal-title {
    div:last-child {
      display: flex;
      align-items: center;
      color: #0762f7;
      font-weight: normal;
      svg {
            width: 20px;
            height: 20px;
          }
      }
  }
`;
