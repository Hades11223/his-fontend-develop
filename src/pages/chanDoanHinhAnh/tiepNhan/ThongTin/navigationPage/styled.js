import styled from "styled-components";

export const NavigationWrapper = styled.div`
  a {
    > div {
      opacity: 0.5;
    }
    &.active {
      > div {
        opacity: 1;
        pointer-events: auto;
      }
    }
  }
`;
