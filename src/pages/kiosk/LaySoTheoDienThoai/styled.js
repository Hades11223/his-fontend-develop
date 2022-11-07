import styled from "styled-components";
import {
  titleColor,
  textColor,
  customGray,
  btnBlue,
  subtitleColor,
} from "../common/variables";

export const MainWrapper = styled("div")`
  text-align: center;
  .header {
    margin: 60px auto 10px auto;
    line-height: 55px;
    text-align: center;
    letter-spacing: 0.01em;
    .title {
      font-size: 40px;
      font-weight: 800;
      color: ${titleColor};
    }
    .sub-title {
      color: ${textColor};
      font-weight: 500;
      font-size: 32px;
    }
  }
  .btn-search {
    margin: 10px auto;
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
    .search-icon {
      position: absolute;
      display: inline-flex;
      padding: 12px;
      width: 94px;
      height: 94px;
      background: ${btnBlue};
      box-shadow: 0px 4px 20px #d3dbe6;
      border-radius: 100px;
      right: 10px;
      top: 10px;
    }
    .delete-icon {
      position: absolute;
      padding: 10px;
      display: inline-flex;
      width: 65px;
      height: 60px;
      right: 120px;
      top: 30px;
      border-right: 1px solid #a0a3bd;
      &:hover {
        cursor: pointer;
        img {
          background: #a0a3bd33;
          border-radius: 90%;
        }
      }
    }
  }
  .error-msg {
    width: 100%;
    font-size: 30px;
    color: #ff4d4f;
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
    .header {
      margin: 0px;
      line-height: 55px;

      .title {
        font-size: 16px;
      }
      .sub-title {
        color: ${textColor};
        font-weight: 500;
        font-size: 14px;
      }
    }
    .btn-search {
      width: 100%;
      height: 50px;
      input {
        padding: 10px;
        font-size: 14px;
      }
      .search-icon {
        top: 0px;
        right: 1px;
        width: 50px;
        height: 50px;
      }
    }
  }
`;
