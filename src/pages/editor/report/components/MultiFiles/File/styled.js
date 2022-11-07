import styled from "styled-components";

const Main = styled.div`
  ${(props) => (props.width ? `max-width: ${props.width}px` : ``)};
  margin-left: auto !important;
  margin-right: auto !important;
`;

export { Main };
