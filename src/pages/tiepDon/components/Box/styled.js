import styled from "styled-components";

export const Main = styled("div")`
  @media (max-width: 1200px) {
    padding-right: 0;
  }
  background: #ffffff;
  /* shadow-khung */
  box-shadow: 0px 3px 5px rgb(9 30 66 / 20%), 0px 0px 1px rgb(9 30 66 / 31%);
  border-radius: 8px;
  /* overflow: hidden; */
  & .box-header {
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
      #0762f7;
    color: #fff;
    padding: 2px 10px;
    font-style: normal;
    font-weight: bold;
    display: flex;
    align-items: center;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    & .title-left {
      font-size: 15px;
      line-height: 24px;
    }

    & .title-right {
      font-size: 13px;
      line-height: 18px;
      color: white;
      flex: 1;
      text-align: right;
      span {
        font-weight: 900;
      }
    }
    @media (min-width: 1440px) and (max-width: 1920px) {
      height: 46px;
      & .title-left {
        font-size: 22px;
      }
      & .title-right {
        font-size: 18px;
      }
    }
  }
  & .box-content {
    padding: 10px;
    & .button-clear {
      cursor: pointer;
      width: 100%;
      font-weight: 600;
      margin-bottom: 10px;
      letter-spacing: 0.75px;
      text-align: center;
      margin-top: 4px !important;
      color: #0762f7;
      line-height: 19px;
      font-size: 14px;
      .icon {
        width: 12px;
        height: 7.5px;
        margin-left: 5px;
      }
    }
  }
`;
