import styled from "styled-components";

export const StyledHeader = styled.div`
  background: #fff;
  padding-top: 20px;

  .content {
    padding-left: 20px;
    .top-content {
      height: 457.17px;
      margin: 0 -40.39px;
      padding: 30px 40.39px;
      box-sizing: border-box;
      box-shadow: 0px 1.92339px 3.84678px rgba(0, 0, 0, 0.101081);
      background: #ffffff;

      &__infor {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .infor-right {
          display: flex;
          align-items: center;
          justify-content: end;
          margin-right: 20px;
          &__box {
            width: 110px;
            height: 110px;
            border-radius: 50%;
            border: 3px solid #082a55;
            overflow: hidden;
            margin-right: 30px;
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
            }
            &__second {
              width: 600px;
              font-style: normal;
              font-weight: normal;
              font-size: 36px;
              line-height: 49px;
              color: #082a55;
            }
          }
        }
      }
    }
  }

  .header {
    width: 100%;
    display: flex;
    border-radius: 0px 16px 16px 0px;
    .logo {
      cursor: pointer;
      border-right: 2px solid #659efc;
      display: flex;
      align-items: center;

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

      &__first {
        line-height: 57px;
        text-transform: uppercase;
        font-family: Nunito Sans;
        font-style: normal;
        font-weight: 800;
        font-size: 42px;
      }
      &__icon {
        width: auto;
        object-fit: contain;
        margin-left: 10px;
      }
      &__second {
        max-width: 600px;
        line-height: 56px;
        font-family: Nunito Sans;
        font-style: normal;
        font-weight: normal;
        font-size: 36px;
      }
    }
  }
`;
