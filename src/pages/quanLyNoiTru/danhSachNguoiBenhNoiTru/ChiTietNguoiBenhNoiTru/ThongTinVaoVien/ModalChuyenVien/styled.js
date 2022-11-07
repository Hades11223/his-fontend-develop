import styled from "styled-components";
import { Button } from "antd";
export const Main = styled.div`
  padding: 20px;
`;
export const ModalFooter = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 50px 30px 30px;
  font-family: Nunito Sans;
  background: #ffffff;
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
