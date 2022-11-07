import styled from "styled-components";

const Main = styled("div")`
  max-width: 100%;

  & .edit-contain {
    outline: none;
  }

  & .resize-contain {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  margin-top: ${(props) =>
    props.itemProps?.marginTop ? props.itemProps?.marginTop + "px" : 0};
  margin-bottom: ${(props) =>
    props.itemProps?.marginBottom ? props.itemProps?.marginBottom + "px" : 0};
  margin-right: ${(props) =>
    props.itemProps?.marginRight ? props.itemProps?.marginRight + "px" : 0};
  margin-left: ${(props) =>
    props.itemProps?.marginLeft ? props.itemProps?.marginLeft + "px" : 0};
`;

export { Main };
