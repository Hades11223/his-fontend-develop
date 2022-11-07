import styled from "styled-components";

export const StyleFooter = styled.div`
  height: 234.65px;
  margin-top: 27.7px;
  background: #7d7d7d;
  border-radius: 15.3871px;
  overflow: hidden;
  @media (max-width: 750px) {
    height: 153.87px;
    margin-top: 16.6px;
  }
  .footer-header {
    height: 50px;
    align-items: center;
    display: flex;
    justify-content: space-between;
    background: #7d7d7d;
    padding: 0 12.5px 0 27.89px;
    @media (max-width: 750px) {
      height: 33.77px;
    }
    &__title {
      font-weight: 700;
      font-size: 25.9658px;
      color: #ffffff;
      @media (max-width: 750px) {
        font-size: 17.3105px;
        line-height: 21px;
      }
    }
    &__sub-title {
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
        margin-left: 10px;
        max-width: 25px;
        max-height: 25px;
        @media (max-width: 750px) {
          width: 16.67px;
          height: 16.67px;
        }
      }
    }
  }
  .footer-body {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 19.92px;
    height: 184.65px;
    border-radius: 0 15.3871px 0 0;
    box-shadow: 0px 1.92339px 3.84678px rgba(0, 0, 0, 0.101081);
    background: #ffffff;
    @media (max-width: 750px) {
      height: calc(100% - 33.77px);
    }
    .sub-title {
      padding-left: 20px;
      font-family: Nunito Sans;
      font-style: normal;
      font-weight: normal;
      font-size: 24px;
      line-height: 33px;

      color: #172b4d;
    }
    .footer-box {
      &__item {
        box-sizing: border-box;
        height: 92.325px;
        display: flex !important;
        align-items: center;
        justify-content: space-between;
        border-bottom: 2.88509px solid #dce2f2 !important;
        margin: 0 28.85px;
        width: auto !important;
        @media (max-width: 750px) {
          margin: 0 12.82px;
          height: 58px;
          border: 1.92339px solid #dce2f2;
        }
        &:last-child {
          border: none;
        }
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
        max-width: 280px;
        margin-left: 10px;
        font-size: 25px;
        font-weight: 700;
        color: #082a55;
        text-transform: uppercase;
        @media (max-width: 750px) {
          font-size: 15.0283px;
          line-height: 20px;
          margin-left: 5px;
        }
      }
      &__old {
        font-weight: 500;
        font-size: 21.1573px;
        color: #082a55;
        @media (max-width: 750px) {
          font-size: 13.1049px;
          line-height: 17px;
        }
      }
    }
    .slick-list {
      height: 185px !important;
    }
  }
`;
