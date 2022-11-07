import styled from "styled-components";
export const Main = styled.div`
  & .row-box {
    background: #ffffff;
    border-radius: 4px;
    border: 1px solid #cacaca;
    padding: 12px;
    margin-bottom: 10px;
    & .ant-col {
      display: flex;
      align-items: center;
      &:first-of-type {
        padding-right: 10px;
      }
      & .row-label {
        font-family: "Nunito Sans";
        font-style: normal;
        font-weight: 600;
        font-size: 13px;
        line-height: 18px;
        margin-right: 5px;
        display: flex;
        align-items: center;

        /* /#172B4D (Màu chữ chính) */

        color: #172b4d;
        width: 100px;
      }
      & .ant-input,
      & .ant-input-number {
        flex: 1;
      }
      & .ant-input-number {
        text-align: right;
        & input {
          text-align: right;
          padding-right: 30px;
        }
      }
    }
  }
`;
