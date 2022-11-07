import { BasicBox, Pagination } from "components";
import styled, { createGlobalStyle } from "styled-components";
export const Main = styled(BasicBox)`
  & svg.ic-action {
    width: 20px;
    height: 20px;
    cursor: pointer;
    margin-left: 5px;
    & path {
      fill: #ffffff;
    }
  }
  & .pagination {
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
  }
`;

export const GlobalStyle = createGlobalStyle`
& .cdha-option-popover {
  .ant-popover-inner {
    border-radius: 8px 0px 8px 8px;
}
 .ant-checkbox-group {
        width: 130px;
 }

}
`;
