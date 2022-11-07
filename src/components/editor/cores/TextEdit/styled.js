import styled from "styled-components";

const Main = styled("span")`
  /* display: inline-block; */
  & .edit-contain {
    outline: none;
    overflow: hidden;
  }

  & .resize-contain {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  font-size: 12pt;
`;

export { Main };
