import styled from "styled-components";
export const Main = styled("div")`
  & .header {
    display: flex;
    margin-bottom: 8px;
    align-items: center;
    & .left-area {
      font-weight: bold;
      font-size: 18px;
      line-height: 23px;
      text-transform: uppercase;
      color: #125873;
      flex: 1;
    }
    & .right-area {
    }
  }
`;
