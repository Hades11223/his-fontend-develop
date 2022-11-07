import styled from "styled-components";

const Main = styled("div")`
  background-color: ${(props) => (props.focusing ? "#E6F7FF" : "")};
  position: relative;

  & .close-item {
    position: absolute;
    z-index: 1;
    right: 6px;
    top: 3px;
  }
`;
export { Main };
