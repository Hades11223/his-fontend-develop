import styled, { css } from "styled-components";
import bgPage from "assets/images/pagehome/bgPage.png";

const Main = styled.div`
  font-family: Nunito Sans, sans-serif;
  padding: 16px;
  height: 100%;
  width: 100%;
  overflow: auto;
  @media (max-width: 1919px) {
    /* margin: 1.5em; */
    margin: ${(props) => (props.modal ? "1.5em" : "unset")};
  }
  & .page-home {
    height: 100%;
    & > .ant-col {
      height: 100%;
      overflow: hidden;
    }
    & .content-left {
      height: 100%;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      margin: 0;
      margin-right: 16px;
      padding: 40px 30px 20px;
      border-radius: 64px;
      background-repeat: no-repeat;
      background-size: cover;
      background-image: url(${bgPage});
      @media (max-width: 1610px) {
        padding: 32px ​24px 20px;
      }
      @media (max-width: 1414px) {
        padding: ${(props) =>
          props.modal ? "40px 30px 20px" : "5px 13px 22px"};
        background-position: ${(props) =>
          props.modal ? "unset" : "center center"};
        border-radius: ${(props) => (props.modal ? "64px" : "25px")};
      }
      .title {
        font-size: 44px;
        line-height: 60px;
        color: #ffffff;
        padding: 0 30px;
        @media (max-width: 1610px) {
          padding: 0 15px;
        }
        @media (max-width: 1414px) {
          padding: 0 15px;
          font-size: 32px;
          text-align: center;
        }
        @media (max-width: 1200px) {
          font-size: 35px;
        }
      }
      .content-title {
        font-weight: 600;
        font-size: 24px;
        line-height: 33px;
        color: #ffffff;
        padding-bottom: 29px;
        @media (max-width: 1414px) {
          font-size: 18px;
          text-align: center;
        }
      }
      .list-category {
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow-y: scroll;
        margin-bottom: 40px;
        @media (max-width: 1414px) {
          margin-bottom: 35px;
        }
        .box-list-module {
          height: 100%;

          > div {
            &:nth-child(1),
            &:nth-child(2) {
              .item {
                margin-top: 0;
              }
            }
            &:nth-child(2) {
              .item {
                @media (max-width: 767px) {
                  margin-top: 35px;
                }
              }
            }
          }
        }
        .item {
          margin: 40px 30px 0;
          background: #ffffff;
          box-shadow: 0px 8px 16px rgba(17, 17, 17, 0.06);
          border-radius: 16px;

          @media (max-width: 1414px) {
            margin: 35px 15px 0;
          }
          &:hover {
            transform: scale(1.11);
            transition: 0.5s all;
            cursor: pointer;
          }
          &--bg {
            border-bottom: 4px solid #ef4066;
            border-radius: 16px 16px 16px 0;
            height: 183px;
            text-align: center;
            background: #56ccf2;
            @media (max-width: 1919px) {
              height: ${(props) => (props.modal ? "150px" : "100px")};
            }
            img {
              object-fit: cover;
              max-width: 100%;
              height: 100%;
              border-radius: 16px 16px 16px 0;
            }
          }
          &--content {
            display: flex;
            font-weight: bold;
            font-size: 16px;
            line-height: 33px;
            color: #172b4d;
            padding: 17px 20px 13px;
            @media (max-width: 1200px) {
              font-size: 22px;
            }
            @media (max-width: 1919px) {
              padding: ${(props) =>
                props.modal ? "17px 20px 13px" : "5px 20px 5px"};
            }
          }
          &--icon {
            margin-left: auto;
            img {
              max-width: 30px;
            }
          }
        }
      }
    }
  }
`;
const MainNotifi = styled.div`
  height: 100%;
  .content-right {
    height: 100%;
    display: flex;
    flex-direction: column;
    @media (max-width: 991px) {
      margin-top: 1.5em;
    }
    .title {
      font-weight: bold;
      font-size: 24px;
      line-height: 20px;
      color: #172b4d;
      margin-bottom: 29px;
    }
    .ant-collapse {
      font-family: Nunito Sans, sans-serif !important;
      border: none;
      .ant-collapse-item {
        border-radius: 3px;
        margin-bottom: 36px;
        border: none;
        .ant-collapse-content {
          display: none;
        }
        .ant-collapse-header {
          padding: 20px 56px 20px 20px;
          .item {
            display: flex;
            line-height: 20px;
            color: #172b4d;
            &--icon {
              padding-right: 18px;
            }
            &--title {
              font-weight: 600;
              font-size: 16px;
            }
            &--description {
              font-size: 14px;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
              margin: 8px 0;
            }
            &--link {
              color: #0762f7;
            }
          }
        }
      }
      .content-right-panel {
        background: linear-gradient(
            0deg,
            rgba(255, 255, 255, 0.95),
            rgba(255, 255, 255, 0.95)
          ),
          #0762f7;
        white-space: pre-wrap;
      }
      .content-right-success {
        background: linear-gradient(
            0deg,
            rgba(255, 255, 255, 0.9),
            rgba(255, 255, 255, 0.9)
          ),
          #05c270 !important;
        white-space: pre-wrap;
      }
      .content-right-warn {
        background: linear-gradient(
            0deg,
            rgba(255, 255, 255, 0.95),
            rgba(255, 255, 255, 0.95)
          ),
          #fe8803;
        white-space: pre-wrap;
      }
    }
    .ant-collapse-item-active {
      .item--description {
        overflow: inherit !important;
        text-overflow: initial !important;
        display: block !important;
      }
    }
    & #notification {
      flex: 1;
      overflow: auto;
    }
  }
`;
const Mainfunc = styled.div`
  flex: 1;
  overflow: hidden;
  .list-func {
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden !important;

    margin: 0 30px 40px;
    padding-bottom: 10px;
    background: #ffffff;
    box-shadow: 0px 8px 16px rgb(17 17 17 / 6%);
    border-radius: 16px;
    @media (max-width: 1610px) {
      margin: 0 15px 25px;
    }
    &--search {
      background: #56ccf2;
      border-radius: 16px 16px 0px 0px;
      padding: 14px 24px;
      background-size: contain;
      ${(props) =>
        props.bgPageFunc
          ? css`
              background-image: url(${props.bgPageFunc});
            `
          : css``}
      background-repeat: no-repeat;
      background-position: calc(100% - 22px) 0px;
      @media (max-width: 1610px) {
        padding: 14px 18px;
        background-position: calc(100% - 13px) 0px;
      }
    }
    &--goback {
      font-weight: bold;
      font-size: 14px;
      color: #ffffff;
      cursor: pointer;
      span {
        padding-left: 8px;
      }
    }
    &--cateogry {
      margin: 20px 0 15px;
      @media (max-width: 1610px) {
        margin: 15px 0 10px;
      }
      @media (max-width: 1326px) {
        margin: 14px 0;
        line-height: 1;
      }
      display: flex;
      align-items: center;
      span {
        font-weight: bold;
        font-size: 42px;
        color: #18317b;
        padding-left: 12px;
        @media (max-width: 1610px) {
          font-size: 35px;
        }
        @media (max-width: 1326px) {
          font-size: 28px;
        }
      }
      img {
        @media (max-width: 1326px) {
          max-width: 25px;
        }
      }
    }
    &--boxSearch {
      background: #ffffff;
      border: 2px solid #dfe1e6;
      border-radius: 17px;
      display: flex;
      width: calc(60% - 125px);
      @media (max-width: 1414px) {
        width: calc(60% - 64px);
      }
      img {
        padding: 8px 5px 8px 8px;
        margin-right: -28px;
        z-index: 1;
      }
      input {
        border: none !important;
        border-radius: 17px;
        padding-left: 32px;
        box-shadow: none !important;
      }
    }
    &--boxSearch2 {
      background: #ffffff;
      border: 2px solid #dfe1e6;
      border-radius: 6px;
      display: flex;
      width: calc(60% - 100px);
      @media (max-width: 1414px) {
        width: calc(60% - 64px);
      }
      img {
        padding: 8px 5px 8px 8px;
        margin-right: -28px;
        z-index: 1;
      }
      input {
        border: none;
        border-radius: 17px;
        padding-left: 32px;
      }
    }
  }
  .list-func--home {
    flex: 1;
    margin: 20px 10px 0px;
    height: 351px;
    overflow: hidden scroll;
    @media (max-width: 1919px) {
      height: ${(props) => (props.modal ? "351px" : "175px")};
    }
    &::-webkit-scrollbar {
      width: 5px !important;
      height: 5px !important;
    }
    .item {
      margin: 0px 10px 20px 10px !important;
      box-shadow: 0px 3.55801px 7.11602px rgb(17 17 17 / 6%) !important;
      border-radius: 7.11602px !important;
      &--bg {
        border-bottom: 4px solid #0762f7 !important;
        height: 83px !important;
        border-radius: 7.11602px 7.11602px 7.11602px 0px !important;
        img {
          border-radius: 7.11602px 7.11602px 7.11602px 0px !important;
          height: 100% !important;
        }
      }
      &--content {
        padding: 5.9px 10px !important;
        font-size: 14px !important;
        line-height: 19px !important;
        color: #172b4d !important;
        > div {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
    }
    .height-auto {
      height: auto;
    }
  }
`;
const Tree = styled.div`
  width: 100%;
  color: #172b4d;
  font-size: 1.2rem;
  font-weight: 550;
  line-height: 1.5;
  & .meta {
    height: 50px;
    min-height: 50px;
    & ._name {
      font-weight: 700;
    }
  }

  & ._icon {
    display: flex;
    margin-right: 10px;
    margin-bottom: 3px;
    svg {
      width: 15px;
      height: 15px;
    }
  }

  & .content {
    margin-left: 20px;
  }

  & .d-flex {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
  }
`;

const TreeNodes = styled.div`
  display: ${({ isExpand }) => (isExpand ? "block" : "none")};
  & ._icon {
    display: flex;
  }

  & .child {
    padding: 3px 10px;
    border-radius: 3px;
    margin-bottom: 10px;
    transition: all 0.5s ease-out;
    &::last-of-type {
      margin-bottom: 0px;
    }
    &:hover {
      background-color: #e8e8e8;
    }
    & ._name {
      opacity: 0.9;
    }
  }
`;

export { MainNotifi, Main, Mainfunc, Tree, TreeNodes };
