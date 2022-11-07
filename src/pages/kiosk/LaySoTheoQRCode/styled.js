import styled from "styled-components";
import {
  titleColor,
  textColor,
  customBlue2,
  customGray,
  customBlue,
  btnBlue,
  subtitleColor,
} from "../common/variables";

export const MainWrapper = styled("div")`
  overflow: auto;
  text-align: center;
  .top {
    padding: 60px 90px 20px 90px;
    .header {
      .title {
        font-weight: bold;
        font-size: 40px;
        line-height: 55px;
        text-align: center;
        letter-spacing: 0.01em;
        color: ${titleColor};
      }
      .title-tiepdon {
        position: static;
        width: 825px;
        height: 130px;
        left: 167px;
        top: 0px;
        margin: auto;
        font-family: Nunito Sans;
        font-style: normal;
        font-weight: bold;
        font-size: 40px;
        line-height: 55px;
        text-align: center;
        letter-spacing: 0.01em;
        h4 {
          color: #782033;
          font-weight: bold;
        }
      }
      .title-quetqr {
        position: static;
        width: 835px;
        height: 87px;
        left: -38px;
        top: 130px;

        font-family: Nunito Sans;
        font-style: normal;
        font-weight: bold;
        font-size: 64px;
        line-height: 87px;
        text-align: center;
        letter-spacing: 0.01em;
        margin: auto;
        line-height: 51px;
        vertical-align: middle;
      }
      .title-suggest {
        position: absolute;
        width: 546px;
        height: 132px;
        left: 187px;
        top: 329px;

        font-family: Nunito Sans;
        font-style: normal;
        font-weight: 600;
        font-size: 32px;
        line-height: 44px;
        text-align: center;
        letter-spacing: 0.01em;
      }
      .qr {
        margin: 40px auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 900px;
        height: 112.73px;
        position: relative;
        input {
          width: 100%;
          height: 100%;
          border-radius: 100px;
          background: ${customGray};
          border: 2px solid #049254;
          box-sizing: border-box;
          box-shadow: 0px 4px 20px #d3dbe6;
          position: relative;
          outline: none;
          padding: 0 110px 0 45px;
          color: ${textColor};
        }
        .qr-icon {
          position: absolute;
          display: inline-flex;
          padding: 12px;
          width: 65px;
          height: 65px;
          right: 20px;
          top: 20px;
        }
      }
      .action-button {
        padding: 36px 0px 36px 0px;

        .btn {
          width: 900px;
          height: 110px;
          background: #ffffff;
          box-shadow: 0px 8px 0px rgba(59, 97, 143, 0.1), 0px 4px 10px #d3dbe6;
          border-radius: 100px;
          color: #172b4d;
          &:active {
            border-radius: 100px;
          }
        }
      }
    }
  }
  .content {
    margin: 0 40px;
    /* background: ${customBlue}; */
    border-radius: 32px;
    .content-title {
      padding: 20px 260px;
      font-style: normal;
      font-weight: bold;
      font-size: 40px;
      line-height: 50px;
      color: ${customBlue2};
    }
    .wrapper {
      width: 100%;
      /* background: ${btnBlue}; */
      /* border-radius: 34px 32px 32px 32px; */
      img {
        margin-top: 5px;
      }
    }
  }
  .footer {
    margin-top: 85px;
    .footer-text {
      text-align: center;
      color: ${titleColor};
    }
    .image {
      text-align: center;
      margin-top: 40px;
    }
  }

  .result {
    margin: 0 40px;
    .title {
      font-weight: normal;
      font-size: 32px;
      line-height: 80px;
    }
    .list {
      .data-list {
        max-height: 860px;
        overflow-x: hidden;
        overflow-y: auto;
        .card {
          padding: 30px 45px;
          background: ${customGray};
          box-shadow: 0px 4px 20px #d3dbe6;
          border-radius: 40px;
          margin: 10px auto;
          .info {
            text-align: left;
            .name {
              text-transform: uppercase;
              color: ${textColor};
              margin-bottom: 0.2em;
            }
            .sub-info {
              line-height: 40px;
              p {
                margin-bottom: 0;
                color: ${textColor};
                font-weight: 500;
                font-size: 30px;
              }
            }
          }
          .btn-action {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100%;
            .btn {
              font-weight: 500;
              margin: 15px;
              width: 284px;
              height: 72px;
              mix-blend-mode: normal;
              border-radius: 32px;
              display: flex;
              justify-content: center;
              align-items: center;
              box-shadow: 0px 6px 0px #03317c;
              span {
                margin-right: 10px;
              }
              &.edit {
                color: #0d2f6f;
                background: #dce3e9;
                box-shadow: 0px 6px 0px #03317c;
              }
              &.confirm {
                color: #ffffff;
                background: #049254;
                mix-blend-mode: normal;
                box-shadow: 0px 6px 0px #026138;
              }
            }
          }
        }
      }
      .btn-add-new {
        display: flex;
        background: #ffffff;
        box-shadow: 0px 8px 0px ${btnBlue}, 0px 8px 20px rgba(10, 47, 108, 0.3);
        border-radius: 32px;
        width: 1000px;
        height: 209px;
        .img {
          width: 15%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .text {
          text-align: left;
          margin: 48px auto;
          width: 85%;
          div {
            color: ${textColor};
          }
          span {
            color: ${subtitleColor};
            font-weight: 500;
            font-size: 36px;
          }
        }
      }
    }
  }

  @media (max-width: 765px) {
    .top {
      padding: 10px;
      font-size: 14px;
      .header {
        .title {
          margin: 0px;
          font-size: 14px;
          .title-tiepdon h4 {
            font-size: 14px;
          }
          .title-quetqr h1 {
            font-size: 14px;
          }
        }
        .title-tiepdon {
          position: static;
          width: 100%;
          height: 50px;
          left: 167px;
          top: 0px;
        }
        .title-quetqr {
          position: static;
          width: 100%;
          height: 50px;
          top: 0px;
        }
        .title-suggest {
          position: absolute;
          width: 100%;
          height: 132px;
          left: 187px;
          top: 329px;

          font-family: Nunito Sans;
          font-style: normal;
          font-weight: 600;
          font-size: 32px;
          line-height: 44px;
          text-align: center;
          letter-spacing: 0.01em;
        }
        .qr {
          width: 100%;
          height: 50px;
          margin: 0px;
          input {
            font-size: 14px;
          }
          .qr-icon {
            padding: 12px;
            width: 50px;
            height: 50px;
            right: 1px;
            top: 0;
          }
        }
        .action-button {
          padding: 0px;
          .btn {
            width: 100%;
            height: 50px;
          }
        }
      }
    }
    .content {
      margin: 0 40px;
      border-radius: 32px;
      .content-title {
        font-size: 14px;
      }
      .wrapper {
        img {
          margin-top: 5px;
          width: 100%;
        }
      }
    }
    .footer {
      margin-top: 25px;
      .footer-text {
        font-size: 14px;
      }
      .image {
        text-align: center;
        margin-top: 40px;
      }
    }
  }
`;
