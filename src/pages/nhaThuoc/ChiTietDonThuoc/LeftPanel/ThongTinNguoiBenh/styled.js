import styled from "styled-components";

export const Main = styled.div`
  &.info {
    display: flex;
    .avatar-header {
      width: 96px;
      margin-right: 15px;
      .order {
        border: 1px dashed #0762f7;
        box-sizing: border-box;
        width: 96px;
        margin: auto;
        height: 30px;
        text-align: center;
        line-height: 30px;
        font-style: normal;
        font-weight: 900;
        font-size: 16px;
        color: #0762f7;
      }
      .avatar {
        cursor: pointer;
        height: 96px;
        width: 96px;
        margin: auto;
        margin-top: 18px;
        position: relative;
        & .hangTheIcon {
          position: absolute;
          right: -10px;
          top: -10px;
          transform: rotateZ(30deg);
          & img {
            width: 30px;
            height: 30px;
            object-fit: contain;
          }
        }
        img {
          width: 96px;
          height: 96px;
          object-fit: cover;
          border-radius: 3px;
        }
      }
    }
    .body-info {
      width: 100%;
      .title-header {
        font-size: 16px;
        font-weight: 700;
      }
      .title {
        font-size: 14px;
        font-weight: bold;
        display: table-cell;
        vertical-align: middle;
      }
      .info-full {
        /* background: linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), #0762F7; */
        border-radius: 16px;
        /* padding: 11px 15px 10px;
                margin-top: 12px; */
        .ant-col {
          padding-left: 0px !important;
        }
        .info {
          padding-left: 15px;
          .person {
            display: flex;
            font-size: 14px;
            line-height: 25px;
            color: #172b4d;
            .title {
              width: 72px;
            }
            .detail {
              font-weight: bold;
              width: calc(100% - 72px);
            }
            .title.small {
              width: 125px;
            }
            .detail.small {
              font-weight: bold;
              width: calc(100% - 125px);
            }
            @media (max-width: 1599px) {
              .title.small,
              .title.last {
                width: 125px;
              }
              .detail.small,
              .detail.last {
                width: calc(100% - 125px);
              }
              .title.address {
                width: 72px;
              }
              .detail.address {
                width: calc(100% - 72px);
              }
            }
          }
        }
      }
    }
  }
`;

export const InputSearch = styled.div`
  background: #ffffff;
  border: 2px solid #dfe1e6;
  box-sizing: border-box;
  border-radius: 4px;
  display: flex;
  align-items: center;
  padding: 5px 8.5px;
  width: 459px;
  &:focus-within {
    border: 1px solid #0762f7 !important;
    box-shadow: 0 0 0 3px #0062ff47 !important;
    /* box-shadow: 0 0 0 2px rgb(24 144 255 / 20%); */
    /* border: 0; */
  }
  input {
    padding: 0 1em 0 8.5px !important;
    border: none;
    border-radius: 50px;
    font-weight: 600;
    font-size: 14px;
    line-height: 19px;
    color: #172b4d;
    &:hover {
      border: none !important;
      box-shadow: none !important;
    }
    &:focus {
      border: none !important;
      box-shadow: none !important;
    }
    &::placeholder {
      color: #7a869a;
    }
  }
  .icon-search {
    height: 15px;
  }
  .qr-search {
    height: 20px;
  }
`;
