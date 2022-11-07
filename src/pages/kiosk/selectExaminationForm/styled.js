import styled from "styled-components";
import { titleColor, textColor, subtitleColor } from "../common/variables";

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
        color: ${subtitleColor};
      }
    }
    .desc {
      margin: 100px 30px 0 30px;
      font-weight: bold;
      font-size: 40px;
      line-height: 55px;
      text-align: center;
      letter-spacing: 0.01em;
      color: ${textColor};
    }
  }
  .middle {
    width:70%;
    img {
      padding: 0px 0px 0px 10px;
    }
    span {
      font-family: Nunito Sans;
      font-style: normal;
      font-weight: normal;
      font-size: 32px;
      line-height: 44px;
      color: #091E42;
      margin-bottom: 9px;
    }
    .title{ 
      padding-left: 20px;
    }
    
  }
  .btn-action {
    margin: 465px 80px 0 80px;
    display: flex;
    justify-content: center;
    .btn-md {
      margin: 10px;
      span {
        font-weight: bold;
        text-align: center;
      }
    }
  }
  .ant-checkbox-inner, .ant-checkbox-input {
    transform: scale(2);
  }
  .ant-checkbox-checked::after {
    display: none;
  }
  @media (max-width : 765px) {
    .middle {
      width:100%;
      .title{
        font-size : 14px;
      }
    }
    .ant-checkbox-inner, .ant-checkbox-input {
      transform: scale(1);
    }
    .top {
      padding:10px;
      .header {
        .title {
          margin: 0 30px 15px 30px;
          font-weight: 800;
          font-size: 14px;
        }
        .sub-header {
          color: ${subtitleColor};
          font-size:14px;
        }
    }
   
    .ant-checkbox-inner, .ant-checkbox-input {
      transform: scale(1)
    }
    .desc {
      margin:10px;
      font-weight: bold;
      font-size: 14px;
    }
  }
  .btn-action {
    margin:0px;
    margin-bottom: 200px;
    display: block;
    justify-content: center;
    .btn-md {
      margin: 10px;
      width:100%;
      height:50px;
      margin-bottom:20px;
      padding:30px;
      span {
        font-size:14px;
        font-weight: bold;
        text-align: center;
      }
      img{
        width:20px;
        height:30px;
      }
    }
`;
