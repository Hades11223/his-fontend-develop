import styled from "styled-components";

export const Main = styled.div`
  margin: 30px auto;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    #0762f7;
  box-shadow: 0px 0px 15px rgba(9, 30, 66, 0.07);
  border-radius: 16px;
  font-family: Nunito Sans;
  .main__container {
    margin-top: 0 !important;
  }
  > .ant-row {
    background: #ffffff;
    border-radius: 16px 0px 0px 0px;
    border-top: 3px solid #ef4066;
    overflow: hidden;
  }
`;

export const TableTitle = styled.div`
  padding: 8px 16px;
  font-weight: bold;
  font-size: 18px;
  color: #ffffff;
`;
