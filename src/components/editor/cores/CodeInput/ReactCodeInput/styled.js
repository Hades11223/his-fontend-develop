import styled from "styled-components";

const Main = styled("div")`
  display: flex;
  align-items: flex-end;
  & .input-code {
    border-radius: 0px;
    text-align: center;
    padding: 0px;
    height: 80%;
    color: #000 !important;
  }
  & .dots {
    /* font-size: 16px; */
    font-weight: 700;
    line-height: 1;
    /* margin: 0px 3px; */
  }
  & .input-code-disable[disabled] {
    background-color: #fff;
    color: rgba(0, 0, 0, 0.65);
  }
`;

export { Main };
