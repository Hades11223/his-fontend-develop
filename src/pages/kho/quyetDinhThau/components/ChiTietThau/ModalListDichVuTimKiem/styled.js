import styled from "styled-components";
import { Modal, Button, Row, Input, Select, InputNumber } from "antd";
import bgCalendar from "assets/images/kho/calendar.png";
import TableWrapper from "components/TableWrapper";

export const ModalStyled = styled(Modal)`
  padding: 0;
  .ant-modal-content {
    background: linear-gradient( 0deg, rgba(23,43,77,0.05), rgba(23,43,77,0.05) ), #ffffff;
    box-shadow: 0px 0px 20px rgba(9, 30, 66, 0.2);
    border-radius: 16px 16px 16px 16px;
    font-family: Nunito Sans, sans-serif;
    .ant-modal-body {
      padding: 0;
    }
    overflow: hidden;
  }
  & .action-group {
    display: flex;
    justify-content: center;
    & .btn-action {
      border: none;
      background-color: transparent;
      padding: 0;
      margin: 5px;
      outline: none;
      color: #0762F7;
      cursor: pointer;
    }
  }
  .addition-box{
    background: transparent !important;
    input{
      &:hover{
        border: none !important;
        outline: none !important;
        box-shadow: none !important;
      }
      &:focus{
        border: none !important;
        outline: none !important;
        box-shadow: none !important;
      }
    }
  }
  /* .ant-table-tbody .row-actived{
    background: #c1f0db !important;
  } */
`;
export const Main = styled.div`
  .main__container {
    margin: 0 !important;
  }
  .header-table {
    padding: 8px 17px 8px 30px;
    flex-flow: initial;
    align-items: center;
    &__left {
      white-space: nowrap;
      font-weight: bold;
      font-size: 18px;
    }
    &__right {
      margin-left: auto;
      img {
        cursor: pointer;
      }
    }
  }
  .ant-table-body {
    .ant-table-row:nth-child(2n){
      &.row-actived{
        background: #c1f0db !important;
      }
    }
    .ant-table-row {
      &.row-actived{
        background: #c1f0db !important;
      }
      &.active {
        .ant-table-cell {
          /* background: #c1f0db; */
        }
      }
    }
  }
`;
export const ContentTable = styled.div`
  overflow: hidden;
  /* border-top: 2px solid #ef4066; */
  background: #ffffff;
  border-radius: 16px 0px 0px 0px;
`;


export const Footer = styled(Row)`
  padding: 10px;
  background: linear-gradient( 0deg, rgba(255,255,255,0.9), rgba(255,255,255,0.9) ), #0762f7;
`;

export const ButtonBack = styled(Button)`
  height: 36px;
  color: #172b4d;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  background: #ffffff;
  mix-blend-mode: normal;
  border: ${props => (props.borderButtonBack ? props.borderButtonBack : "1px solid #0762f7")} ;
  box-shadow: 0px 3px 0px #03317c;
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
  box-shadow: 0px 3px 0px #03317c;
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
    &__text {
      vertical-align: text-bottom;
    }
    &__icon {
      margin-left: 5px;
    }
  }
`;

export const InputCustom = styled(Input).attrs((props) => ({
  disabled: props.disabled ? true : false,
}))`
  text-align: "right";
  border-radius : 0px !important;
`;
export const InputCustomNumber = styled(InputNumber).attrs((props) => ({
  disabled: props.disabled ? true : false,
}))`
  text-align: "right";
  border-radius : 0px !important;
`;
export const SelectCustom = styled(Select)`
    border-radius : 0px !important;
  .ant-select-selector{
    border-radius : 0px !important;
  }
`;
export const RangePickerCustom = styled.div`
  background: white;
  .ant-picker{
    border: 0px ;
    padding: 0px;
    .ant-picker-input{
      border: 1px solid #d9d9d9;
      .icon-suffix{
        width: 30px;
        height: 20px;
        background-image: url(${bgCalendar});
        background-repeat: no-repeat;
      }
    }
  }
  .title-1{
    padding: 0px 10px; 
  }
  .ant-picker-active-bar{
    opacity: 0 !important;
  }
`;
export const TableWrapperStyled = styled(TableWrapper)`
    .ant-spin-nested-loading{
      .ant-spin-container{
        .ant-table {
            border-radius: 0px !important;
            box-shadow: none !important;
            .title-box {
              justify-content: center
            }
            .ant-table-cell {
              vertical-align: middle;
            }
          }
      }
    }
  
`;