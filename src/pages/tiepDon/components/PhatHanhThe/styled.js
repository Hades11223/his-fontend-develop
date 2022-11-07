import { Modal } from "antd";
import styled from "styled-components";

export const ModalStyled = styled(Modal)`
  padding: 0;
  .ant-modal-content {
    background: #f4f5f7;
    box-shadow: 0px 0px 20px rgba(9, 30, 66, 0.2);
    border-radius: 16px;
    font-family: Nunito Sans, sans-serif;
    .ant-modal-body {
      padding: 0;
    }
    overflow: hidden;
  }
`;

export const Main = styled.div`
  padding: 2rem;
  /* margin: 2rem; */
`;
