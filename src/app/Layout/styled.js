import styled from "styled-components";

const Main = styled("div")`
  height: 100vh;
  display: flex;
  flex-direction: column;
  & .app-main {
    flex: 1;
    overflow: hidden;
  }
`;

export { Main };
