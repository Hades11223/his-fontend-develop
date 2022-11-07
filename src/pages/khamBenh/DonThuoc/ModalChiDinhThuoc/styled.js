import styled from "styled-components";
export const Main = styled.div`
  padding: 10px;
  & .filter-box {
    display: flex;
    margin-bottom: 8px;
    align-items: center;
    & .filter-item {
      margin-right: 5px;
      margin-left: 2px;
      width: 300px;
    }
    & .setting {
      display: flex;
      & svg.icon {
        width: 20px;
        height: 20px;
      }
    }
  }
`;
