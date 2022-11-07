import { TRANG_THAI_HIEN_THI } from "pages/qms/qmsDoc/config";
import styled, { css } from "styled-components";

export const StyleBody = styled.main`
  padding: 0px 30px 0px 30px;
  .middle-content {
    padding: 25.4px 0 18px;

    .middle-content-title {
      justify-content: center;
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      span {
        font-weight: 900;
        font-size: 48px;
        line-height: 106.9%;
        padding-left: 20px;
      }
    }

    .carousel-right {
      position: relative;
      .middle-content__icon-next {
        position: absolute;
        width: 61.49px;
        height: 62.76px;
        left: 904px;
        z-index: 10;
        top: 100px;
      }
      .slick-list {
        height: ${(props) => props.slideBottom} !important;
      }
    }
    &__box {
      display: flex !important;
      height: 210px;
      align-items: center;
      box-sizing: border-box;
      border-radius: 32px;
      background: #5ea661;
      font-weight: bold;
      color: #ffffff;
      flex-direction: column;
      justify-items: center;
      align-items: center;

      .title {
        display: flex;
        text-align: center;
        width: 100%;
        margin-left: 10px;
        font-size: 96px;
        justify-content: center;
      }
      .address {
        font-size: 36px;
        display: flex;
        .province {
          padding-right: 20px;
        }
        .old {
          padding-left: 20px;
          width: 150px;
          border-left: 2px solid #fff;
        }
      }
    }
    &__title {
      position: absolute;
      top: 3px;
      left: 268px;
      font-style: normal;
      font-weight: 700;
      font-size: 28.8509px;
      text-transform: uppercase;
    }
  }

  .bottom-content {
    display: flex;
    .bottom-box {
      ${(props) =>
        props.currentKiosk?.dsTrangThai?.includes(TRANG_THAI_HIEN_THI.GOI_NHO)
          ? css`
              width: calc(49% - 9.96px);
            `
          : css`
              width: 100%;
            `}
      height: 505px;
      overflow: hidden;
      border: 3px solid #069ba7;
      background: #ffffff;
      box-shadow: 0px 0px 15px rgba(9, 30, 66, 0.07);
      border-radius: 16px;
      &__header {
        display: flex;
        height: 80px;
        align-items: center;
        padding: 0 17.25px 0 27.89px;
        border-bottom: 1px solid #bfbfbf;
      }
      &__title {
        font-weight: 900;
        font-size: 44px;
        color: #ff4d4f;
      }
      &__length {
        margin-left: auto;
        font-weight: 900;
        font-size: 44px;
        color: #ff4d4f;
      }

      &__body {
        background: #ffffff;
        border-radius: 0 15.3871px 0 0;
        /* height: calc(100% - 50px); */
        /* overflow: scroll; */
        height: 371px;
        .slick-list {
          height: 100% !important;
          overflow-y: scroll !important;
        }

        .box-item {
          display: flex !important;
          justify-content: space-between;
          align-items: center;
          margin: 0 28.85px;
          height: 104.8px;
          border-bottom: 2.88509px solid #dce2f2;
          box-sizing: border-box;
          width: auto !important;

          &__left {
            display: flex;
            align-items: center;
          }
          &__number {
            display: flex;
            align-items: center;
            color: #2c9595;
            font-weight: 700;
            font-size: 44px;
            width: 54.82px;
            height: 54.82px;
            justify-content: end;
          }
          &__name {
            ${(props) =>
              props.currentKiosk?.dsTrangThai?.includes(
                TRANG_THAI_HIEN_THI.GOI_NHO
              )
                ? css`
                    max-width: 600px;
                  `
                : css``}

            margin-left: 10px;
            font-size: 44px;
            font-weight: 700;
            color: #082a55;
            text-transform: uppercase;
          }
          &__old {
            font-weight: 500;
            font-size: 44px;
            color: #7a869a;
          }
        }
      }
    }
    .bottom-box-ignore {
      width: calc(49% - 9.96px);

      height: 505px;
      overflow: hidden;
      border: 3px solid #069ba7;
      background: #ffffff;
      box-shadow: 0px 0px 15px rgba(9, 30, 66, 0.07);
      border-radius: 16px;
      &--bg {
        margin-left: 19.92px;
      }
      &__header {
        display: flex;
        height: 80px;
        align-items: center;
        padding: 0 17.25px 0 27.89px;
        border-bottom: 1px solid #bfbfbf;
      }
      &__title {
        font-weight: 900;
        font-size: 44px;
      }
      &__length {
        font-weight: 900;
        font-size: 44px;
        margin-left: auto;
      }

      &__body {
        background: #ffffff;
        border-radius: 0 15.3871px 0 0;
        /* height: calc(100% - 50px); */
        /* overflow: scroll; */
        height: 371px;
        .slick-list {
          height: 100% !important;
          overflow-y: scroll !important;
        }

        .box-item {
          display: flex !important;
          justify-content: space-between;
          align-items: center;
          margin: 0 28.85px;
          height: 92.8px;
          border-bottom: 2.88509px solid #dce2f2;
          box-sizing: border-box;
          width: auto !important;
          &__left {
            display: flex;
            align-items: center;
          }
          &__number {
            display: flex;
            align-items: center;
            color: #2c9595;
            font-weight: 700;
            font-size: 44px;
            width: 54.82px;
            height: 54.82px;
          }
          &__name {
            max-width: 100%;
            margin-left: 10px;
            font-size: 44px;
            font-weight: 700;
            color: #082a55;
            text-transform: uppercase;
          }
          &__old {
            font-weight: 500;
            font-size: 44px;
            color: #7a869a;
          }
        }
      }
    }
  }
`;
