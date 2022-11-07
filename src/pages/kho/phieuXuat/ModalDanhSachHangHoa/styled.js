import styled from "styled-components";

export const Main = styled.div`
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
