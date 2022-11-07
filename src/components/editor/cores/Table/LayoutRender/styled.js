import styled from "styled-components";

export const Main = styled("table")`
  font-size: ${props=>props.fontSize}pt !important;
  & .in-side-col {
    /* margin-top: -1px;
    margin-bottom: -1px; */
  }
`;
