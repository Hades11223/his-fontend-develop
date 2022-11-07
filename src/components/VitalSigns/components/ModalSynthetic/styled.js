import { Modal } from "antd";
import styled from "styled-components";

export const Main = styled("div")`
  z-index: 1000;
  position: absolute;
  width: 550px;
  & .item {
    margin-top: 10px;
    label {
      font-weight: 700;
    }
    .date-picker {
      input {
        min-height: 32px;
      }
    }
  }
  .action-bottom {
    display: flex;
    justify-content: flex-end;
    button {
      justify-content: center;
      align-items: center;
      width: 70px;
      height: 30px;
      margin-top: 10px;
      margin-left: 10px;
      color: #fff;
      text-align: center;
    }
  }
  .card {
    background-color: #fff;
    background-clip: padding-box;
    border-radius: 4px;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
    padding: 10px;
    width: 500px;
    border-radius: 10px;
  }
`;
