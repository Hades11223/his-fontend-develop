import styled from "styled-components";

export const Main = styled.div`
  background: #f4f5f7;
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 750px;
  padding: 10px 20px;

  .content {
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow-y: scroll;
    margin-bottom: 16px;
  }
`;
