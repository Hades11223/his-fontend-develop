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
`;

export const PaginationStyle = styled.div`
  @media (max-width: 1366px) {
    .ant-pagination-item {
      min-width: 24px;
      a {
        font-size: 12px;
      }
    }

    .ant-pagination-prev {
      min-width: 24px;
    }

    .ant-pagination-next {
      min-width: 24px;
    }

    .select-size {
      font-size: 12px;
    }
  }
`;
