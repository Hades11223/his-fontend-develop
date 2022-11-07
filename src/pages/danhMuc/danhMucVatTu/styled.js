import styled from "styled-components";

export const Main = styled.div`
  height: 100%;
  & .main-info {
    background: linear-gradient(
        0deg,
        rgba(23, 43, 77, 0.1),
        rgba(23, 43, 77, 0.1)
      ),
      #ffffff;
    border-radius: 20px 0px 0px 0px;
    width: 100%;
    & .title-info {
      padding: 5px 30px;
      color: #172b4d;
      font-style: normal;
      font-weight: bold;
      font-size: 18px;
      & .right-info {
        float: right;
        color: #0762f7;
        font-style: normal;
        font-weight: bold;
        font-size: 14px;
        line-height: 24px;
        background: transparent;
        border: none;
        cursor: pointer;
      }
    }
    & .table-info {
      border-radius: 20px 0px 0px 0px;
      border-top: 2px solid #3984ff;
      overflow: auto;
      padding-top: 2px;

      & .main-table-wrapper {
        width: 100%;
        margin-bottom: 0;
        padding: 0;
        font-weight: 600;
        color: #172b4d;
        & .home-table-warrper {
          margin: 0;
        }
      }
    }
  }
`;
