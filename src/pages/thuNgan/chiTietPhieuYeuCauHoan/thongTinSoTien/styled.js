import styled from "styled-components";
export const Main = styled.div`
  background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.95),
      rgba(255, 255, 255, 0.95)
    ),
    #0762f7;
  padding: 10px;
  & .title {
    font-weight: bold;
    font-size: 16px;
    color: #172b4d;
    line-height: 24px;
  }
  & .row-money {
    padding: 5px;
    border-bottom: 1px solid #d7dbe4;
    display: flex;
    justify-content: space-between;
    .money {
      font-weight: 700;
      color: red;
    }
  }
`;
