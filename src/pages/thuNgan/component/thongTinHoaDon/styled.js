import styled, { createGlobalStyle } from "styled-components";
export const GlobalStyle = createGlobalStyle`
  & .ant-popover-inner{

    border-radius: 10px !important;
  }
  & .ant-popover-inner-content{
    padding: 0 !important;
  }
  & .select-print{
    margin: 0 !important;
    padding : 10px;
    :hover{
      background: linear-gradient(0deg,rgba(255,255,255,0.75),rgba(255,255,255,0.75)),#0762F7;
    }
  }
`;
export const Main = styled("div")`
  box-shadow: 0px 0px 15px rgba(9, 30, 66, 0.07);
  background: #fff;
  border-radius: 8px;
  padding: 10px 15px;
  height: ${(props) =>
    props.typeHoaDon == 3 ? "calc(100vh - 300px)" : "calc(100vh - 240px)"};
  .bold {
    font-weight: 700;
  }
  .patient {
    div {
      font-weight: 600;
    }
    .title {
      font-size: 18px;
      display: flex;
      justify-content: space-between;
      svg {
        width: 20px;
        height: 20px;
      }
    }
  }
  .form-thong-tin {
    margin-top: 20px;
  }
  .ant-form-item-label {
    label {
      font-weight: 700;
    }
  }
  .ant-form-item {
    margin-bottom: 5px !important;
  }
  .total-money {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    .lable {
      color: #03317c;
      font-size: 18px;
      font-weight: 500;
    }
    .money {
      color: #172b4d;
      font-weight: 700;
      font-size: 20px;
    }
    @media (max-width: 1367px) {
      margin-top: 10px;
    }
  }
  & .ant-checkbox {
    span {
      font-weight: 700;
    }
  }
  & .ant-form-item-required::before {
    display: none !important;
  }
  & .form-chi-tiet {
    div {
      font-weight: 600;
    }
  }
`;
