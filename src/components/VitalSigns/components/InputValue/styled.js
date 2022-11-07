import styled from "styled-components";

const Main = styled("div")`
  z-index: 101;
  position: absolute;
  width: 100px;
  .card {
    background-color: #fff;
    background-clip: padding-box;
    border-radius: 4px;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
    padding: 10px;
    width: 250px;
    border-radius: 10px;
  }
  .input-value-header {
    margin-bottom: 5px;
    font-size: 16px;
    font-weight: bold;
  }
  .ant-input-number {
    width: 100% !important;
  }
  .action-bottom {
    display: flex;
    justify-content: flex-end;
    button {
      justify-content: center;
      align-items: center;
      width: 70px;
      height: 30px;
      margin-top: 10px;
      margin-left: 10px;
      color: #fff;
      text-align: center;
    }
  }
`
export { Main };
