import styled from "styled-components";

const Main = styled("div")`
  display: flex;
  justify-content: ${(props) => (props.type === "config" ? "" : "center")};
  margin-bottom: 10px;
`;

export { Main };
