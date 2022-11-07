import styled from "styled-components";
export const Main = styled("div")`
  background: #f4f5f7;
  min-height: calc(100vh - 60px);
  .header-title {
    .title {
      font-size: 25px;
      font-weight: 700;
      margin-bottom: 5px;
      display: flex;
      align-items: center;
      .anticon {
        margin-left: 10px;
      }
    }
  }
  .footer-button {
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
    & .btn-ok {
      color: #fff;
      padding: 20px 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #0762f7;
      border-radius: 8px;
      :hover {
        background: linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.25),
            rgba(0, 0, 0, 0.25)
          ),
          #0762f7;
      }
      svg {
        width: 20px;
        height: 20px;
      }
    }
    .btn-cancel {
      font-weight: 600;
      margin-right: 18px;
      background: #ffffff;
      width: 100px;
      border: 1px solid #7a869a;
      border-radius: 8px;
      padding: 20px 15px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .btn-cancel:hover {
      background: #7a869a;
      color: #fff;
    }
  }
`;
