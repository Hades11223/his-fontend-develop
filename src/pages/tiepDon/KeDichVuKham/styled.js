import styled from "styled-components";

export const Main = styled.div`
  width: 100%;
  height: 100%;
  @media (max-width: 1200px) {
    overflow: auto;
    & > .w-split {
      height: 100%;
      display: block;
      flex-direction: column;
      & .w-split-bar {
        display: none;
      }
      & .w-split-pane {
        width: 100%;
        min-width: 100%;
      }
    }
  }
`;
