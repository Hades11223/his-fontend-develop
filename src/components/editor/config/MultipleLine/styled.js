import styled from "styled-components";

const Main = styled("div")`
  min-height: ${(props) => props.minHeight || 0}px;
  ${(props) =>
    props.showMarkSpanRow &&
    (!props.disabled || props.readonly) &&
    `line-height: ${props.lineHeight}px;
    background:
   url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 6 6"><circle cx="3" cy="3" r="0.4" fill="black" /></svg>');
     background-position-y: ${7}px;


-webkit-background-size: 5px ${props.lineHeight}px;
-moz-background-size: 5px ${props.lineHeight}px;
-ms-background-size: 5px ${props.lineHeight}px;
-o-background-size: 5px ${props.lineHeight}px;
background-size: 5px ${props.lineHeight}px;

    `}

  @media print {
    /* background: none !important; */
  }
`;

export { Main };
