import styled from "styled-components";
import { Modal, Button } from "antd";

export const ModalStyled = styled(Modal)`
  padding: 32px 30px;
  &.main_custom {
    padding: 0px;
  }
  .ant-modal-content {
    background: linear-gradient(
        0deg,
        rgba(23, 43, 77, 0.05),
        rgba(23, 43, 77, 0.05)
      ),
      #ffffff;
    box-shadow: 0px 0px 15px rgba(9, 30, 66, 0.07);
    border-radius: 16px;
    @media screen and (max-width: 1368px) {
      margin-top: -95px;
    }
    .ant-modal-body {
      padding: 0;
    }
    overflow: hidden;
  }
  .ant-modal-close-x {
    width: 40px;
    line-height: 45px;
  }
  .ant-modal-footer {
    padding: 0 !important;
    border-top: none !important;
  }
  .modal-header {
    .header-right {
      margin-right: 20px;
    }
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 9px 30px;
  font-family: Nunito Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  color: #172b4d;
  text-align: center;
  .font-color {
    color: #7a869a;
  }
  .normal-weight {
    color: #7a869a;
    font-weight: normal;
  }
`;

export const SubModalHeader = styled.div`
  text-align: center;
  font-style: normal;
  font-size: 14px;
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 50px 30px 30px;
  font-family: Nunito Sans;
  background: #ffffff;
`;

export const ModalContent = styled.div`
  background: #ffffff;
  border-radius: 16px 0px 0px 0px;
  padding: 20px 30px;
`;

export const ButtonBack = styled(Button)`
  height: 36px;
  color: #172b4d;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  background: #ffffff;
  mix-blend-mode: normal;
  border: ${(props) =>
    props.borderButtonBack ? props.borderButtonBack : "1px solid #0762f7"};
  border-radius: 8px;
  height: auto;
  &:hover,
  &:active,
  &:focus {
    background: #ffffff;
    color: #172b4d;
  }
  .btn-checkout {
    &__text {
      vertical-align: text-bottom;
    }
    &__icon {
      margin-left: 5px;
    }
  }
`;

export const ButtonNext = styled(Button).attrs((props) => ({
  disabled: props.disabled ? true : false,
}))`
  height: 36px;
  background: #0762f7;
  mix-blend-mode: normal;
  font-weight: 600;
  font-size: 16px;
  border-radius: 8px;
  border: 0;
  color: #ffffff;
  &:hover,
  &:active,
  &:focus {
    background: #2679ff;
    color: #ffffff;
  }
  .btn-checkout {
    display: flex;
    align-items: center;
    &__text {
      vertical-align: text-bottom;
    }
    &__icon {
      margin-left: 5px;
    }
  }
`;
