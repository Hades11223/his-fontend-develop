import styled from "styled-components";

const Main = styled("div")`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  & table {
    font-size: 11pt !important;
    border-collapse: collapse;
    color: #000 !important;
    /* line-height: 11px; */
    & td {
      height: 14px;
    }
  }
  & .b {
    font-weight: bold;
  }
  & .i {
    font-style: italic;
  }
  & .mt5 {
    margin-top: 5px;
  }
  & .mb10 {
    margin-bottom: 10px;
  }
  & .text-center {
    text-align: center;
  }
  & .ml5 {
    margin-left: 5px;
  }
`;

export { Main };
