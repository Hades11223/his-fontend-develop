import styled from "styled-components";
export const Main = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 0 14px;
  height: 132px;
  & .item-line {
    display: flex;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 115%;
    margin-bottom: 8px;

    & .line-label {
      width: 150px;
      text-align: right;
      &.pointer {
        cursor: pointer;
      }
      &.chiet-khau {
        color: #0762f7;
      }
    }
    & .line-value {
      text-align: right;
      width: 145px;
      margin-left: 20px;
    }
  }
`;
