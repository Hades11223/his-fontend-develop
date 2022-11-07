import styled from "styled-components";

const Main = styled("div")`
  & .props-form-item {
    margin-bottom: 0;
    &.is-patient {
      & div {
        width: auto;
      }
    }
  }
`;

export { Main };
