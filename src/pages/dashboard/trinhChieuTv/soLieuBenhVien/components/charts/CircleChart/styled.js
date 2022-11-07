import styled from "styled-components";

export const CircleChartStyled = styled.div`
  position: relative;
  background: var(--background); //#000e25
  /* margin: 0.41666666666vw; */
  border-radius: 0.83333333333vw;
  /* width: calc(100% - 2em); */
  padding: 0.41666666666vw;
  min-height: 15.75vw;
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
    margin-bottom: 0.5em;
  }
  .recharts-responsive-container {
    margin: 0 !important;
  }
`;

export const LegendStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  bottom: 0;
  height: 100px;
  .legend-item {
    display: flex;
    flex-direction: column;
    &:not(:last-child) {
      border-bottom: 1px solid rgba(34, 54, 69, 0.1);
    }
    padding: 0.4285714285714286rem;
    .value-text {
      display: flex;
      font-style: normal;
      align-items: center;
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
      .icon {
        /* width: 0.20833333333vw; */
        /* height: 0.20833333333vw; */
        /* border-radius: 0.10416666666vw; */

        width: 1rem;
        height: 1rem;
        border-radius: 50%;
      }
    }
    .percent-wrapper {
      display: flex;
      justify-content: space-between;
    }
    .percent,
    .value {
      /* padding-left: 0.46875vw; */
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
`;
