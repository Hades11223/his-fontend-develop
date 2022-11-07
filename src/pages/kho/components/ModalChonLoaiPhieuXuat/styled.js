import styled from "styled-components";
export const Main = styled.div`
  padding: 22px 24px;
  padding-bottom: 5px;
  & .item {
    font-family: Nunito Sans;
    margin-bottom: 16px;
    min-height: 93px;
    cursor: pointer;
    background: #ffffff;
    border-radius: 7.02222px;
    border: 2px solid #0762f7;
    padding: 16px;
    display: flex;
    flex-direction: row;
    &:hover {
      background: #0062ff20;
    }
    & .item-icon {
      width: 32px;
      height: 40px;
    }
    & .item-content {
      flex: 1;
      margin-left: 15px;
      & .item-title {
        font-weight: 900;
        font-size: 14px;
        line-height: 19px;
      }
      & .item-description {
        font-size: 14px;
        line-height: 19px;
        display: flex;
        align-items: center;
      }
    }
  }
`;
