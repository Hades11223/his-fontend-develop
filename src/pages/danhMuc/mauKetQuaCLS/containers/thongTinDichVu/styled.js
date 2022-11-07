import styled from "styled-components";
export const Main = styled.div`
  background-color: white;
  border-radius: 10px;
  height: 100%;
  .title {
    padding: 10px;
    /* border-bottom: 1px solid #d3d7de; */
    h3 {
      margin-bottom: 0;
      padding-left: 10px;
      font-weight: bold;
      font-size: 18px;
    }
  }
  .content {
    padding: 10px;
    .ant-form-item-label {
      text-align: left;
    }
    input {
      width: 90%;
      border-radius: 3px;
    }
    .group-input {
      border-radius: 5px;
      border: 1px solid #ddd;
      padding: 10px;
      height: 215px;
      overflow-y: scroll;
      margin-bottom: 20px;
    }

    .footer {
      display: flex;
      justify-content: flex-end;
      .left-btn {
        padding: 10px;
        border-radius: 8px;
        border-color: #7a869a;
        height: 40px;
      }
      .right-btn {
        display: flex;
        align-items: center;
        margin-left: 10px;
        padding: 10px;
        border-radius: 8px;
        height: 40px;
        background-color: #0762f7;
        color: white;
      }
    }
  }
`;
