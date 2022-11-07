import styled from "styled-components";

export const Main = styled.div`
  padding: 10px;
  background-color: #ffffff;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  margin-top: 10px;
  border-radius: 6px;
  min-width: 320px;
  & .dich-vu-kcb {
    & > h1 {
      padding: 12px 2px;
      font-weight: 700;
      font-size: 16px;
      line-height: 19px;
      border-bottom: 1px solid rgba(34, 54, 69, 0.1);
    }
    &-group {
      display: flex;
      flex-direction: column;
      gap: 16px;
      & .total {
        width: 100%;
        display: flex;
        height: 24px;
        text-align: center;
        color: #ffffff;
        & .da-hoan-thanh {
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #f59e0b;
        }
        & .chua-hoan-thanh {
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #65a30d;
        }
      }
      & .label {
        font-weight: 700;
        font-size: 14px;
        line-height: 20px;
        color: #647589;
      }
    }
  }
`;
