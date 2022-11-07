import styled from "styled-components";

export const GroupTypePartient = styled.div`
  .ant-checkbox-group {
    .ant-checkbox-checked {
      .ant-checkbox-inner {
        background: #0762f7 !important;
      }
    }
    span.ant-checkbox + * {
      font-weight: 600;
      font-size: 14px;
      color: #fff;
    }
  }
  .TRANG_THAI_LAY_MAU_BN {
    width: 267px;
    display: block !important;
    .ant-checkbox-group-item:nth-child(1) {
      margin-bottom: 4px;
    }
  }
  .TRANG_THAI_HHSH_GPB {
    width: 363px;
    display: block !important;
    @media (max-width: 1600px) {
      width: 271px;
    }
    .ant-checkbox-group-item:nth-child(1) {
      margin-bottom: 4px;
    }
    @media (max-width: 1600px) {
      .ant-checkbox-group-item:nth-child(3) {
        margin-bottom: 4px;
      }
    }
  }
`;
