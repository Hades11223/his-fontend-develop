import styled from "styled-components";

export const Main = styled.div`
  .ant-input-disabled{
    border: 2px solid rgba(23,43,77,0.1) !important;
    background: linear-gradient(0deg, rgba(23, 43, 77, 0.25), rgba(23, 43, 77, 0.25)), #FFFFFF !important; 
  }
  .ant-input-number-disabled{
    border: 2px solid rgba(23,43,77,0.1) !important;
    background: linear-gradient(0deg, rgba(23, 43, 77, 0.25), rgba(23, 43, 77, 0.25)), #FFFFFF !important; 
  }
  .button-bottom-modal {
    margin-left: auto;
    text-align: right;
    position: absolute;
    bottom: 0;
    right: 0;
    margin: 20px;
    .button-cancel {
      margin-right: 18px;
      background: #ffffff;
      width: 100px;
      border: 1px solid #7a869a;
      @media (max-width: 1366px) {
        margin-right: 0.5em;
      }
    }
    .button-cancel:hover {
      background: #7a869a;
      color: #fff;
    }
    .button-ok {
      background: #0762f7;
      color: white;
      width: 100px;
    }
    .button-ok:hover {
      background: #054ab9;
    }
    button {
      height: auto;
      padding: 5px 5px;
      border-radius: 8px;
      border: 1px solid #0762f7;
      /* box-shadow: 0px 3px 0px #03317c; */
      font-weight: 600;
      font-size: 16px;
      color: #172b4d;
      @media (max-width: 1366px) {
        font-size: 14px;
        padding: 4px 20px;
      }
    }
    .button-header {
      padding: 20px;
    }
  }
  .icon-custom {
    &-1 {
      right: 0;
      margin-right: 20px;
      position: absolute;
      svg {
        width : 30px;
        height : 30px
      }
    }
    &-2 {
      right: 0;
      margin-right: 40px;
      position: absolute;
      svg {
        width : 40px;
        height : 19px
      }
    }
  }
  .ant-select{
    width : 100% !important;
  }
`;
