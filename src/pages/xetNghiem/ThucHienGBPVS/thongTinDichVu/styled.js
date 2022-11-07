import styled from "styled-components";

export const Main = styled.div`
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    #0762f7;
  box-shadow: 0px 0px 15px rgba(9, 30, 66, 0.07);
  border-radius: 16px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3px 7px 3px 30px;
  font-family: Nunito Sans;
  .header-left {
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    color: #ffffff;
    &__title {
      &--bold {
        font-weight: bold;
      }
    }
  }
  .header-right {
    &__detail {
      font-size: 16px;
      color: #ffffff;
      font-weight: 600;
      position: relative;
      > svg:first-child {
        vertical-align: middle;
        margin-right: 12px;
        cursor: pointer;
      }
    }
    &__arrow {
      width: 38px;
      height: 38px;
      position: absolute;
      top: 17px;
      z-index: 99;
      left: 101px;
    }
    &__popup {
      position: absolute;
      width: 573px;
      top: 41px;
      left: 0;
      color: #172b4d;
      z-index: 100;
      > div {
        background: linear-gradient(
            0deg,
            rgba(255, 255, 255, 0.95),
            rgba(255, 255, 255, 0.95)
          ),
          #0762f7;

        box-shadow: 0px 0px 15px rgba(9, 30, 66, 0.07);
        border-radius: 16px;
        max-height: 475px;
        overflow: none;
        .info-row {
          &.space-bottom {
            margin-bottom: 13px;
          }
        }
      }
    }
    &__btn {
      margin-right: 10px;
      height: 36px;
      mix-blend-mode: normal;
      box-shadow: 0px 3px 0px #03317c;
      border-radius: 8px;
      font-size: 16px;
      color: #172b4d;
      font-weight: 600;
      border: 0;
      &:last-child {
        margin-right: 0;
      }
      &--blue {
        background: #0762f7;
        mix-blend-mode: normal;
        box-shadow: 0px 3px 0px #03317c;
        color: #ffffff;
      }
    }
    .ant-btn[disabled] {
      color: rgba(0, 0, 0, 0.25);
    }
  }
`;

export const Content = styled.div`
  padding: 16px;
  border-top: 3px solid #ef4066;
  font-family: Nunito Sans;
  color: #172b4d;
  background: #ffffff;
  .ant-form-item-label {
    > label {
      font-weight: 600;
      font-size: 14px;
    }
  }
  .ant-collapse {
    border: 0;
    background: #ffffff;
    .ant-collapse-item {
      border: 0;
      margin-bottom: 30px;
    }
  }
  .ant-collapse-header {
    font-family: Nunito Sans;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    color: #0762f7 !important;
    background: #ffffff;
  }
  .ant-collapse-content > .ant-collapse-content-box {
    padding: 0;
    & > div {
      padding: 16px 0;
    }
  }
`;
