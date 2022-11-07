import styled from "styled-components";
export const Main = styled.div`
background: #f4f5f7;
min-height: 100vh;
overflow: scroll;
height: 100vh;
padding-bottom: 100px;
.ant-row {
  width: 100%;
}
.left {
  > div {
    margin-right: 15px !important;
  }
}
.right {
  > div {
    margin-left: 15px !important;
  }
}
`;
