import styled from "styled-components";
import { Modal as MD } from "antd";

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;

  .content-title {
    display: flex;
    align-items: center;
    width: 100%;
    .ant-select {
      width: 180px;
    }
    .text {
      font-weight: 700;
      font-size: 16px;
      line-height: 25px;
      color: #172b4d;
    }
    .input-box {
      position: relative;
      margin-left: 20px;
      > img {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 0;
        z-index: 1;
        padding: 0 8px;
        width: 30px;
      }
      input {
        padding-left: 25px;
        border: 1px solid #4f4f4f;
        border-radius: 17px;
      }
    }
    .setting {
      margin-left: auto;
      img {
        cursor: pointer;
      }
    }
    .checkbox {
      margin-left: auto;
    }
    margin-bottom: 10px;
  }
  .footer-btn {
    display: flex;
    padding: 5px;
    justify-content: right;
  }
`;
