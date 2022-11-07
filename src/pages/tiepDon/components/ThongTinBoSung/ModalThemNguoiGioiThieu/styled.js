import styled from "styled-components";

export const Main = styled.div`
  padding: 20px;
  & .ant-row {
    &:nth-child(2) {
      margin-top: 16px;
    }
    align-items: center;
  }
  & .label {
    font-family: "Nunito Sans";
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 18px;
  }
  & .bottom-action {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
  }
`;
