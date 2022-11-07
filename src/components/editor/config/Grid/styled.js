import styled from "styled-components";

const Main = styled("div")`
  display: flex;
  width: 100%;
  flex-direction: column;
  color: #000;
  position: relative;

  & > .action-line {
    height: 0px;
    opacity: 0;
    visibility: hidden;
    transition: all 0.5s;
  }
`;

export { Main };
