import styled from "styled-components";
import {
  titleColor,
  textColor,
  customBlue2,
  customGray,
  customBlue,
  btnBlue,
} from "../common/variables";

export const MainWrapper = styled("div")`
  overflow: auto;
  text-align: center;
  .top {
    padding: 60px 90px 20px 90px;
    .header {
      .title {
        margin: 0 115px;
        font-weight: bold;
        font-size: 40px;
        line-height: 55px;
        text-align: center;
        letter-spacing: 0.01em;
        color: ${titleColor};
      }
      .title-tiepdon-bhyt {
        display: inline-block;
        width: 668px;
        height: 110px;
        left: 206px;
        top: 60px;
        font-family: Nunito Sans;
        font-style: normal;
        font-weight: bold;
        font-size: 40px;
        line-height: 55px;
        text-align: center;
        letter-spacing: 0.01em;
      }
      .title-tiepdon-bhyt h4 {
        color: #782033;
        font-weight: bold;
      }
      .title-tiepdon {
        position: static;
        width: 425px;
        height: 130px;
        left: 167px;
        top: 0px;
        margin: auto;
        line-height: 51px;
        vertical-align: middle;
        font-family: Nunito Sans;
        font-style: normal;
        font-weight: normal;
        font-size: 48px;
        text-align: center;
        letter-spacing: 0.01em;
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
          border: 1px solid #043178;
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
        .title-tiepdon-bhyt {
          width: 100%;
          font-size: 14px;
        }
        .title-tiepdon-bhyt h4 {
          color: #782033;
          font-weight: bold;
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
