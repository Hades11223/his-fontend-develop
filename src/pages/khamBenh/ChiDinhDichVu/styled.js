import styled, { createGlobalStyle } from "styled-components";

export const StickyWrapper = styled.div`
  position: sticky;
  background-color: #fff;
  z-index: 2;
  top: 0;
  width: 100%;
  .info {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    font-size: 14px;
    line-height: 19px;
    &__left {
      flex: 1;
      span {
        font-weight: bold;
      }
    }
    &__right {
      flex: 1;
      span {
        font-weight: bold;
      }

      .person {
        display: flex;
        margin-bottom: 10px;
        font-style: normal;
        font-size: 13px;
        line-height: 17.73px;
        color: #172b4d;
        .title {
          width: 72px;
          font-weight: normal;
        }
        .detail {
          font-weight: bold;
          width: calc(100% - 72px);
        }
        .title.small {
          width: 150px;
        }
        .detail.small {
          font-weight: bold;
          width: calc(100% - 150px);
        }
        @media (max-width: 1599px) {
          .title.small,
          .title.last {
            width: 150px;
          }
          .detail.small,
          .detail.last {
            width: calc(100% - 150px);
          }
          .title.address {
            width: 150px;
          }
          .detail.address {
            width: calc(100% - 150px);
          }
        }

        .select-goidv {
          display: flex;
          justify-content: flex-start;
          align-items: center;

          .ant-select {
            flex: 100%;
          }

          .icon {
            flex: 25px;
          }
        }
      }
    }
  }

  .select-box {
    padding-left: 10px;
    display: flex;
    align-items: center;
    &_select {
      width: 196px !important;
    }
    .addition-box {
      display: flex;
      align-items: center;
      padding: 0 5px;
      margin: 3px 0;
      min-height: 33px;
      .input-box {
        width: 170px;
        border: 1px solid #d9d9d9;
        border-radius: 17px;
        position: relative;
        > img {
          position: absolute;
          top: 29%;
          left: 0;
          z-index: 1;
          padding: 0 8px;
        }
        input {
          border: none;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 17px;
          padding-left: 24px;
          /* font-weight: 600; */
          color: #172b4d;
          font-size: 14px;
          &::placeholder {
            color: #d9d9d9;
          }
          &:placeholder-shown {
            /* font-weight: 600;
              font-size: 14px; */
            color: #7a869a;
          }
        }
        @media (max-width: 1400px) {
          width: unset;
        }
      }
    }
  }
`;

export const DropdownStyle = createGlobalStyle`
  & .kham-benh-select-goi-dv {
    &.ant-select-dropdown {
      min-width: 250px !important;
      width: 250px !important;
    }
  }
`;

export const AddButtonStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 8px;
`;
