import styled from "styled-components";
import {
  customBlue2,
  customGray,
  textColor,
  customGreen,
  titleColor,
} from "../common/variables";

export const MainWrapper = styled("div")`
  .header {
    margin: 75px;
    text-align: center;
    .message {
      color: ${customGreen};
      line-height: 60px;
      margin: 25px auto;
    }
    .sub-message {
      font-weight: 500;
      color: ${textColor};
    }
  }
  .content {
    margin: 80px 180px;
    background: ${customGray};
    border: 2px dashed ${customBlue2};
    box-sizing: border-box;
    box-shadow: 20px 20px 40px #d3dbe6;
    border-radius: 90px;
    width: 720px;
    height: 680px;
    text-align: center;
    .stt {
      line-height: 50px;
      color: ${textColor};
      margin: 160px auto 45px auto;
    }
    .number {
      font-family: Montserrat, sans-serif !important;
      font-size: 220px;
      line-height: 200px;
      color: rgba(10, 47, 108, 1);
      text-shadow: -20px -20px 40px #ffffff, 20px 20px 40px #d3dbe6;
    }
    .sub-txt {
      color: red;
    }
    .guideline {
      color: ${textColor};
      padding: 20px 45px;
      font-size: 22px;
    }
  }
  .footer {
    margin-top: 210px;
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
    .header {
      margin: 10px;
      text-align: center;
      .image {
        img {
          width: 20px;
          height: 20px;
        }
      }
      .message {
        font-size: 14px;
        margin: 0px;
      }
      .sub-message {
        font-weight: 500;

        font-size: 14px;
      }
    }
    .content {
      margin: 0px;
      width: 100%;
      height: 100%;
      .stt {
        margin: 10px auto 45px auto;
        font-size: 14px;
      }
      .number {
        font-size: 50px;
        line-height: 0px;
      }
      .guideline {
        padding: 10px;
        font-size: 14px;
      }
    }
    .footer {
      margin-top: 10px;
      .footer-text {
        font-size: 14px;
      }
    }
  }
  @media (min-width: 1200px) {
    .content {
      margin-left: 30%;
    }
  }
`;
