import { Modal } from "antd";
import styled from "styled-components";

const ModalMain = styled(Modal)`
  & .ant-select {
    width: 100%;
  }
`;
const Main = styled("div")`
  min-height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export { Main, ModalMain };
