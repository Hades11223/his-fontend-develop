import { Modal } from "antd";
import styled from "styled-components";

const Main = styled(Modal)`
  & .ant-select {
    width: 100%;
  }
  & .status {
    margin-top: 10px;
    margin-bottom: 30px;
    display: flex;
    & .label {
      font-weight: bold;
      margin-right: 10px;
    }
  }
  & .item-label {
    display: flex;
    justify-content: center;
    align-items: center;
    & .f1 {
      flex: 1;
    }
    & button {
      margin-left: 5px;
    }
    padding-bottom: 5px;
    border-bottom: 1px solid #00000010;
    margin-top: 5px;
  }
`;
export { Main };
