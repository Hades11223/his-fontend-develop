import styled from "styled-components";

export const Main = styled.div`
  :root {
    --size: 75px;
    --clr-bg: #272324;
    --clr1: #bbbb88;
    --clr2: #ccc68d;
    --clr3: #eedd99;
    --clr4: #eec290;
    --clr5: #eeaa88;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  .container {
    margin-top: 7rem;
    margin-bottom: 7rem;
    display: grid;
    grid-template-columns: repeat(2, auto);
    place-items: center;
    gap: 7rem;
  }

  @media (min-width: 600px) {
    .container {
      grid-template-rows: repeat(2, auto);
      grid-template-columns: repeat(3, auto);
    }
  }

  .spinner:nth-child(1) {
    --animation-duration: 1000ms;

    width: var(--size);
    height: var(--size);
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    .spinner-item {
      width: calc(var(--size) / 12);
      height: 80%;
      background: var(--clr-spinner);
      animation: spinner1 var(--animation-duration) ease-in-out infinite;

      @keyframes spinner1 {
        50% {
          transform: scaleY(0.25);
        }
      }
    }

    .spinner-item:nth-child(1) {
      --clr-spinner: var(--clr1);
      animation-delay: calc(var(--animation-duration) / 10 * -3);
    }

    .spinner-item:nth-child(2) {
      --clr-spinner: var(--clr5);
      animation-delay: calc(var(--animation-duration) / 10 * -1);
    }

    .spinner-item:nth-child(3) {
      --clr-spinner: var(--clr3);
      animation-delay: calc(var(--animation-duration) / 10 * -2);
    }

    .spinner-item:nth-child(4) {
      --clr-spinner: var(--clr4);
      animation-delay: calc(var(--animation-duration) / 10 * -1);
    }

    .spinner-item:nth-child(5) {
      --clr-spinner: var(--clr2);
      animation-delay: calc(var(--animation-duration) / 10 * -3);
    }
  }

  .spinner:nth-child(2) {
    --animation-duration: 650ms;
    position: relative;
    width: var(--size);
    height: var(--size);

    .spinner-item {
      position: absolute;
      width: var(--item-size);
      height: var(--item-size);
      top: calc(50% - var(--item-size) / 2);
      left: calc(50% - var(--item-size) / 2);
      border: 4px solid transparent;
      border-left: 4px solid var(--clr-spinner);
      border-right: 4px solid var(--clr-spinner);
      border-radius: 50%;
      animation: spinner2 var(--animation-duration) linear infinite;

      @keyframes spinner2 {
        to {
          transform: rotate(360deg);
        }
      }
    }

    .spinner-item:nth-of-type(1) {
      --item-size: var(--size);
      --clr-spinner: var(--clr1);
      border-top: 4px solid var(--clr1);
    }

    .spinner-item:nth-of-type(2) {
      --item-size: calc(var(--size) - 15px);
      --clr-spinner: var(--clr5);
      border-bottom: 4px solid var(--clr5);
    }

    .spinner-item:nth-of-type(3) {
      --item-size: calc(var(--size) - 30px);
      --clr-spinner: var(--clr3);
      border-top: 4px solid var(--clr3);
    }
  }

  .spinner:nth-child(3) {
    --animation-duration: 5000ms;
    position: relative;
    width: var(--size);
    height: var(--size);
    transform: rotate(45deg);

    .spinner-item {
      --item-size: calc(var(--size) / 2.5);
      position: absolute;
      width: var(--item-size);
      height: var(--item-size);
      border: 4px solid var(--clr-spinner);
    }

    .spinner-item:nth-child(1) {
      --clr-spinner: var(--clr1);
      top: 0;
      left: 0;
      animation: spinner3A var(--animation-duration) linear infinite;

      @keyframes spinner3A {
        0%,
        8.33%,
        16.66%,
        100% {
          transform: translate(0%, 0%);
        }

        24.99%,
        33.32%,
        41.65% {
          transform: translate(100%, 0%);
        }

        49.98%,
        58.31%,
        66.64% {
          transform: translate(100%, 100%);
        }

        74.97%,
        83.30%,
        91.63% {
          transform: translate(0%, 100%);
        }
      }
    }

    .spinner-item:nth-child(2) {
      --clr-spinner: var(--clr3);
      top: 0;
      left: var(--item-size);
      animation: spinner3B var(--animation-duration) linear infinite;

      @keyframes spinner3B {
        0%,
        8.33%,
        91.63%,
        100% {
          transform: translate(0%, 0%);
        }

        16.66%,
        24.99%,
        33.32% {
          transform: translate(0%, 100%);
        }

        41.65%,
        49.98%,
        58.31% {
          transform: translate(-100%, 100%);
        }

        66.64%,
        74.97%,
        83.30% {
          transform: translate(-100%, 0%);
        }
      }
    }

    .spinner-item:nth-child(3) {
      --clr-spinner: var(--clr5);
      top: var(--item-size);
      left: var(--item-size);
      animation: spinner3C var(--animation-duration) linear infinite;

      @keyframes spinner3C {
        0%,
        83.30%,
        91.63%,
        100% {
          transform: translate(0, 0);
        }

        8.33%,
        16.66%,
        24.99% {
          transform: translate(-100%, 0);
        }

        33.32%,
        41.65%,
        49.98% {
          transform: translate(-100%, -100%);
        }

        58.31%,
        66.64%,
        74.97% {
          transform: translate(0, -100%);
        }
      }
    }
  }

  .spinner:nth-child(4) {
    --animation-duration: 1150ms;

    .spinner-item {
      --item-size: calc(var(--size) / 4);
      width: var(--item-size);
      height: var(--item-size);
      display: inline-block;
      margin: 0 3px;
      border-radius: 50%;
      border: 4px solid var(--clr-spinner);
      animation: spinner4 var(--animation-duration) ease-in-out infinite;

      @keyframes spinner4 {
        0%,
        100% {
          transform: translateY(75%);
        }

        50% {
          transform: translateY(-75%);
        }
      }
    }

    .spinner-item:nth-child(1) {
      --clr-spinner: var(--clr5);
      animation-delay: calc(var(--animation-duration) / 6 * -1);
    }

    .spinner-item:nth-child(2) {
      --clr-spinner: var(--clr3);
      animation-delay: calc(var(--animation-duration) / 6 * -2);
    }

    .spinner-item:nth-child(3) {
      --clr-spinner: var(--clr1);
      animation-delay: calc(var(--animation-duration) / 6 * -3);
    }
  }

  .spinner:nth-child(5) {
    --animation-duration: 1000ms;
    width: var(--size);
    height: var(--size);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;

    .spinner-item {
      height: 40%;
      background-color: var(--clr-spinner);
      width: calc(var(--size) / 13);
      animation: spinner5 var(--animation-duration) ease-in-out infinite;

      @keyframes spinner5 {
        25% {
          transform: scaleY(2);
        }

        50% {
          transform: scaleY(1);
        }
      }
    }

    .spinner-item:nth-child(1) {
      --clr-spinner: var(--clr1);
    }

    .spinner-item:nth-child(2) {
      --clr-spinner: var(--clr3);
      animation-delay: calc(var(--animation-duration) / 10);
    }

    .spinner-item:nth-child(3) {
      --clr-spinner: var(--clr5);
      animation-delay: calc(var(--animation-duration) / 10 * 2);
    }

    .spinner-item:nth-child(4) {
      --clr-spinner: var(--clr4);
      animation-delay: calc(var(--animation-duration) / 10 * 3);
    }

    .spinner-item:nth-child(5) {
      --clr-spinner: var(--clr2);
      animation-delay: calc(var(--animation-duration) / 10 * 4);
    }
  }

  .spinner:nth-child(6) {
    --animation-duration: 3000ms;
    position: relative;
    width: var(--size);
    height: var(--size);

    .spinner-item {
      position: absolute;
      top: calc(50% - var(--size) / 2);
      left: calc(50% - var(--size) / 2);
      width: var(--size);
      height: var(--size);
      background: var(--clr-spinner);
      border-radius: 50%;
      animation: spinner6 var(--animation-duration) ease-in-out infinite;

      @keyframes spinner6 {
        0%,
        100% {
          transform: scale(0.25);
          opacity: 1;
        }

        50% {
          transform: scale(1);
          opacity: 0;
        }
      }
    }

    .spinner-item:nth-of-type(1) {
      --clr-spinner: var(--clr1);
    }

    .spinner-item:nth-of-type(2) {
      --clr-spinner: var(--clr5);
      animation-delay: calc(var(--animation-duration) / -2);
    }
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .loading-chart {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    min-height: 350px;
  }

  .loading-chart img {
    animation: rotate 1200ms infinite;
  }

  .loading-card {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    height: 100%;
    min-height: 350px;
    padding-right: 1.5em;
  }

  .loading-card img {
    animation: rotate 1200ms infinite;
  }
`;
