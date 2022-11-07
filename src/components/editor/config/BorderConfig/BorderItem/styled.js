import styled from "styled-components";

const Main = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
  & .color-picker {
    & button {
      border-radius: 3px;
      &:first-child {
        display: none;
      }
    }
  }
  & > i {
    margin-right: 5px;
  }
`;

export { Main };
