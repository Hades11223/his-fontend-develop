import styled, { createGlobalStyle } from "styled-components";
export const GlobalStyle = createGlobalStyle``;
export const Main = styled.div`
  padding: 10px;
  & .action {
    display: flex;
    .ic-chup-anh {
      fill: #054ab9;
      path {
        fill: #054ab9;
      }
    }
  }
  .thong-tin-benh-nhan {
    padding-top: 10px;
    padding-bottom: 10px;
    font-weight: 600;
    font-style: italic;
  }
  & .file-info {
    margin-top: 10px;
    display: flex;
    & .file-name {
      flex: 1;
      color: #0762f7;
      display: inline-block;
      width: 90%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      vertical-align: middle;
    }
    & .remove {
      color: #ff7875;
      vertical-align: middle;
    }
    svg {
      width: 20px;
      height: 20px;
    }
    :hover {
      background-color: #f3f4f6;
    }
  }
`;
