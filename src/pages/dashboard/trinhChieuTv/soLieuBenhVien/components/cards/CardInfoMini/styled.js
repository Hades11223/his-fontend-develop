import React from "react";
import styled from "styled-components";

export const noTrendIcon = () => (
  <svg
    width={window.innerWidth / 106}
    height={window.innerWidth / 106}
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M31.5 19.5H4.5C3.675 19.5 3 18.825 3 18C3 17.175 3.675 16.5 4.5 16.5H31.5C32.325 16.5 33 17.175 33 18C33 18.825 32.325 19.5 31.5 19.5Z"
      fill="#1C75BC"
    />
    <path
      d="M31.5 19.5H4.5C3.675 19.5 3 18.825 3 18C3 17.175 3.675 16.5 4.5 16.5H31.5C32.325 16.5 33 17.175 33 18C33 18.825 32.325 19.5 31.5 19.5Z"
      fill="white"
      fillOpacity="0.5"
    />
  </svg>
);

export const upTrendIcon = () => (
  <svg
    width={window.innerWidth / 106}
    height={window.innerWidth / 106}
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M24 9L27.435 12.435L20.115 19.755L14.115 13.755L3 24.885L5.115 27L14.115 18L20.115 24L29.565 14.565L33 18V9H24Z"
      fill="#27AE60"
    />
  </svg>
);

export const downTrendIcon = () => (
  <svg
    width={window.innerWidth / 106}
    height={window.innerWidth / 106}
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M24 27L27.435 23.565L20.115 16.245L14.115 22.245L3 11.115L5.115 9L14.115 18L20.115 12L29.565 21.435L33 18V27H24Z"
      fill="#EB5757"
    />
  </svg>
);

export const CardInfoMiniStyled = styled.div`
  width: 7.890625vw;
  height: 7.39583333333vw;
  display: flex;
  flex-direction: column;
  padding: 0.41666666666vw;
  position: relative;
  @media all and (max-width: 1367px) {
    padding: 0.5em;
  }
  :hover {
    transform: scale(0.9);
    transition-duration: 200ms;
  }
  .title {
    flex: 1;
    font-style: normal;
    font-weight: 900;
    font-size: 0.91145833333vw;
    line-height: 1.25vw;
    color: var(--text); //#ffffff
    @media all and (max-width: 1921px) {
      font-size: 0.75vw;
    }
  }
  .value {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    .value-text {
      font-weight: 900;
      font-size: 2vw;
      line-height: 3vw;
      color: var(--text); //#ffffff
    }
    .percent {
      flex: 1;
      display: flex;
      flex-direction: column;
      width: 100%;
      justify-content: flex-end;
      align-items: flex-end;
      align-content: center;
      &.no-trend {
        color: #1c75bc !important;
      }
      &.up-trend {
        color: #27ae60 !important;
      }
      &.down-trend {
        color: #eb5757 !important;
      }
      .trend-icon {
        flex: 1;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        .percent-value-text {
          font-weight: 900;
          font-size: 0.83333333333vw;
          line-height: 1.14583333333vw;
          text-align: right;
        }
      }
      .count-number {
        display: flex;
        justify-content: flex-end;
        font-weight: 400;
        font-size: 0.625vw;
        line-height: 0.859375vw;
        text-align: right;
      }
    }
  }
`;
