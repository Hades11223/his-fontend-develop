import styled from "styled-components";

const Main = styled("div")`
  display: flex;
  min-width: 30px;
  flex-wrap: wrap;

  & .check-item {
  }

  & .check-item:first-child {
    margin-left: unset;
  }

  & .check-item-focused {
  }

  & .check-box-contain {
    margin-top: ${(props) =>
      props.itemProps?.marginTop ? props.itemProps?.marginTop : 3}px !important;
    margin-bottom: ${(props) =>
      props.itemProps?.marginBottom
        ? props.itemProps?.marginBottom
        : 3}px !important;
    margin-right: ${(props) =>
      props.itemProps?.marginRight
        ? props.itemProps?.marginRight
        : 3}px !important;
    margin-left: ${(props) =>
      props.itemProps?.marginLeft
        ? props.itemProps?.marginLeft
        : 3}px !important;
  }
`;

export { Main };
