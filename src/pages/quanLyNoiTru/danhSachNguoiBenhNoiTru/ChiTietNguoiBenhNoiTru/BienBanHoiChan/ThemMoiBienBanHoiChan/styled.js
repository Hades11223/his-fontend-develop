import { Page } from "components";
import styled  from "styled-components";

export const MainPage = styled(Page)`
  & .wrapper-header-container {
    & .top-level-category {
      padding: 0px 10px;
      & .home-breadcrumbs {
        height: 20px;
      }
    }
  }
  & .main-page {
    padding: 0px 16px;
    & .page-body {
      padding: 16px 1px;
    }
  }
`;
