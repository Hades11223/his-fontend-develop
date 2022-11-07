import styled from "styled-components";

export const Main = styled.div`
  padding: 10px;
  & .footer-action {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: 10px;
    & .selected-item {
      flex: 1;
    }
  }
  & label {
    font-weight: bold;
    margin-right: 10px;
  }
`;
