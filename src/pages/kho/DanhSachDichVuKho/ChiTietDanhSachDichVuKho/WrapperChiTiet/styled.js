import styled from "styled-components";

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Nunito Sans !important;
  padding: 0 30px;
  background: #f4f5f7;
  height: calc(100vh - 130px);
  overflow: hidden;

  .main {
    margin-top: 15px;
    margin-bottom: 10px;
    background-color: white;
    overflow: hidden;
  }

  .button-bottom {
    display: flex;
    justify-content: flex-end;
  }
`;
