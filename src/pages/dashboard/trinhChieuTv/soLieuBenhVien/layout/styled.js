import styled, { keyframes } from "styled-components";

const defaultFontSize = "0.83vw"; // 16px
const titleTextFontSize = "1.25vw"; // 24
const titleTextLineHeight = "1.71875vw"; //33px;

const appearAnim = keyframes`
0% {
  opacity: 0;
}
100% {
  opacity: 1;
}
`;

export const TVShowLayoutStyled = styled.div`
  padding-bottom: 0;
  position: fixed;
  z-index: 20;
  width: 100vw;
  height: 100vh;
  background: var(--layout); //#333333
  animation: ${appearAnim} 2s ease-in-out;
  top: 0;
  left: 0;
  margin: 0;
  .layer-1-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    .layer-1 {
      position: absolute;
      width: 100%;
      height: 100%;
      background-image: #172b4d;
      background-size: cover;
      filter: blur(272px);
      z-index: 21;
    }
    .content-wrap {
      width: 100%;
      height: 100%;
      position: absolute;
      display: flex;
      flex-direction: column;
      z-index: 22;
      .header {
        width: 100%;
        /* height: calc(100vh * 160 / 2160); */
        height: 80px;
        padding: 1.04166666667vw;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        background: #ffffff;
        box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.1);

        .ant-picker {
          background: transparent;
          border: 2px solid var(--border-picker); //#56ccf2
          border-radius: 0.183vw;
          background: #eff7fe;
          margin: 16px 0 16px 16px;
          .ant-picker-input {
            font-size: 1.04166666667vw;
            input {
              font-weight: 600;
              font-size: 1.04166666667vw;
              line-height: 1.43229166667vw;
              /* color: var(--text); */
              color: #647589;
            }
            .ant-picker-suffix {
              span {
                /* color: var(--border-picker); //#ffffff */
                color: #647589;
              }
            }
          }
          span {
            color: #ffffff;
          }
          span:hover {
            background: transparent;
          }
        }
        img.refresh-btn-img {
          width: 1.04166666667vw;
          height: 1.04166666667vw;
        }
        .logo {
          display: flex;
          align-items: center;
          .image {
            width: 64px;
            height: 64px;
            border-radius: 50%;
            overflow: hidden;
            cursor: pointer;
          }
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            /* width: 7.1875vw;
            height: 2.08333333333vw; */
          }
          .title-text {
            padding-left: 0.78125vw;
            text-transform: uppercase;
            color: var(--header-text); //#56ccf2
            flex-wrap: nowrap;
            justify-content: center;
            display: flex;
            align-items: center;
            height: 100%;
            font-size: ${titleTextFontSize};
            line-height: ${titleTextLineHeight};
            font-weight: 900;
          }
        }
        .refresh-with-timer {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
          gap: 16px;
          button {
            width: 3rem !important;
            height: 3rem !important;
            border-radius: 50%;
            background: #eff7fe;
            display: flex;
            align-items: center;
            justify-content: center;
            & > svg > path {
              fill: #1ab69d;
            }
          }
          .filter-date {
            display: flex;
            flex-direction: row;
            align-items: center;
            .caret-left,
            .caret-right {
              cursor: pointer;
              width: 0;
              height: 0;
              border-top: 0.390625vw solid transparent;
              border-bottom: 0.390625vw solid transparent;
            }
            .caret-left {
              /* border-right: 0.78125vw solid var(--border-picker); //#ffffff */
              border-right: 0.78125vw solid #1ab69d;
            }
            .caret-right {
              margin-left: 16px;
              /* border-left: 0.78125vw solid var(--border-picker); //#ffffff */
              border-left: 0.78125vw solid #1ab69d;
            }
          }
          > span {
            font-style: normal;
            font-weight: 650;
            /* color: var(--text); //#ffffff */
            color: #1ab69d;
            font-size: 1.25vw;
            line-height: 1.69270833333vw;
          }
          > .time-label {
            font-style: normal;
            font-weight: 400;
            color: var(--text2); //#56ccf2
          }

          > button {
            width: fit-content;
            height: fit-content;
            cursor: pointer;
          }
          > button:hover {
            border: solid 1px rgba(255, 255, 255, 0.2);
          }
        }
      }
      .tv-content {
        width: 100%;
        padding: 1.04166666667vw;
        height: ${(p) =>
          p.useFixContent ? "calc(100% - (100vh * 160 / 2160))" : "100%"};
        margin: 0;
        padding-bottom: 2vw;
        display: flex;
        align-items: stretch;
        align-content: stretch;
        flex-direction: column;
        background: #eff7fe;
        div.tv-row {
          flex: 1 0 30%;
          display: flex;
          /* gap: 10px; */
          flex-direction: row;
          padding: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          > div {
            flex: 1 0 calc(100% / 5);
            overflow: hidden;
            width: 100%;
            height: 100%;
          }
        }
      }
      .footer {
        width: 100%;
        padding: calc(100vw / 3840 * 8);
        text-align: center;
        align-items: center;
        display: flex;
        justify-content: center;
        position: absolute;
        bottom: 0;
        > span {
          font-style: normal;
          font-weight: 400;
          color: var(--text); //#ffffff
          font-size: 0.625vw;
          line-height: 0.859375vw;
        }
        img {
          width: 3.79166666667vw;
          height: auto;
        }
      }
    }

    .lite-row {
      display: flex;
      width: 100%;
    }
    .btn-top-right {
      padding: 4px 8px;
      path {
        fill: var(--header-text);
      }
    }
  }
`;
