import styled from "styled-components";
import { InputNumber } from "antd";
export const Main = styled.div`
  .table-service {
    background: #049254;
    border-radius: 8px;
    height: 350px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .header-table {
      padding: 8px 17px 8px 20px;
      &__left {
        font-style: italic;
        font-weight: bold;
        font-size: 16px;
        line-height: 24px;
        color: #ffffff;
      }
    }
  }
`;
export const InputNumberCustom = styled(InputNumber)`
  input {
    text-align: right;
    padding-right: 22px;
  }
`;