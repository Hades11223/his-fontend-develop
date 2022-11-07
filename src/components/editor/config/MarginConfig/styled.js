import styled from "styled-components";

const Main = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  & .middle {
    display: flex;
    align-items: center;
    justify-content: center;
    & > div {
      width: 50px;
      height: 40px;
      border: 1px solid gray;
      margin: 10px;
    }
  }
`;

export { Main };
