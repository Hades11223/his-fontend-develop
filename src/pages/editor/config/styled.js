import styled from "styled-components";

const Main = styled("div")`
  background-color: #fff;
  height: 100%;
  overflow: hidden;

  & .layout-body {
    display: flex;
    width: 100%;
    height: 100%;
    position: relative;

    & .layout-middle {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      & .ant-spin-container {
        height: 100%;
        & > div {
          height: 100%;
          overflow-x: auto;
          overflow-y: hidden;
        }
      }
      @media (max-width: 1300px) {
        margin-right: 55px !important;
        overflow: hidden;
      }
      @media (max-width: 600px) {
        margin-right: 55px !important;
      }
      @media (max-width: 450px) {
        margin-right: 55px !important;
      }
      & .ant-spin-nested-loading {
        flex: 1;
        height: 100%;
      }
    }

    & .layout-right-side {
      &.expand {
        width: 400px;
        transition: width 0.3s linear;
        & .properties-contain {
          display: flex;
        }
        & .properties-label {
          display: none;
        }
      }
      &.collape {
        width: 56px;
        transition: width 0.3s linear;
        & .properties-contain {
          display: none;
        }
        & .properties-label {
          width: 200px;
          display: block;
          transform-origin: 0 0;
          transform: rotate(90deg);
          margin-left: 23px !important;
        }
      }

      border-left: solid 2px #dedede60;
      overflow: auto;
      background: #fff;
      box-shadow: 0px 0px 15px rgba(9, 30, 66, 0.07);
      & .header {
        align-items: center;
        display: flex;
        & button.expand {
          margin-right: 5px;
          line-height: 1.5;
          & i {
            line-height: 1.5;
          }
        }
      }
      @media (max-width: 1300px) {
        position: fixed;
        bottom: 0;
        right: 0;
        top: 42px;
        z-index: 103;
      }
      /* @media (max-width: 600px) {
        margin-right: 60px;
      }
      @media (max-width: 450px) {
        margin-right: 50px;
      } */
      & > .ant-card {
        height: 100%;
        display: flex;
        flex-direction: column;
        & > .ant-card-body {
          overflow: hidden;
          flex: 1;
        }
      }
    }
  }
`;

export { Main };
