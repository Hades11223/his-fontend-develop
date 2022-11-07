import styled from "styled-components";
import { Modal } from "antd";
export const ModalStyle = styled(Modal)`
  padding: 0;
  .ant-modal-content {
    box-shadow: 0px 0px 20px rgba(9, 30, 66, 0.2);
    border-radius: 16px;
    font-family: Nunito Sans, sans-serif;
    .ant-modal-body {
      padding: 0;
      min-height: 517.49px;
    }
    overflow: hidden;
  }
`;

export const Main = styled.div`
  .header {
    align-items: center;
    display: flex;
    padding: 10px 0px 0px 10px;
    span {
      font-family: Nunito Sans;
      font-style: normal;
      font-weight: bold;
      font-size: 16px;
      line-height: 24px;

      color: #172b4d;
    }
  }
  .ant-btn {
    padding: 0px;
  }
  .footer {
    padding-bottom: 20px;
    position: absolute;
    width: 100%;
    display: flex;
    justify-content: space-between;
    /* position: fixed; */
    bottom: 0px;
    right: 0px;
    .btn-back {
      mix-blend-mode: normal;
      /* #7A869A (Màu chữ phụ) */
      margin-left: 15px;
      border: 1px solid #7a869a;
      box-sizing: border-box;
      border-radius: 8px;
      width: 68px;
      height: 38px;
    }
    .btn-submit {
        background: #0762f7;
        box-shadow: 0px 3px 0px #03317c;
        border-radius: 8px;
        color: white;
        border: solid 1px #0762f7;
        margin-right: 15px;
        width: 68px;
        height: 38px;
    }
  }
`;
export const DivInfo = styled.div`
  max-width: ${(props) => `${props.maxWidth}px`};
  /* position: relative; */
  /* span:last-child {
    position: absolute;
    right: 0;
    top: 0;
  } */
  > div {
    display: inline-block;
  }
`;


export const SelectGroup = styled.div`
  line-height: 25px;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 6 6"><circle cx="3" cy="3" r="0.4" fill="black" /></svg>')
    20px;
  background-position-y: 12px;
  background-size: 5px 28px;
  margin-top: 10px;
  display: flex;
  width: 400px;
  > span {
    display: inline-block;
    padding-right: 5px;
    background: #ffffff;
    vertical-align: sub;
    flex: 1 0 auto;
    /* height: ${(props) => (props.dataHeight ? props.dataHeight + "px" : "auto")}; */
  }
  .select-box {
    display: inline-block;
    .ant-select-selector {
      margin-top: -13px;
      background: none;
      border: 0;
    }
  }
  .red-text {
    color: #ef4066;
  }
  .select-box-chan-doan {
        display: inline-block;
        width: 100%;
        & .ant-select .ant-select-multiple .ant-select-allow-clear .ant-select-show-search{
            width: auto
        }
        & .ant-select {
            width: 100%;
            &.ant-select-show-search {
                width: auto
            }
            & .ant-select-selector {
            margin-top: -13px;
            background: none;
            border: 0;
            & .ant-select-selection-overflow {
              width : 380px
            }
            }
        }
    }
`;
