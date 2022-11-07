import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    .ant-modal-body{
        padding : 10px 24px
    }
`;
export const Main = styled("div")`
  .date {
    font-size: 16px;
    font-weight: 600;
  }
  .item-time {
    margin: "10px 0px";
  }
  .time {
    font-weight: 500;
    color: #fff;
    padding: 5px;
    background: #08aaa8;
    :hover {
      cursor: pointer;
    }
    border-radius: 8px;
    i {
      margin-left: 5px;
    }
  }
  .active {
    background: #f75653;
  }
`;
