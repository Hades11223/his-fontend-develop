import styled from "styled-components";
export const MainTitle = styled.div`
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  color: #172b4d;
`;
export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    margin-left: 10px;
  }
`;
export const Main = styled.div`
  font-family: Nunito Sans, sans-serif;
  padding: 10px;
  .group-tranfer {
    display: flex;
    padding: 10px 0 18px;
    align-items: center;
    .ant-radio-group {
      span {
        font-size: 14px;
        line-height: 19px;
        color: #14142b;
      }
    }
  }
`;
export const ContentTranfer = styled.div`
  margin-top: 4px;
  background: linear-gradient(
      0deg,
      rgba(23, 43, 77, 0.05),
      rgba(23, 43, 77, 0.05)
    ),
    #ffffff;
  box-shadow: 0px 0px 15px rgba(9, 30, 66, 0.07);
  border-radius: 16px;
  .title {
    font-weight: bold;
    font-size: 16px;
    line-height: 24px;
    color: #049254;
    padding: 8px 29px 0px;
    margin-bottom: -5px;
  }
  .custome-header .title-box {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
