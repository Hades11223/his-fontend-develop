import styled from "styled-components";

export const Main = styled.div`
  width: 100%;
  height: 184px;
  margin-top: 16px;
  .wrapped {
    &-1 {
      background-color: white;
      border-radius: 8px;
      .title {
        font-family: Nunito Sans;
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: 24px;
        letter-spacing: 0px;
        text-align: left;
        padding: 8px 16px 0px 8px;
      }
      .row-1 {
        padding: 16px 16px 8px 8px;
      }
    }
    &-2 {
      background-color: white;
      margin-top: 16px;
      border-radius: 8px;
      .title {
        font-family: Nunito Sans;
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: 24px;
        letter-spacing: 0px;
        text-align: left;
        padding: 8px 16px 0px 8px;
      }
      .row-2 {
        padding: 8px 16px 8px 8px;
      }
      .detail-button {
        color: #0762f7;
        img {
          padding-left: 5px;
        }
      }
    }
  }
  & .action-bottom {
    display: flex;
    justify-content: flex-end;
    margin-top: 16px;
  }
`;
