import styled from "styled-components";
import { titleColor, textColor } from "../common/variables";

export const MainWrapper = styled("div")`
  overflow: auto;
  text-align: center;
  .top {
    padding: 60px 80px;
    .header {
      .title {
        margin: 0 30px 15px 30px;
        font-weight: 800;
        font-size: 40px;
        line-height: 55px;
        text-align: center;
        letter-spacing: 0.01em;
        text-transform: uppercase;
        color: ${titleColor};
      }
      .sub-header {
        color: #7a869a;
      }
    }
  }
  .content {
    color: ${textColor};
    .list {
      margin: 35px 180px;
      text-align: left;
      font-size: 32px;
      font-weight: normal;
      li::before {
        content: "• ";
        color: #172b4d;
      }
    }
  }
  .btn-action {
    margin: 200px 100px;
    display: flex;
    justify-content: space-between;
    span {
      font-weight: bold;
      text-align: center;
    }
  }
  @media (max-width: 765px) {
    .top {
      padding: 10px;
      .header {
        .title {
          margin: 0px;
          font-weight: 800;
          font-size: 16px;
        }
        .sub-header {
          color: #7a869a;
          font-size: 16px;
        }
      }
    }
    .content {
      .title {
        font-size: 16px;
      }
      color: ${textColor};
      .list {
        margin: 10px;
        font-size: 14px;
      }
    }
    .btn-action {
      display: block;
      margin: 20px 10px;
      span {
        font-weight: bold;
        text-align: center;
      }
      .btn-sm {
        width: 100%;
        height: 60px;
        padding: 0px;
        margin-bottom: 20px;
      }
      .btn {
        width: 100%;
        height: 60px;
        padding: 0px;
      }
      img {
        width: 20px;
        height: 20px;
      }
      span {
        font-size: 14px;
      }
    }
  }
`;
