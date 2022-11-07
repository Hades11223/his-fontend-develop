import styled from "styled-components";

const Main = styled("div")`
  & ul {
    margin: -12px;
    padding: 0;
    list-style: none;
    & li {
      padding: 10px;
      border-bottom: 1px solid #00000030;
      cursor: pointer;
    }
  }
`;

export { Main };
