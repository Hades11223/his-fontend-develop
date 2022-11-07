import { Popover } from "antd";
import styled from "styled-components";
export const Main = styled.div`
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .wrapper-container {
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .info {
    display: inline-block;
    margin-left: 10px;
    padding: 8px 6px;
    border-radius: 8px;
    &--bold {
      font-weight: bold;
    }
  }
  .header-page {
    margin-top: -9px;
    justify-content: space-between;
    .title-category {
      flex: unset;
      padding-top: 3px;
      margin-bottom: 0;
    }
    .middle-search {
      width: 400px;
    }
  }
  .wrapper-header-container {
    .top-level-category {
      .home-breadcrumbs {
        height: 30px;
        margin: 0;
      }
    }
  }
  .main-page {
    .page-body {
      overflow: hidden;
      padding: 0;
      .group-search {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 50px;
        .base-search_component {
          margin-bottom: 0;
          .base-search-group-filter {
            padding: 0;
          }
        }
      }
    }
  }
`;

export const WrapperPopover = styled.div`
  margin: -12px -16px;
  .item-popover {
    padding: 5px 10px;
    cursor: pointer;
    :hover {
      background-color: #ccc;
    }
  }
`;
