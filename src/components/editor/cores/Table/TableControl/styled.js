import styled from "styled-components";

const Main = styled("div")`
  .tb-control {
    border-collapse: collapse;
  }

  .tb-control td {
    border: solid 1px rgba(0, 0, 0, 0.6);
  }

  .tb-control-item {
    width: 48px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .tb-control-item-focused {
    background-color: #a8f2f1;
  }

  .tb-control-cel-focused {
    border: solid 1px #f5222d;
  }
`;

export { Main };
