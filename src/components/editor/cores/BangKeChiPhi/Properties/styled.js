import styled from "styled-components";

const Main = styled("div")`
  margin-bottom: 10px;
  & .tb-contain {
    & .tb-row {
      display: flex;
    }

    & .tb-col {
      border: solid 1px #000000;
      width: 12px;
      height: 12px;
      margin: 3px;
    }

    & .col-active {
      border-color: #52c41a;
    }
  }

  & .radio-type {
    & .ant-radio-wrapper {
      display: block;
    }
  }
`;

export { Main };
