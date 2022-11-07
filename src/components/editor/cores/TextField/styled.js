import styled from "styled-components";

const Main = styled("div")`
  background-color: ${(props) => (props.focusing ? "#E6F7FF" : "")};
  font-size: ${(props) => props.fontSize || 12}pt;
  min-height: ${(props) => props.minHeight}px;
  ${(props) =>
    props.fontWeight &&
    `
    font-weight: bold;
  `}
  ${(props) =>
    props.border &&
    `
    border: 1px solid black;
  `}
  ${(props) =>
    props.showMarkSpanRow &&
    (props.mode == "config" || !props.disabled) &&
    `line-height: ${props.lineHeight}px;
    background:
   url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 6 6"><circle cx="3" cy="3" r="0.4" fill="black" /></svg>') 
   ${props.lineHeight}px;
     background-position-y: 7px;


-webkit-background-size: 5px ${props.lineHeight}px;
-moz-background-size: 5px ${props.lineHeight}px;
-ms-background-size: 5px ${props.lineHeight}px;
-o-background-size: 5px ${props.lineHeight}px;
background-size: 5px ${props.lineHeight}px;

`}
  & > div {
    ${(props) =>
      props.contentAlign != "left" &&
      `
    display: flex;
& > span:last-child{
  flex: 1;
  & > span{
    display: block;
    width: 100% !important;
  }
}

    `}
  }

  ${(props) =>
    props.contentAlign != "left" &&
    props.mode == "config" &&
    `
    display: flex;
& > span:last-child{
  flex: 1;
  & > span{
    display: block;
    width: 100% !important;
  }
}

    `}

  & .text-field-label {
    display: inline-block;
    background: #fff;
    & .edit-contain {
      display: inline-block;
    }
  }

  @media print {
    background: none !important;
  }

  & .text-field-label:after {
    content: "";
    margin-right: 6px;
  }
`;

export { Main };
