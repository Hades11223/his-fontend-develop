import styled from "styled-components";

export const StyleBody = styled.main`
  padding: 0px 30px 0px 30px;
  .top-content {
    height: 457.17px;
    margin: 0 -40.39px;
    padding: 30px 40.39px;
    box-sizing: border-box;
    box-shadow: 0px 1.92339px 3.84678px rgba(0, 0, 0, 0.101081);
    background: #ffffff;
    @media (max-width: 750px) {
      height: auto;
      margin: 0 -20px;
      padding: 21px 26px;
    }
    &__infor {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .infor-right {
        display: flex;
        align-items: center;
        &__box {
          width: 153.87px;
          height: 153.87px;
          border-radius: 50%;
          border: 3px solid #082a55;
          overflow: hidden;
          @media (max-width: 750px) {
            width: 102.58px;
            height: 102.58px;
          }
        }
        &__img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .infor-description {
          margin-left: 35px;
          &__first {
            width: 600px;
            margin-bottom: 7.652px;
            font-style: normal;
            font-weight: 800;
            font-size: 46px;
            line-height: 63px;
            color: #082a55;
            @media (max-width: 750px) {
              font-size: 32.0565px;
              line-height: 39px;
              margin-bottom: 0;
              width: 400px;
            }
          }
          &__second {
            width: 600px;
            font-style: normal;
            font-weight: normal;
            font-size: 36px;
            line-height: 49px;
            color: #082a55;
            @media (max-width: 750px) {
              font-size: 25.6452px;
              line-height: 31px;
              width: 400px;
              white-space: pre-wrap;
            }
          }
        }
      }
      .infor-left {
        &__logo-hospital {
          display: block;
          width: 151.97px;
          height: 151.97px;
          @media (max-width: 750px) {
            width: 97.45px;
            height: 97.45px;
          }
        }
      }
    }
    &__sub-infor {
      // display: grid;
      // grid-template-columns: 1fr 1fr;
      display: flex;
      margin-top: 33.25px;
      padding: 33.25px 0;
      border-top: 2.88509px solid #dce2f2;
      border-bottom: 2.88509px solid #dce2f2;
      @media (max-width: 750px) {
        border-top: 1.92339px solid #dce2f2;
        border-bottom: 1.92339px solid #dce2f2;
        padding: 21px 0;
        margin: 20.52px 0;
      }
      .sub-box {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50%;
        &:first-child {
          border-right: 1.6px solid #dce2f2;
        }
        &:last-child {
          border-left: 1.6px solid #dce2f2;
        }
        .sub-image {
          &__img {
            display: block;
            width: 60px;
            height: 60px;
          }
          @media (max-width: 750px) {
            width: 46.8px;
            height: 46.8px;
          }
        }
        .sub-infor {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          margin-left: 35px;
          height: 88.98px;
          @media (max-width: 750px) {
            height: auto;
            margin-left: 22.44px;
          }
          &__name {
            width: 350px;
            font-family: Nunito Sans;
            font-style: normal;
            font-weight: 800;
            font-size: 36px;
            line-height: 49px;

            color: #082a55;
            @media (max-width: 750px) {
              font-size: 21.1573px;
              line-height: 26px;
              width: 250px;
            }
          }
          &__job {
            font-family: Nunito Sans;
            font-style: normal;
            font-weight: 300;
            font-size: 32px;
            line-height: 44px;

            color: #082a55;
            @media (max-width: 750px) {
              font-size: 19.2339px;
              line-height: 23px;
            }
          }
        }
      }
    }
    &__work-time {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 94.25px;
      @media (max-width: 750px) {
        height: auto;
      }
      &__left {
        font-style: normal;
        font-weight: normal;
        font-size: 25px;
        @media (max-width: 750px) {
          font-size: 16.0283px;
          line-height: 20px;
        }
      }
      &__title {
        margin-right: 25px;
        font-weight: 500;
        @media (max-width: 750px) {
          font-size: 16.0283px;
          line-height: 20px;
        }
      }
      &__display {
        font-weight: 700;
      }
      &__right {
        font-style: normal;
        font-weight: 700;
        font-size: 28.8509px;
        color: #e02c4c;
        @media (max-width: 750px) {
          font-size: 19.2339px;
          line-height: 23px;
        }
        .grey {
          color: #7d7d7d;
        }
      }
    }
  }
  .middle-content {
    padding: 25.4px 0 18px;
    @media (max-width: 750px) {
      padding: 16.96px 0 18px;
    }
    .carousel {
      .slick-list {
        margin: 0 -0.4px;
        height: 148px;
        @media (max-width: 750px) {
          height: 150px;
        }
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
        @media (max-width: 750px) {
          left: auto;
          right: 26.33px;
          top: auto;
          bottom: 35.03px;
          width: 41.49px;
          height: 41.49px;
        }
      }
      .slick-list {
        height: ${(props) => props.slideBottom} !important;
        @media (max-width: 750px) {
          height: ${(props) => props.slideBottom750} !important;
        }
      }
    }
    &__box {
      display: flex !important;
      height: 130px;
      align-items: center;
      box-sizing: border-box;
      border-radius: 11px;
      background: #5ea661;
      font-weight: bold;
      color: #ffffff;
      position: relative;
      @media (max-width: 750px) {
        padding: 28px;
        height: 133.36px;
        font-size: 102.581px;
        line-height: 125px;
      }
      > span {
        position: absolute;
        top: -15px;
        @media (max-width: 750px) {
          font-size: 102.581px;
          top: 4px;
        }
      }
      .title {
        display: flex;
        text-align: center;
        width: 100%;
        margin-left: 10px;
        .sub-title {
          font-family: Nunito Sans;
          font-style: normal;
          font-weight: 900;
          font-size: 25.5953px;
          line-height: 35px;
          text-align: center;
          display: flex;
          align-items: center;
        }
        .stt {
          padding-left: 20px;
          font-family: Nunito Sans;
          font-style: normal;
          font-weight: 900;
          font-size: 100px;
          line-height: 124px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }

      .box-child {
        display: flex !important;
        align-items: center;
        border-radius: 11px;
        background: #ffffff;
        color: #082a55;
        position: absolute;
        z-index: 9;
        left: 407px;
        width: 1436px;
        height: 87px;
        @media (max-width: 750px) {
          width: calc(100% - 186px);
          height: 118.67px;
          top: 29.33px;
          left: 186px;
        }
        &__wrap {
          display: flex;
          align-items: center;
          height: 113.48px;
          margin: 0 30px;
          max-height: 113.48px;
          .ant-progress-inner {
            width: 70px !important;
            height: 70px !important;
            @media (max-width: 750px) {
              width: 60px !important;
              height: 60px !important;
            }
            .ant-progress-text {
              img {
                width: 50%;
                display: inline-block !important;
              }
            }
          }
        }
        &__icon {
          display: block;
          width: auto;
          height: 76.49px;
        }
        &__infor {
          display: flex;
          justify-content: space-around;
          width: 100%;
          @media (max-width: 750px) {
            height: auto;
          }
        }
        &__first-infor {
          max-width: 750px;
          font-weight: 700;
          font-size: 50px;
          @media (max-width: 750px) {
            font-size: 30.7743px;
            line-height: 38px;
            max-width: 330px;
          }
        }
        &__second-infor {
          display: flex;
          align-items: center;
          font-weight: 300;
          font-size: 40px;
          padding-left: 20px;
          margin-left: auto;
          @media (max-width: 750px) {
            font-size: 22.6452px;
            line-height: 31px;
          }
          .province {
            max-width: 373px;
            display: inline-block;
            padding-right: 25px;
            @media (max-width: 750px) {
              max-width: 210px;
            }
          }
          .old {
            margin-left: 20px;
            border-left: 2px solid #082a55;
            padding-left: 20px;
            width: 150px;
          }
        }
      }

      &--margin {
        height: 120px;
        background: #082a55;
        display: flex !important;
        @media (max-width: 750px) {
          height: 101.3px;
          margin-top: 13px;
        }
        > span {
          @media (max-width: 750px) {
            font-size: 68px !important;
            top: -10px !important;
          }
        }
        .middle-content__title {
          top: 8px;
          left: 199px;
          font-size: 24.0424px;
          @media (max-width: 750px) {
            font-size: 16.0283px;
            left: 133.81px;
            line-height: 20px;
          }
        }
        .title {
          text-align: center;
          width: 100%;
          .sub-title {
            font-family: Nunito Sans;
            font-style: normal;
            font-weight: 900;
            font-size: 28px;
            line-height: 38px;
            display: flex;
            align-items: center;
          }
          .stt {
            font-family: Nunito Sans;
            font-style: normal;
            font-weight: 900;
            font-size: 70px;
            line-height: 85px;
            display: flex;
            justify-content: center;
            min-width: 200px;
          }
        }
        .box-child {
          width: 1436px;
          height: 77px;
          left: 407px;
          @media (max-width: 750px) {
            width: calc(100% - 133.81px);
            height: auto;
            left: 133.81px;
          }
          &__wrap {
            max-height: 93.28px;
            max-width: 93.28px;
            margin: 0 25px;
            @media (max-width: 750px) {
              margin: 0 11.78px;
            }
          }
          &__icon {
            height: 76.49px;
            @media (max-width: 750px) {
              height: 91.68px;
            }
          }
          &__first-infor {
            font-size: 45px;
            max-width: 750px;
            @media (max-width: 750px) {
              font-size: 22.6452px;
              line-height: 31px;
              max-width: 100%;
            }
          }

          &__second-infor {
            font-size: 35px;
            @media (max-width: 750px) {
              font-size: 19.2339px;
              line-height: 23px;
            }
            .province {
              padding-right: 20px;
            }
            .old {
              padding-left: 20px;
              width: 150px;
            }
          }
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
      @media (max-width: 750px) {
        font-size: 16.0283px;
        left: 186px;
        line-height: 20px;
      }
    }
  }

  .bottom-content {
    display: flex;
    .bottom-box {
      width: calc(33% - 9.96px);
      height: 318px;
      border-radius: 15.3871px;
      overflow: hidden;
      background: #2c9595;
      box-shadow: 0px 1.92339px 3.84678px rgba(0, 0, 0, 0.101081);
      @media (max-width: 750px) {
        height: 278px;
        width: calc(50% - 6.665px);
      }
      &--bg {
        background: #2c9595;
        margin-left: 19.92px;
        @media (max-width: 750px) {
          margin-left: 13.33px;
        }
        .bottom-box__header {
          background: #2c9595;
        }
      }
      &__header {
        display: flex;
        height: 50px;
        justify-content: space-between;
        align-items: center;
        padding: 0 17.25px 0 27.89px;
        background: #2c9595;
        @media (max-width: 750px) {
          height: 33.77px;
          padding: 0 17.25px;
        }
      }
      &__title {
        font-weight: 700;
        font-size: 25.9658px;
        color: #ffffff;
        @media (max-width: 750px) {
          font-size: 16.3105px;
          line-height: 21px;
        }
      }

      &__confirm {
        display: flex;
        align-items: center;
        font-weight: normal;
        font-size: 24.0424px;
        color: #ffffff;
        @media (max-width: 750px) {
          font-size: 16.0283px;
          line-height: 20px;
        }
        .icon {
          display: block;
          width: 25px;
          height: 25px;
          margin-left: 10px;
          @media (max-width: 750px) {
            width: 16.67px;
            height: 16.67px;
          }
        }
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

        @media (max-width: 750px) {
          height: calc(100% - 33.77px);
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
          @media (max-width: 750px) {
            margin: 0 12.82px;
            height: 60px;
            border-bottom: 1.92339px solid #dce2f2;
          }
          &:last-child {
            border: none;
          }
          &__left {
            display: flex;
            align-items: center;
          }
          &__number {
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px solid #2c9595;
            color: #2c9595;
            border-radius: 50%;
            font-weight: 700;
            font-size: 28.8509px;
            width: 54.82px;
            height: 54.82px;
            @media (max-width: 750px) {
              font-size: 19.2339px;
              line-height: 23px;
              width: 32.54px;
              height: 32.54px;
            }
          }
          &__name {
            max-width: 380px;
            margin-left: 10px;
            font-size: 35px;
            font-weight: 700;
            color: #082a55;
            text-transform: uppercase;
            @media (max-width: 750px) {
              font-size: 13.1049px;
              line-height: 20px;
              margin-left: 5px;
            }
          }
          &__old {
            font-weight: 500;
            font-size: 27px;
            color: #082a55;
            @media (max-width: 750px) {
              font-size: 14.1049px;
              line-height: 17px;
            }
          }
        }
      }
    }
    .bottom-box-ignore {
      width: calc(33% - 9.96px);
      height: 318px;
      border-radius: 15.3871px;
      overflow: hidden;
      background: #7A869A;
      box-shadow: 0px 1.92339px 3.84678px rgba(0, 0, 0, 0.101081);
      @media (max-width: 750px) {
        height: 278px;
        width: calc(50% - 6.665px);
      }
      &--bg {
        background: #7A869A;
        margin-left: 19.92px;
        @media (max-width: 750px) {
          margin-left: 13.33px;
        }
        .bottom-box-ignore__header {
          background: #7A869A;
        }
      }
      &__header {
        display: flex;
        height: 50px;
        justify-content: space-between;
        align-items: center;
        padding: 0 17.25px 0 27.89px;
        background: #7A869A;
        @media (max-width: 750px) {
          height: 33.77px;
          padding: 0 17.25px;
        }
      }
      &__title {
        font-weight: 700;
        font-size: 25.9658px;
        color: #ffffff;
        @media (max-width: 750px) {
          font-size: 16.3105px;
          line-height: 21px;
        }
      }

      &__confirm {
        display: flex;
        align-items: center;
        font-weight: normal;
        font-size: 24.0424px;
        color: #ffffff;
        @media (max-width: 750px) {
          font-size: 16.0283px;
          line-height: 20px;
        }
        .icon {
          display: block;
          width: 25px;
          height: 25px;
          margin-left: 10px;
          @media (max-width: 750px) {
            width: 16.67px;
            height: 16.67px;
          }
        }
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

        @media (max-width: 750px) {
          height: calc(100% - 33.77px);
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
          @media (max-width: 750px) {
            margin: 0 12.82px;
            height: 60px;
            border-bottom: 1.92339px solid #dce2f2;
          }
          &:last-child {
            border: none;
          }
          &__left {
            display: flex;
            align-items: center;
          }
          &__number {
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px solid #2c9595;
            color: #2c9595;
            border-radius: 50%;
            font-weight: 700;
            font-size: 28.8509px;
            width: 54.82px;
            height: 54.82px;
            @media (max-width: 750px) {
              font-size: 19.2339px;
              line-height: 23px;
              width: 32.54px;
              height: 32.54px;
            }
          }
          &__name {
            max-width: 100%;
            margin-left: 10px;
            font-size: 35px;
            font-weight: 700;
            color: #082a55;
            text-transform: uppercase;
            @media (max-width: 750px) {
              font-size: 13.1049px;
              line-height: 20px;
              margin-left: 5px;
            }
          }
          &__old {
            font-weight: 500;
            font-size: 27px;
            color: #082a55;
            @media (max-width: 750px) {
              font-size: 14.1049px;
              line-height: 17px;
            }
          }
        }
      }
    }
  }
`;
