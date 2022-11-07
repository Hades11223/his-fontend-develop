import { Col } from "antd";
import styled from "styled-components";
import bgPage from "assets/images/login/bg_login_sakura.png";

const Main = styled(Col)`
  padding: 22px;
  display: flex;
  flex-direction: column;
  max-height: 100%;
  border-radius: 64px;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(${bgPage});

  & .login-body {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    & .head-login {
      margin-top: 100px;
      text-align: center;
      & .title-login {
        color: #172b4d;
        font-size: 36px;
        text-transform: uppercase;
        font-weight: 900;
        line-height: 49px;
        font-family: Nunito Sans;
        font-style: normal;
        margin-top: 20px;
      }
      & .img-title {
        cursor: pointer;
        width: 148.76px;
        object-fit: contain;
        height: 99px;
      }
    }

    & .login-inner {
      /* background-color: #fff;
  box-shadow: 0 0 50px #ddd;  */
      border-radius: 20px;
      padding: 30px 80px;
      margin: auto;
      padding-left: 0px;
      padding-right: 0px;
      /* position: relative; */
      width: 500px;
      max-width: 100%;
      & .title-form-login {
        text-align: center;
        & h3 {
          font-weight: 600;
          font-size: 24px;
          line-height: 33px;
          text-align: center;
        }
        & h4 {
          font-size: 44px;
          font-style: normal;
          font-weight: normal;
          line-height: 60px;
        }
      }
      & .action {
        text-align: right;
        & .btn-login {
          width: 100%;
          margin-top: 20px;
          &:focus {
            outline: 0;
          }
        }
        &:after {
          content: "";
          display: table;
          clear: both;
        }
        & .img-login {
          font-size: 10px;
          width: 20px;
          margin: 5px;
          max-height: unset;
        }
      }
    }
  }

  & .thuongHieu {
    display: flex;
    justify-content: center;
    width: 100%;
    align-items: center;
    margin-top: 10px;

    .thuongHieu-box-content {
      display: flex;
      align-items: center;
      justify-content: center;

      span {
        font-weight: 600;
        margin-right: 10px;
        display: inline-block;
        font-size: 15px;
        line-height: 25px;
        color: #333;
      }

      .box-image {
        & .img-product {
          height: 30px !important;
          width: auto;
        }
      }
    }
  }
  @media (max-height: 830px) {
    & .head-login {
      margin-top: 50px !important;
    }
  }
  @media (max-height: 720px) {
    & .head-login {
      margin-top: 20px !important;
    }
    & .login-inner {
      padding: 0px 20px !important;
    }
  }
  @media (max-width: 1280px) {
    & .title-form-login {
      & h4 {
        font-size: 35px !important;
        line-height: 50px !important;
      }
    }
  }
  @media (max-width: 1100px) {
    & .title-form-login {
      & h4 {
        font-size: 35px !important;
      }
    }
  }
  @media (max-width: 991px) {
    min-height: calc(100vh - 40px);
  }

  @media (max-width: 500px) {
    & .title-login {
      font-size: 25px !important;
    }
    & .title-form-login {
      & h4 {
        font-size: 25px !important;
        line-height: 25px !important;
      }
    }
    & .login-inner {
      padding: 6px 0 !important;
    }
  }
`;

export { Main };
