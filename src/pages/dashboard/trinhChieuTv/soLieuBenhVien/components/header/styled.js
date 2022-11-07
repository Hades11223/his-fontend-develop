import styled from "styled-components";

export const Main = styled.div`
  & .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    position: relative;
    padding: 16px;
    background-color: #ffffff;
    box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.1);

    &__left {
      display: flex;
      align-items: center;
      &-image {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        overflow: hidden;
        display: inline-flex;
        margin-right: 16px;
        & > img {
          width: 100%;
          height: 100%;
          cursor: pointer;
          object-fit: cover;
          display: block;
        }
      }

      &-title {
        display: inline-flex;
        font-weight: 800;
      }
    }
    .header__right {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      gap: 16px;
      .filter-date {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 16px;
        .caret-left,
        .caret-right {
          cursor: pointer;
          width: 0;
          height: 0;
          border-top: 0.390625vw solid transparent;
          border-bottom: 0.390625vw solid transparent;
        }
        .caret-left {
          border-right: 0.78125vw solid #1ab69d;
        }
        .caret-right {
          margin-left: 16px;
          border-left: 0.78125vw solid #1ab69d;
        }
      }
      > span {
        font-style: normal;
        font-weight: 650;
        color: var(--text); //#ffffff
        font-size: 1.25vw;
        line-height: 1.69270833333vw;
      }
      > .time-label {
        font-style: normal;
        font-weight: 400;
      }
      .timer {
        color: #1ab69d;
      }
      & .ant-picker {
        background: #eff7fe;
        border-color: transparent;
      }
      > button {
        cursor: pointer;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: #eff7fe;
        display: flex;
        align-items: center;
        justify-content: center;
        > svg {
          scale: 2.5;
          > path {
            fill: #1ab69d;
          }
        }
      }
      > button:hover {
        border: solid 1px rgba(255, 255, 255, 0.2);
      }
    }
  }
  & .ant-picker-input > input {
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    display: flex;
    align-items: center;
    color: #647589;
  }
`;
