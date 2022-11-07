import styled from "styled-components";

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  height: 500px;
  & .footer-action {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: 10px;
    & .selected-item {
      flex: 1;
    }
  }
`;
