import styled from "styled-components";

export const Main = styled.div`
  &.action {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;

    margin: 10px 0;
    display: flex;
    justify-content: end;
    button {
      /* &:first-child {
        margin-right: 10px;
      } */
      &.mr-auto {
        margin-right: auto;
      }
    }
  }
`;
