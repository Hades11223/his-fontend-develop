import styled from "styled-components";

const Main = styled("div")`
  display: flex;
  background-color: ${(props) => (props.focusing ? "#E6F7FF" : "")};
  min-height: 24px;

  & .text-field-label {
    display: flex;
  }

  & .text-field-label:after {
    content: "";
    margin-right: 6px;
  }
`;

export { Main };
