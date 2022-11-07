import styled from "styled-components";

export const Main = styled("div")`
  padding: 10px;
`;
export const InputSearch = styled("div")`
  display: flex;
  align-items: center;
  border-radius: 8px;
  border: ${(props) =>
    props.error
      ? "1px solid red"
      : !props.focus
      ? "2px solid #c5cad3"
      : "1px solid #0762f7 "};
  padding: 2px;
  box-shadow: ${(props) =>
    props.error
      ? "0 0 0 2px rgb(255 77 79 / 20%)"
      : !props.focus
      ? ""
      : "0 0 0 3px #0062ff47 !important"};
  transition: all 0.1s;
  :hover {
    border: ${(props) =>
      props.error ? "1px solid #red" : "1px solid #0762f7"};
    box-shadow: ${(props) =>
      props.error ? "0 0 0 2px rgb(255 77 79 / 20%)" : "0 0 0 3px #0062ff47"};
  }
  & .icon-pass {
    svg {
      height: 20px;
      width: 25px;
    }
  }
  & .ant-input-password,
  & input {
    border: none !important;
    box-shadow: none !important;
    :hover {
      border: none !important;
      box-shadow: none !important;
    }
    :focus {
      border: none !important;
      box-shadow: none !important;
    }
  }
`;
