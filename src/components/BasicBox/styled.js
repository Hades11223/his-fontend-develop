import styled from "styled-components";
export const Main = styled.div`
  background: #03317c;
  box-shadow: 0px 0px 15px rgba(9, 30, 66, 0.07);
  border-radius: 16px;
  font-family: Nunito Sans, sans-serif;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  & .header-box {
    min-height: 42px;
    padding: 5px 16px;
    flex-flow: initial;
    align-items: center;
    display: flex;
    align-items: center;

    &__left {
      font-weight: bold;
      font-size: 18px;
      color: #ffffff;
      display: flex;
      align-items: center;
    }
    &__right {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      font-weight: 600;
      font-size: 14px;
      color: #ffffff;
      margin-left: auto;
      text-align: right;
      flex-wrap: wrap;
    }
  }
  & .content-box {
    overflow: hidden;
    border-top: 2px solid #ef4066;
    background: #ffffff;
    border-radius: 16px 0px 0px 0px;
    flex: 1;
  }
`;
