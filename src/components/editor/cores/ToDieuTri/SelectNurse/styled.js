import { Modal } from "antd";
import styled from "styled-components";

const ModalMain = styled(Modal)`
  & .ant-select {
    width: 100%;
  }
`;
const Main = styled("div")`
  cursor: pointer;
  flex: 1;
  min-height: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export { Main, ModalMain };
