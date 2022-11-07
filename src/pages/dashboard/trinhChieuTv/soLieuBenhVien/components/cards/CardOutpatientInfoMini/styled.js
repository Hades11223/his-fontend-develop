import React from "react";
import { Tooltip } from "antd";
import styled from "styled-components";

export const noTrendIcon = () => (
  <svg
    width={(window.innerWidth * 64) / 3840}
    height={(window.innerWidth * 65) / 3840}
    viewBox="0 0 64 65"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M55.9997 35.1673H7.99967C6.53301 35.1673 5.33301 33.9673 5.33301 32.5007C5.33301 31.034 6.53301 29.834 7.99967 29.834H55.9997C57.4663 29.834 58.6663 31.034 58.6663 32.5007C58.6663 33.9673 57.4663 35.1673 55.9997 35.1673Z"
      fill="#7A869A"
    />
  </svg>
);

export const upTrendIcon = () => (
  <svg
    width={(window.innerWidth * 64) / 3840}
    height={(window.innerWidth * 65) / 3840}
    viewBox="0 0 64 65"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M42.6663 16.5L48.773 22.6067L35.7597 35.62L25.093 24.9533L5.33301 44.74L9.09301 48.5L25.093 32.5L35.7597 43.1667L52.5597 26.3933L58.6663 32.5V16.5H42.6663Z"
      fill="#27AE60"
    />
  </svg>
);

export const downTrendIcon = () => (
  <svg
    width={(window.innerWidth * 65) / 3840}
    height={(window.innerWidth * 65) / 3840}
    viewBox="0 0 65 65"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M43.1663 48.5L49.273 42.3933L36.2597 29.38L25.593 40.0467L5.83301 20.26L9.59301 16.5L25.593 32.5L36.2597 21.8333L53.0597 38.6067L59.1663 32.5V48.5H43.1663Z"
      fill="#EB5757"
    />
  </svg>
);

export const CardOutpatientInfoStyled = styled.div`
  cursor: ${({ haveTooltip }) => (haveTooltip ? "pointer" : "text")};
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  .card-tv-row {
    display: flex;
    flex: 1;
    flex-direction: row;
    width: 100%;
    position: relative;
    &.absolute-bottom {
      position: absolute;
      bottom: calc(10 * 100vw / 3840);
      padding: 0;
      margin: 0;
    }
    > div {
      flex: 1;
      :first-child {
        flex-grow: 2;
        justify-content: ${({ secondPercent }) =>
          secondPercent ? "flex-start" : "center"};
      }
      :last-child {
        justify-content: flex-end;
      }
    }
    .value {
      font-weight: 900;
      font-size: calc(100 / 3840 * 100vw);
      line-height: calc(135 / 3840 * 100vw);
      color: var(--text4); //#56ccf2;
      white-space: nowrap;
      @media all and (max-width: 2561px) {
        font-size: calc(100 / 3840 * 100vw);
        line-height: calc(120 / 3840 * 100vw);
      }
      @media all and (max-width: 1921px) {
        font-size: calc(92 / 3840 * 100vw);
        line-height: calc(110 / 3840 * 100vw);
      }
      @media all and (max-width: 1367px) {
        font-size: calc(80 / 3840 * 100vw);
        line-height: calc(92 / 3840 * 100vw);
      }
    }
    .percent {
      display: flex;
      flex-direction: column;
      font-weight: 900;
      font-size: calc(42 / 3840 * 100vw);
      line-height: calc(58 / 3840 * 100vw);
      text-align: right;
      justify-content: flex-end;
      &.no-trend {
        color: #7a869a;
      }
      &.up-trend {
        color: #27ae60;
      }
      &.down-trend {
        color: #eb5757;
      }
      .trend-icon {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
      }
    }
    .second-percent {
      font-weight: 900;
      font-size: calc(42 / 3840 * 100vw);
      line-height: calc(58 / 3840 * 100vw);
      color: #9b51e0;
      align-items: flex-end;
      display: flex;
      @media all and (max-width: 1921px) {
        font-size: calc(36 / 3840 * 100vw);
        line-height: calc(44 / 3840 * 100vw);
      }
      @media all and (max-width: 1367px) {
        font-size: calc(34 / 3840 * 100vw);
        line-height: calc(40 / 3840 * 100vw);
      }
    }
    .count-number {
      padding-right: 0.2em;
    }
    .title-text {
      font-weight: 900;
      font-size: calc(42 / 3840 * 100vw);
      line-height: calc(58 / 3840 * 100vw);
      color: var(--header-text); //#ffffff;
      white-space: unset !important;
      @media all and (max-width: 1921px) {
        font-size: calc(36 / 3840 * 100vw);
        line-height: calc(44 / 3840 * 100vw);
      }
      @media all and (max-width: 1367px) {
        font-size: calc(34 / 3840 * 100vw);
        line-height: calc(40 / 3840 * 100vw);
      }
    }
    .text-auto-running {
      white-space: nowrap;
      text-overflow: hidden;
    }
  }
  .margin-row {
    min-height: calc(100 * 100vw / 3840);
  }
`;

export const TooltipStyled = styled(Tooltip)`
  .tooltip-content-wrap {
    .form:first-child {
      border-top: none;
    }
    .form {
      border-top: solid 1px rgba(0, 0, 0, 0.1);
      padding: 0.5em;
      .title {
        font-weight: 900;
        font-size: calc(42 / 3840 * 100vw);
        line-height: calc(56 / 3840 * 100vw);
        color: #1c75bc;
      }
      .fields-wrap {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        .field {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          .label {
            font-weight: 900;
            font-size: calc(42 / 3840 * 100vw);
            line-height: calc(56 / 3840 * 100vw);
            color: #000000;
            margin-right: 0.5em;
            display: inline-block;
            white-space: nowrap;
          }
          .value {
            font-weight: 400;
            font-size: calc(42 / 3840 * 100vw);
            line-height: calc(56 / 3840 * 100vw);
            color: #000000;
            @media all and (max-width: 1921px) {
              font-size: calc(36 / 3840 * 100vw);
              line-height: calc(42 / 3840 * 100vw);
            }
          }
        }
      }
    }
  }
`;
