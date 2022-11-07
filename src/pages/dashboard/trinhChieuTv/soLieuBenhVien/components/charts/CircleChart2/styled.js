import styled from "styled-components";

export const CircleChartStyled = styled.div`
  position: relative;
  background: var(--background); //#000e25
  /* margin: 0.21666666666vw; */
  border-radius: 0.83333333333vw;
  width: calc(100% - 2em);

  /* min-height: 15.75vw; */
  ${({ useBackground }) =>
    useBackground ? `background: var(--background);` : ""} //#000E25
  @media all and (max-width: 2561px) {
    font-size: 0.425vw;
  }
  @media all and (max-width: 1367px) {
    font-size: 0.325vw;
  }
  .title {
    font-weight: 900;
    font-size: 1.25vw;
    line-height: 1.69270833333vw;
    color: var(--text); //#ffffff
    padding: 0.5em;
  }
`;

export const LegendStyled = styled.div`
  /* display: flex; */
  flex-direction: row;
  justify-content: center;
  align-items: center;
  /* width: 100%; */
  position: relative;
  float: right;
  .legend-item {
    display: flex;
    margin: 1em;
    .icon {
      width: 0.4vw;
      height: 0.4vw;
      border-radius: 0.2vw;
      margin-right: 0.4vw;
      align-self: center;
    }
    .value-text {
      width: 8vw;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-style: normal;
      font-weight: 400;
      font-size: 0.9875vw;
      line-height: 1.1375vw;
      @media all and (max-width: 1367px) {
        font-size: 0.875vw;
        line-height: 1.0375vw;
      }
      letter-spacing: 0.02083333333vw;
      color: var(--text); //#ffffff
      display: flex;
      flex-direction: row;
      text-align: center;
      align-items: center;
    }
    .value {
      width: 2vw;
    }
    .percent {
      width: 5vw;
    }
    .percent,
    .value {
      padding-left: 0.46875vw;
      font-style: normal;
      font-weight: 900;
      font-size: 0.9875vw;
      @media all and (max-width: 1367px) {
        font-size: 0.875vw;
        line-height: 1.0375vw;
      }
      line-height: 1.1375vw;
      letter-spacing: 0.02083333333vw;
      color: var(--text); //#ffffff
    }
  }
  .pagination {
    position: relative;
  }
`;
