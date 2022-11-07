import styled from "styled-components";

export const StyledHeader = styled.div`
  height: 320px;
  background: #fff;
  padding-top: 20px;
  @media (max-width: 750px) {
    height: 105px;
    width: auto;
    margin: 0 -20px;
    padding: 0 20px;
  }
  .content {
    padding-left: 20px;
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
            width: 110px;
            height: 110px;
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
        padding: 8px 0;
        @media (max-width: 750px) {
          border-top: 1.92339px solid #dce2f2;
          border-bottom: 1.92339px solid #dce2f2;
          padding: 21px 0;
          margin: 20.52px 0;
        }
        .sub-box {
          display: flex;
          align-items: center;
          width: 100%;
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
            justify-content: space-around;
            margin-left: 35px;
            height: 60.98px;
            align-items: end;
            @media (max-width: 750px) {
              height: auto;
              margin-left: 22.44px;
            }
            &__name {
              width: 550px;
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
    }
  }
  .work-time {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    padding-left: 31px;
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
  .header {
    width: 100%;
    display: flex;
    background: #F4F5F7;
    border-radius: 0px 16px 16px 0px;
    .logo {
      cursor: pointer;
      border-right: 2px solid #659efc;
      display: flex;
      align-items: center;
      @media (max-width: 750px) {
        height: 105px;
        display: flex;
        align-items: center;
      }
      img {
        width: 237px;
        height: 84px;
        object-fit: contain;
      }
    }
    .title-header {
      height: 112.18px;
      padding-left: 10px;
      color: #082a55;
      display: flex;
    flex-direction: column;
    align-items: center;
      @media (max-width: 750px) {
        height: auto;
      }
      &__first {
        max-width: 570px;
        line-height: 57px;
        text-transform: uppercase;
        font-family: Nunito Sans;
        font-style: normal;
        font-weight: 800;
        font-size: 42px;
        @media (max-width: 750px) {
          font-size: 22.4396px;
          line-height: 27px;
          max-width: 270px;
        }
      }
      &__second {
        max-width: 600px;
        line-height: 56px;
        text-align: center;
        font-family: Nunito Sans;
        font-style: normal;
        font-weight: normal;
        font-size: 36px;
        @media (max-width: 750px) {
          font-size: 33.3388px;
          line-height: 39px;
          max-width: 300px;
        }
      }
    }

    .sub-logo {
      display: flex;
      width: 100px;
      height: 100px;
      align-items: center;
      justify-content: center;
      border: 4.80848px solid #375a86;
      border-radius: 50%;
      margin-left: auto;
      margin-top: 5px;
      margin-right: 5px;
      &__icon {
        display: block;
        width: auto;
        height: 100%;
        border-radius: 50%;
        width: 90px;
      }
      @media (max-width: 750px) {
        width: 67.96px;
        height: 67.96px;
        border: 3.20565px solid #375a86;
      }
    }
  }
`;
