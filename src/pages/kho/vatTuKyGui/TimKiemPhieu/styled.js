import styled, { createGlobalStyle } from "styled-components";
export const Main = styled.div`
  .array-store {
    display: flex;
    padding-top: 5px;

    .item {
      background: linear-gradient(
          0deg,
          rgba(255, 255, 255, 0.75),
          rgba(255, 255, 255, 0.75)
        ),
        #0762f7;
      border-radius: 3px;
      margin-right: 6px;
      min-width: 100px;
      padding: 0px 5px 0px 5px;
      display: flex;
      & span {
        flex: 1;
      }
      img {
        object-fit: contain;
        margin-left: 5px;
        width: 12px;
      }
    }
  }
`;
