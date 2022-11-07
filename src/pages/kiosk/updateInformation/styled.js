import styled from "styled-components";
import { customBlue, btnBlue, textColor } from "../common/variables";

export const MainWrapper = styled("div")`
  overflow: auto;
  text-align: center;
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
      background: ${btnBlue};
      border-radius: 34px 0 32px 32px;
      .info {
        border-radius: 32px 0 32px 32px;
        margin-top: 6px;
        background: #ffffff;
        padding: 65px 40px 55px 40px;
        form {
          label {
            font-size: 20px;
            color: ${textColor};
            font-weight: 500;
          }
          .ant-form-item-control-input-content {
            display: flex;
            .ant-radio-group {
              display: flex;
              .ant-radio-wrapper {
                display: flex;
                align-items: center;
              }
            }
          }
          .ant-input-affix-wrapper {
            border-radius: 100px;
            border: 1px solid ${textColor} !important;
            border: none;
            input {
              width: 430px;
              height: 54px;
              background: #ffffff;
              box-sizing: border-box;
              font-size: 25px;
              padding: 20px;
              margin: 0 10px;
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
          .custom-col-address {
            position: relative;
            .info-msg {
              position: absolute;
              bottom: 0;
              left: 16px;
            }
          }
          .ant-form-item-control-input-content {
            position: relative;
            .input-content {
              input {
                width: 100%;
                outline: none;
                font-weight: 600;
                font-size: 25px;
                line-height: 20px;
                color: rgba(51, 51, 51, 1);
                border: none;
                padding: 20px 30px 20px 20px;
                height: 64px;
                border-radius: 100px;
                &::placeholder {
                  font-weight: 500;
                }
                &.custom-address {
                  border: 1px solid #172b4d !important;
                }
              }
            }
            .delete-icon {
              position: absolute;
              width: 25px;
              right: 10px;
              top: 20px;
              height: 25px;
              img {
                width: 100%;
              }
            }
          }
          .age {
            width: 64px;
            height: 64px;
            border-radius: 90%;
            border: 1px dashed ${textColor};
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 35px;
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
          .info-msg {
            position: absolute;
            bottom: -27px;
            left: 0;
            color: #7a869a;
          }
        }
      }
    }
  }
  .btn-action {
    margin-top: 125px;
    display: flex;
    flex-direction: column;
    div.btn-lg {
      margin: 30px auto;
    }
  }
`;
