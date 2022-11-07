import styled from "styled-components";
import { customBlue, btnBlue, textColor } from "../common/variables";

export const MainWrapper = styled("div")`
  overflow: auto;
  text-align: center;
  .btn-action {
    margin-top: 125px;
    display: flex;
    flex-direction: column;
    div.btn-lg {
      margin: 30px auto;
      font-size:40px;
    }
  }
  .content {
    margin: 80px 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: ${customBlue};
    box-shadow: 0px 6.20436px 10.3406px rgba(9, 30, 66, 0.2),
      0px 0px 2.06812px rgba(9, 30, 66, 0.31);
    border-radius: 32px;
    .title {
      margin: 15px auto;
      color: rgba(8, 47, 111, 1);
    }
    .bg {
      width: 100%;
      height: 500px;
      background: ${btnBlue};
      border-radius: 34px 0 32px 32px;
      .info {
        height: 500px;
        margin-top: 6px;
        background: #ffffff;
        border-radius: 32px 0 32px 32px;
        padding: 65px 40px 55px 40px;
        form {
          label {
            font-size: 20px;
            color: ${textColor};
            font-weight: 500;
          }
          .ant-input-affix-wrapper {
            border-radius: 100px;
            border: 1px solid ${textColor} !important;
            border: none;
            input {
              font-size: 20px;
              width: 430px;
              height: 54px;
              background: #ffffff;
              box-sizing: border-box;
              font-size: 28px;
              margin: 0 10px;
              text-transform: uppercase;
              &::placeholder {
                text-transform: none;
              }
            }
            .ant-input-suffix {
              span {
                font-size: 25px;
              }
            }
          }
          .ant-radio-inner {
            border-color: #0052cc !important;
          }
          .ant-picker-input {
            input {
              font-weight: 600;
              font-size: 32px;
              line-height: 20px;
              color: rgba(51, 51, 51, 1);
              border: none;
              padding: 20px;
              height: 54px;
              &::placeholder {
                font-weight: 500;
                font-size: 28px;
              }
            }
            .ant-picker-suffix {
              font-size: 28px;
            }
          }
          .ant-form-item-explain-error {
            div {
              margin-top: 10px;
            }
          }
        }
        .item-dob {
          input {
            width: 369px !important;
          }
        }
        .msg {
          position: absolute;
          padding-left: 20px;
          bottom: -30px;
          font-family: Nunito Sans;
          font-style: italic;
          font-weight: normal;
          font-size: 20px;
          line-height: 27px;
          color: #7a869a;
        }
        .error-msg {
          position: absolute;
          bottom: -27px;
          width: 100%;
          color: #ff4d4f;
        }
        /* .custom-label {
          .ant-form-item-label {
            &::before {
              display: inline-block;
              margin-right: 4px;
              color: #ff4d4f;
              font-size: 14px;
              font-family: SimSun, sans-serif;
              line-height: 1;
              content: "*";
            }
          }
        } */
      }
    }
  }

  @media (max-width : 765px){
    margin-bottom:150px;
    .content {
      margin: 0px;
      .title {
        font-size:14px;
        margin: 0px auto;
        color: rgba(8, 47, 111, 1);
      }
      .bg {
        width: 100%;
        height: 500px;
        .info {
          height: 500px;
          margin-top: 6px;
          background: #ffffff;
          border-radius: 32px 0 32px 32px;
          padding: 20px;
          form {
            label {
              font-size: 10px;
            }
            .ant-input-affix-wrapper {
              input {
                font-size: 10px;
                width: 100%;
                height: 50px;
                background: #ffffff;
              
                font-size: 14px;
                margin: 0 10px;
              
              }
              .ant-input-suffix {
                span {
                  font-size: 14px;
                }
              }
            }
            .ant-picker-input {
              input {
                font-weight: 600;
                font-size: 14px;
              
                padding: 0px;
                height: 50px;
                &::placeholder {
                  font-weight: 500;
                  font-size: 14px;
                }
              }
              .ant-picker-suffix {
                font-size: 14px;
              }
            }
            .ant-form-item-explain-error {
              div {
                margin-top: 10px;
              }
            }
          }
          .item-dob {
            input {
              width: 100% !important;
            }
          }
          .error-msg {
            position: absolute;
            bottom: -27px;
            width: 100%;
            color: #ff4d4f;
          }
          }
        }
      }
      .btn-action {
        margin-top: 10px;
        display: flex;
        flex-direction: column;
        div.btn-lg {
          margin: 30px auto;
          width:100%;
          height:50px;
          span{
            font-size :14px;
          }
        }
      }
    }
  
  }
`;
