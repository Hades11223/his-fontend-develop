import styled from "styled-components";
import { Page } from "components";

export const MainPage = styled(Page)`
  padding: 16px;
  & .wrapper-header-container {
    & .top-level-category {
      padding: 0;
      & .home-breadcrumbs {
        height: auto;
      }
    }
  }
  & .main-page {
    padding: 0;
    & .header-page {
      display: none;
    }
    & .page-body {
      width: 100%;
      padding-bottom: 0;
    }
  }
`;

export const Main = styled.div`
  width: 100%;
  background: #f4f5f7;
  height: 100%;
  overflow: auto;
  overflow-x: hidden;
  display: flex;
  & .left-kham-benh {
    width: 450px;
    &.collapse {
      width: 258px;
      .search-collapse {
        display: block;
        .paddingRight {
          padding: 0;
        }
        .paddingLeft {
          padding: 0;
          padding-top: 16px;
        }
        .ant-col-md-12 {
          flex: 0 0 100%;
          max-width: 100%;
        }
      }

      .hanh-trinh-kham {
        display: none;
      }

      .info-price {
        .ant-col-xs-12 {
          flex: 0 0 100%;
          max-width: 100%;
        }
      }

      .history-title {
        .title-right {
          display: none;
        }
      }
      .main-step {
        justify-content: end;
        .ant-col:nth-child(1),
        .ant-col:nth-child(2),
        .ant-col:nth-child(3) {
          display: none;
        }
        .ant-col-xs-1:nth-child(4),
        .ant-col-xs-1:nth-child(5),
        .ant-col-xs-1:nth-child(6) {
          flex: 0 0 25px;
          max-width: 25px;
        }
      }
    }
  }
  & .right-kham-benh {
    flex: 1;
    overflow-x: hidden;
    & .wrapper-thong-tin-kham {
      .col-thong-tin-kham {
        &-left {
          flex: 1;
          overflow-x: hidden;
        }
        &-right {
          width: 280px;
        }
      }
    }
  }
  .paddingRight {
    padding-right: 16px;
  }
  .paddingLeft {
    padding-left: 16px;
  }
  .marginTop {
    margin-top: 16px;
  }
  & .home-child {
    overflow: auto !important;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .transition-4s {
    transition: all 0.2s;
  }
  .mt--2px {
    margin-top: -2px;
  }
  .icon-collapse-kb {
    font-size: 30px;
    width: 26px;
    height: 26px;
    svg {
      margin-top: -5px;
      margin-left: -8px;
    }
  }
`;
