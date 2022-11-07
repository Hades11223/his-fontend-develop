import styled from "styled-components";
import { Input, InputNumber } from "antd"
export const Main = styled.div`
  width: 100%;
  /* border-radius: 5px; */
  height: 100%;
  display: flex;
  background-color: #f8f9f9;
  border-top: 1px solid #f0f0f0;
  /* padding: 5px 10px; */
`;
export const ContentTable = styled.div`
  overflow: hidden;
  background: #ffffff;
  /* border-radius: 16px; */
  width: 100%;
  height: calc(100%-10px);
  .ant-table-cell {
    /* border: 0px; */
    /* border: 1px solid #8080803b; */
    background : white;
  }
  .ant-table-tbody > tr > td {
    border-bottom: 1px solid #f0f0f0;
  }
  .main__container {
    margin-top: 0 !important;
  }
  .ant-table-body {
    /* height: 100% !important; */
    /* max-height: unset !important; */
  }
  .ant-table-thead {
    .custome-header {
      .title-box {
        padding: 0 !important;
        min-height: 40px;
      }
    }
  }
`;
export const InputCustom = styled(Input)`
    border: 0px !important;
    border-bottom: 1px solid #00000036 !important;
    border-radius: 0 !important;
    text-align: center;
    &:focus{
      outline: none !important;
      box-shadow: unset !important;
    }
    .ant-input-disabled {
      background: white !important;
      background-color: white !important;
    }
    &:disabled{
      background: white !important;
      background-color: white !important;
    }
`;
export const InputNumberCustom = styled(InputNumber)`
    border: 0px !important;
    border-bottom: 1px solid #00000036 !important;
    border-radius: 0 !important;
    text-align: center;
    &:focus{
      outline: none !important;
      box-shadow: unset !important;
    }
    .ant-input-disabled {
      background: white !important;
      background-color: white !important;
    }
    &:disabled{
      background: white !important;
      background-color: white !important;
    }
`;
