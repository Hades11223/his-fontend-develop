import styled, { keyframes } from "styled-components";

const cardAppearAnim = keyframes`
0% {
  height: 0;
  width: 0;
}
100% {
}
`;

export const CardStyled = styled.div`
  position: relative;
  margin-right: 1.5em;
  margin-bottom: 1em;
  padding: 0.5em;
  background: linear-gradient(
    337.09deg,
    rgba(6, 11, 38, 0.74) 29.7%,
    rgba(26, 31, 55, 0.5) 70.3%
  );
  border-radius: 2em;
  animation: ${cardAppearAnim} 1s ease-in-out;
  :hover {
    border: solid 2px rgba(12, 110, 147, 0.5);
  }
  .ant-table-tbody > tr:hover > td {
    background: unset;
  }
  &.mini {
    width: 18.9375em;
    height: 37.625em;
  }
  &.medium {
    width: 45em;
    height: 77.8125em;
  }
  &.big-width {
    width: 90em;
    height: 37.625em;
  }
  &.medium-height {
    width: 45em;
    height: 37.625em;
    align-self: end;
  }
  .title {
    font-style: normal;
    font-weight: 900;
    font-size: 1.75em;
    line-height: 2.375em;
    color: #ffffff;
  }
  .card-unit {
    font-style: normal;
    font-weight: 900;
    font-size: 1.75em;
    line-height: 0;
    color: #ffffff;
    padding: 0.5em;
  }
  .card-total {
    font-style: normal;
    font-weight: 900;
    font-size: 2.125em;
    line-height: 2.875em;
    color: #ffffff;
  }
  .card-divider {
    background: #1c75bc;
    width: 100%;
    height: 0.25em;
    margin: 2em 0;
  }
  .info {
    .label {
      font-style: normal;
      font-weight: 400;
      font-size: 1.75em;
      line-height: 2.375em;
      color: #ffffff;
      margin-top: 1em;
    }
    .value {
      font-style: normal;
      font-weight: 700;
      font-size: 2.125em;
      line-height: 2em;
      color: #ffffff;
    }
  }
`;
