import styled from "styled-components";

const Main = styled("div")`
  & .item-main {
  }

  & .add-btn {
    margin-top: 12px;
  }
  & ul {
    padding: 20px;
    & li {
      margin-top: 5px;
      & .item-option {
        display: flex;
        flex-direction: row;
        margin-top: 2px;
        & .option-label {
          min-width: 70px;
        }
        & .option-content {
          flex: 1;
        }
      }
    }
  }
`;

export { Main };
