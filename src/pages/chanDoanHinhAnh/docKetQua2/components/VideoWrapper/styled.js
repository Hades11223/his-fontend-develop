import styled from "styled-components";

export const Main = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  .item {
    width: 48%;
    height: 160px;
    border: 1px solid #999999;
    border-radius: 10px;
    .thumb {
      width: 100%;
      height: 160px;
      object-fit: contain;
    }
  }
`;