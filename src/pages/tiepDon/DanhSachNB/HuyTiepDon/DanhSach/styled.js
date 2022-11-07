import styled from "styled-components";
import { Card } from "components";

export const Main = styled(Card)`
  height: 100%;
  display: flex;
  margin-top: 20px;
  flex-direction: column;
  .main__container {
    margin: 0px;
  }

  .row-actived {
    background: #c1f0db !important;
  }
  .header {
    padding: 13px 16px;
    flex-flow: initial;
    align-items: center;
    color: #ffffff;
    &__left {
      font-family: Nunito Sans;
      font-style: normal;
      font-weight: bold;
      font-size: 18px;
      line-height: 24px;
      text-align: center;

      img {
        padding-left: 10px;
      }
      .btn-show {
        background: linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.5),
            rgba(0, 0, 0, 0.5)
          ),
          #0762f7;
        border: 0px;
      }
    }
    &__right {
      margin-left: 10px;
      .btn_new {
        background: #049254;
        width: 139px;
        height: 36px;
      }
      button {
        height: auto;
        margin: 0 8px;
        border-radius: 8px;
        border: 1px solid #049254;
        box-shadow: 0px 3px 0px #03317c;
        font-weight: 600;
        font-size: 16px;
        color: #ffffff;
      }

      img {
        padding: 0px 0px 3px 10px;
      }
    }
  }
`;

export const ContentTable = styled.div`
  /* overflow: hidden; */
  background: #ffffff;
  border-radius: 16px;

  .ant-table-body {
    height: 100% !important;
    .icon {
      display: flex;
      justify-content: center;
      img {
        margin-left: 10px;
      }
    }
  }
`;
