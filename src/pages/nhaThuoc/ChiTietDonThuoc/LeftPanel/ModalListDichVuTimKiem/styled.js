import styled from "styled-components";
import { Modal, Button, Row, Input, Select, InputNumber } from "antd";
import bgCalendar from "assets/images/kho/calendar.png";
import TableWrapper from "components/TableWrapper";

export const Footer = styled(Row)`
  padding: 10px;
  background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.9),
      rgba(255, 255, 255, 0.9)
    ),
    #0762f7;
`;

export const InputCustom = styled(Input).attrs((props) => ({
  disabled: props.disabled ? true : false,
}))`
  text-align: "right";
  border-radius: 0px !important;
`;
export const InputCustomNumber = styled(InputNumber).attrs((props) => ({
  disabled: props.disabled ? true : false,
}))`
  text-align: "right";
  border-radius: 0px !important;
`;
export const SelectCustom = styled(Select)`
  border-radius: 0px !important;
  .ant-select-selector {
    border-radius: 0px !important;
  }
`;
export const RangePickerCustom = styled.div`
  background: white;
  .ant-picker {
    border: 0px;
    padding: 0px;
    .ant-picker-input {
      border: 1px solid #d9d9d9;
      .icon-suffix {
        width: 30px;
        height: 20px;
        background-image: url(${bgCalendar});
        background-repeat: no-repeat;
      }
    }
  }
  .title-1 {
    padding: 0px 10px;
  }
  .ant-picker-active-bar {
    opacity: 0 !important;
  }
`;
export const TableWrapperStyled = styled(TableWrapper)`
  .ant-spin-nested-loading {
    .ant-spin-container {
      .ant-table {
        border-radius: 0px !important;
        box-shadow: none !important;
        .title-box {
          justify-content: center;
        }
        .ant-table-cell {
          vertical-align: middle;
        }
      }
    }
  }
`;
