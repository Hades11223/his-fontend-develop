import { Modal as MD } from "antd";
import { button } from "components/mixin";
import styled from "styled-components";
export const Modal = styled(MD)`
  .ant-modal-content {
    height: 100%;
    @media screen and (max-width: 1366px) {
        margin-top: -95px;
      }
    .ant-modal-body {
      padding: 10px;
    }
    overflow: hidden;
  }
  .ant-modal-header{
    padding: 10px;
  }
  .title-header{
    display: flex;
    justify-content: center;
    font-size: 18px;
    font-weight: 700;
  }
`;
