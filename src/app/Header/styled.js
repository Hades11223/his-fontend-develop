import styled, { createGlobalStyle, css } from "styled-components";
export const GlobalStyle = createGlobalStyle`
& .popover-header{

& .ant-popover-inner{
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px !important;
  border-radius: 8px !important;
}
& .ant-popover-inner-content{
  padding: 0px !important;
}
& .item-action{
  padding: 5px 17px;
  display: flex;
  align-items:center;
  .ml--5px{
    margin-left: -5px;
  }
  & svg{
    margin-right: 5px ;
    height: 20px;
    width: 20px;
  }
  & img{
    margin-right: 5px;
    width: 15px;
    height: 15px;
    object-fit: contain;
  }
  &.help{
    .span{
      font-family: Nunito Sans;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 19px;
      letter-spacing: 0px;
      text-align: center;
    }
  }
  :hover{
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0.75)), #0762F7 ;
  }
  .icon-change-pass{
      svg{
        width: 20px;
      height: 20px;
      }

    }
  .icon-logout{
    width: 20px;
    height: 20px;
  }
}
}

`;

const Main = styled("div")`
  width: 100%;
  ${() =>
    process.env.REACT_APP_BACKGROUND_HEADER
      ? css`
          background: ${process.env.REACT_APP_BACKGROUND_HEADER};
        `
      : css`
          background: #0762f7;
        `}
  height: 42px;
  font-family: Nunito Sans, sans-serif;
  .container {
    padding: 0 18px;
    height: 100%;
    .header {
      height: 100%;
      &__left {
        display: flex;
        align-items: center;
        height: 100%;
        flex-grow: 1;
        .isofh {
          cursor: pointer;
          max-width: 100px;
          object-fit: contain;
          height: 32px;
        }
        .isofh-white {
          height: 30px;
          width: 30px;
          background: white;
          border-radius: 50%;
          cursor: pointer;
        }
        .name-hospital {
          padding: 0 20px 0 10px;
          font-weight: bold;
          font-size: 20px;
          line-height: 25px;
          color: #ffffff;
          position: relative;
          white-space: nowrap;
          &:after {
            background: linear-gradient(
                0deg,
                rgba(255, 255, 255, 0.5),
                rgba(255, 255, 255, 0.5)
              ),
              #0762f7;
            content: "";
            width: 1px;
            height: 24px;
            position: absolute;
            top: 0;
            right: 0;
          }
          @media (max-width: 1365.98px) {
            padding: 0 10px;
          }
          @media (min-width: 600px) and (max-width: 768px) {
            padding: 0 8px;
            font-size: 14px;
          }
        }
        .menu {
          width: 24px;
          height: 24px;
          margin: 0 36px;
          cursor: pointer;
          @media (min-width: 600px) and (max-width: 768px) {
            width: 16px;
            height: 16px;
            margin: 0 8px;
          }
        }
        .search {
          position: relative;
          display: flex;
          flex-grow: 1;
          &__input {
            background: #ffffff;
            border: 2px solid #e0e0e0;
            box-sizing: border-box;
            border-radius: 16px;
            padding-left: 32px;
          }
          img {
            position: absolute;
            z-index: 1;
            top: 8px;
            left: 9px;
          }
          .ant-select {
            flex-grow: 1;
            max-width: 360px;
            .ant-select-selector {
              background: #ffffff;
              border: 2px solid #dfe1e6;
              box-sizing: border-box;
              border-radius: 17px;
              flex: none;
              order: 3;
              flex-grow: 0;
              display: block;
              .ant-select-selection-search {
                right: 10px;
                input {
                  padding-left: 35px;
                  @media (max-width: 1365.98px) {
                    padding-left: 25px;
                  }
                }
              }
              .ant-select-selection-placeholder {
                padding-left: 35px;
                @media (max-width: 1365.98px) {
                  padding-left: 25px;
                  font-size: 12px;
                }
              }
              .ant-select-selection-item {
                padding-left: 35px;
                @media (max-width: 1365.98px) {
                  padding-left: 25px;
                }
              }
            }
            .ant-select-arrow {
              display: none;
            }
            @media (max-width: 992px) {
              width: 180px;
            }
          }
        }
      }
      &__right {
        display: flex;
        align-items: center;
        height: 100%;
        margin-left: auto;
        .header-icon {
          margin-left: 10px;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          &.badge-status {
            position: relative;
            @media (max-width: 1365.98px) {
              width: 24px;
              height: 24px;
              margin: 10px;
            }
            @media (min-width: 600px) and (max-width: 768px) {
              margin: 8px;
            }
          }
          img {
            height: 20px;
            width: 20px;
          }
          .avatar-img {
            cursor: "pointer";
            width: 32px;
            height: 32px;
            border-radius: 50%;
          }
          @media (max-width: 1365.98px) {
            margin-left: 10px;
          }
          @media (min-width: 600px) and (max-width: 768px) {
            margin-left: 8px;
          }
        }
        .help {
          padding: 0 12px 0 20px;
        }
        .username {
          font-weight: 600;
          font-size: 15px;
          line-height: 20px;
          color: #ffffff;
          padding: 0 10px;
          position: relative;
          margin-right: 10px;
          &:after {
            background: linear-gradient(
                0deg,
                rgba(255, 255, 255, 0.5),
                rgba(255, 255, 255, 0.5)
              ),
              #0762f7;
            content: "";
            width: 1px;
            height: 24px;
            position: absolute;
            top: 0;
            right: 0;
          }
          @media (max-width: 1365.98px) {
            display: none;
          }
        }
        .logo-isofh {
          img {
            width: 100%;
          }
          @media (min-width: 600px) and (max-width: 768px) {
            width: 50px;
          }
        }

        > img {
          border-radius: 50%;
          width: 32px;
          height: 32px;
        }
      }
    }
  }
`;
export { Main };
