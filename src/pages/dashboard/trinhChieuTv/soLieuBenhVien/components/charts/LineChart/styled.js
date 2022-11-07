import styled from "styled-components";

export const LineChartStyled = styled.div`
  padding: 0.41666666666vw;
  background: #ffffff;
  width: 100%;
  height: 100%;
  border-radius: 6px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  .title {
    font-weight: 900;
    font-size: 0.91145833333vw;
    line-height: 1.25vw;
    color: var(--text); //#ffffff
    margin-bottom: 0.5em;
  }
  .recharts-cartesian-grid-horizontal {
    & > line:last-child,
    & > line:first-child {
      display: none;
    }
  }
  .recharts-layer .recharts-area-dots {
    & > g:first-child,
    & > g:last-child {
      display: none;
    }
  }
  .recharts-layer .recharts-label-list {
    & > text:first-child,
    & > text:last-child {
      display: none;
    }
  }
  .recharts-xAxis > .recharts-cartesian-axis-ticks {
    & > g:first-child,
    & > g:last-child {
      display: none;
    }
  }
  .recharts-layer .recharts-cartesian-axis-tick > line {
    display: none;
  }
  .recharts-cartesian-axis-tick-value {
    fill: #647589;
  }
`;
