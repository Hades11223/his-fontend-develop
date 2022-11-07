import styled, { createGlobalStyle, keyframes } from "styled-components";
export const GlobalStyle = createGlobalStyle`

  body{
    position: relative;
  }

   & .ant-message {
    /* position: fixed;
    top: calc(100vh - 10px);
    right: 5px; */
    display: flex;
    height: 100%;
    flex-direction: column-reverse;
    align-items: end;
      .ant-message-notice-content{
        box-shadow: none;
        background: none;
        padding:5px 16px;
      }
      .ant-message-custom-content{
        min-width: 290px;
      }
      & .ant-message-notice{
        /* position: absolute; */
        bottom: 0;
        right: 0;
        .ant-message-error{
        text-align: left;
        border-radius: 5px;
        color: #fff;
        padding: 15px;
        background: #fc3b3a;
      }
      .ant-message-success{
        text-align: left;
        border-radius: 5px;
        border: 5px;
        color: #fff;
        padding: 15px;
        background: #049254;
        &:hover{
          box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        }
      }
      .ant-message-warning{
        text-align: left;
        border-radius: 5px;
        border: 5px;
        color: #fff;
        padding: 15px;
        background: #fe8803;
        &:hover{
          box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        }
      }
        svg{
            fill: #fff;
          }
        }
    }
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const leftToRight = keyframes`
  0% {
    transform: translateX(500px);
  }
  100% {
    transform: translateX(0);
  }
`;

export const Main = styled("div")`
  & .fadeIn {
    animation: 0.5s ${fadeIn} ease-out;
  }
  & .leftToRight {
    animation: ${leftToRight} 1s 1;
    /* animation-direction: alternate-reverse; */
  }

  & .hideScrollbar {
    &::-webkit-scrollbar {
      display: none;
    }

    /* Hide scrollbar for IE, Edge and Firefox */
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }

  & .flex {
    display: flex;
    & .flex-center {
      justify-items: center;
      align-items: center;
    }
    & .flex1 {
      flex: 1;
    }
  }

  & .app-header {
    background-color: #125872;
    height: 60px;
  }

  & .language-contain {
    display: flex;
    align-items: center;
  }

  & .language-title {
    color: rgba(255, 255, 255, 0.85);
    margin-left: 6px;
  }

  & .app-sider {
    background-color: #094359;

    & .ant-layout-sider-trigger {
      background-color: #125872;
    }
  }

  & .inpatient-sider {
    background-color: transparent;
  }

  & .layout-header {
    border-bottom: 3px solid #dedede;
  }
  & .ant-layout-content {
    height: calc(100vh - 60px);
  }

  .transition-ease {
    transition: all 0.5s ease;
    will-change: auto;
  }

  .d-flex {
    display: flex;
  }

  .justify-content-center {
    justify-content: center;
  }

  .align-items-center {
    align-items: center;
  }

  .justify-content-flex-end {
    justify-content: flex-end;
  }

  .justify-content-flex-start {
    justify-content: flex-start;
  }

  .text-center {
    text-align: center;
  }

  .text-left {
    text-align: left;
  }

  .text-right {
    text-align: right;
  }
  .suspense-loading-screen {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    .ant-spin-text {
      color: red;
      font-weight: bold;
      font-size: 16px;
    }
  }
`;
