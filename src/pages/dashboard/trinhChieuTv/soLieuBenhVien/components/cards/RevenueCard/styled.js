import styled, { keyframes } from "styled-components";

const animation_appear = keyframes`
0% {
  transform: translate(calc(100vw * 50 / 3840), 0);
}
100% {

}
`;

export const RevenueCardStyled = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: calc(16 / 3840 * 100vw);
  animation: ${animation_appear} 200ms ease-in-out;
  width: ${({ customWidth }) => customWidth};
  overflow: hidden;
  :hover {
    .hover-mask {
      display: flex;
    }
  }
  .hover-mask {
    display: none;
    position: absolute;
    pointer-events: none;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(86, 204, 242, 0.1);
  }
  > div {
    flex: 1;
  }
  .title {
    font-weight: 900;
    font-size: calc(48 / 3840 * 100vw);
    line-height: calc(53 / 3840 * 100vw);
    color: #ffffff;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .value {
    font-weight: 900;
    font-size: calc(107 / 3840 * 100vw);
    line-height: calc(146 / 3840 * 100vw);
    color: #56ccf2;
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    &.currency {
      font-size: calc(47 / 3840 * 100vw);
      line-height: calc(64 / 3840 * 100vw);
    }
  }
  .percent {
    font-weight: 900;
    font-size: calc(60 / 3840 * 100vw);
    line-height: calc(82 / 3840 * 100vw);
    color: #27ae60;
  }
  .chart-wrapper {
    width: calc(60 / 3840 * 100vw);
    height: calc(60 / 3840 * 100vw);
  }
  .percent-wrapper {
    display: flex;
    flex-direction: row;
  }
`;
