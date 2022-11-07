import styled from "styled-components";

const Main = styled("div")`
  font-weight: ${(props) => props.fontWeight};
  ${(props) => (props.fontSize ? `font-size: ${props.fontSize};` : ``)}
  justify-content: ${(props) => props.align};
  text-align: ${(props) => props.align};
  text-transform: ${(props) => props.textTransform};
`;
export { Main };
