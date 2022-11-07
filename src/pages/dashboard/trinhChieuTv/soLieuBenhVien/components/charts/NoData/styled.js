import styled from "styled-components";

export const ChartNoDataContentStyled = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex: 1;
  > div {
    color: white;
    font-style: normal;
    font-weight: 700;
    font-size: 1vw;
    line-height: 1.2vw;
    color: #ffffff;
  }
  .text-extend {
    font-weight: 400;
  }
  .message {
    text-align: center;
    color: var(--text);
  }
`;
