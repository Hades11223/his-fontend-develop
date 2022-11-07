import styled from "styled-components";

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  /* margin-left: 16px; */
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    #0762f7;
  box-shadow: 0px 0px 15px rgba(9, 30, 66, 0.07);
  border-radius: 16px;
  overflow: hidden;
  .top-header {
    display: flex;
    height: 53px;
    justify-content: space-between;
    align-items: center;
    font-family: Nunito Sans;
    .btn-thanhToan {
      margin: 0 8px;
    }
    &__title {
      font-style: normal;
      font-weight: bold;
      font-size: 18px;
      margin-left: 30px;
      color: #ffffff;
    }
  }
  .content-box {
    flex: 1;
    border-top: 3px solid #ef4066;
    border-radius: 16px 0 0;
    padding: 16px;
    padding-right: 37px;
    background: #ffffff;
    font-family: Nunito Sans;
    .ant-collapse {
      background: #ffffff;
    }
    .ant-collapse-item {
      border-width: 0;
    }
    .ant-collapse-content > .ant-collapse-content-box {
      padding: 0;
    }
    .ant-collapse-header {
      display: flex;
      justify-content: space-between;
      position: relative;
      width: 100%;
      padding: 0px;
      .ant-collapse-arrow {
        order: 2;
        position: absolute;
        left: calc(100% + 9px);
        top: 6px;
        &--revert {
          top: 8px;
          transform: rotateX(180deg);
        }
      }
      .info-payment {
        width: 100%;
        padding: 3px 0;
        order: 1;
      }
    }
    & .ant-collapse-header-text {
      display: block;
      width: 100%;
    }
    .info-payment {
      display: flex;
      justify-content: space-between;
      padding: 7px 20px;
      border-bottom: 1px solid #d9dbe9;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      color: #14142b;
      &--pd0-header {
        border-bottom: 1px solid #172b4d;
      }
      &--pd0 {
        padding: 0;
        border-bottom: 1px solid #172b4d;
      }

      &--pdt {
        padding: 0;
        margin-top: 31px;
      }
      &__title {
        &--bs {
          font-weight: 800;
          font-size: 16px;
        }
        &--fixed {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 50%;
          font-weight: 800;
          font-size: 16px;
          background: #dfe1e5;
        }
      }
      &__price {
        &--bs {
          font-weight: bold;
          font-size: 16px;
        }
        &--fixed {
          font-weight: 800;
          font-size: 20px;
          color: #ef4066;
        }
        &--orange {
          font-weight: bold;
          font-size: 16px;
          color: #fc3b3a;
        }
        &--green {
          font-weight: bold;
          font-size: 16px;
          color: #049254;
        }
      }
      .maChuanChi {
        font-size: 12px;
      }
      &__voucher {
        color: #2db7f5;
        font-family: Nunito Sans;
        font-style: normal;
        font-weight: normal;
        font-size: 13px;
        line-height: 18px;
        border: 1px solid #2db7f5;
        box-sizing: border-box;
        padding: 1px;
        display: flex;
        .close {
          cursor: pointer;
          margin-left: auto;
          padding-left: 5px;
          color: #008cff;
        }
      }
    }
    .bottom-group {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
      .btn {
        display: flex;
        align-items: center;
        font-weight: 600;
        font-size: 16px;
        color: #172b4d;
        background: linear-gradient(
            0deg,
            rgba(255, 255, 255, 0.9),
            rgba(255, 255, 255, 0.9)
          ),
          #0762f7;
        mix-blend-mode: normal;
        box-shadow: 0px 3px 0px #03317c;
        border-radius: 8px;
        .btn-text {
          margin-right: 12px;
        }
      }
    }
  }
`;
