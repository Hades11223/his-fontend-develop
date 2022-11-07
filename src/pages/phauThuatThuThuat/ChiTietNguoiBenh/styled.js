import styled from "styled-components";
import { Page } from "components";
export const Main = styled.div`
  background: #f4f5f7;
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
  .container {
    padding: 0 8px !important;
  }
  .icon-tab {
    margin-right: 10px;
  }
  .ant-row {
    width: 100%;
  }
  .header-left {
    background: linear-gradient(
        0deg,
        rgba(255, 255, 255, 0.95),
        rgba(255, 255, 255, 0.95)
      ),
      #0762f7;
    /* shadow-khung */

    box-shadow: 0px 0px 15px rgba(9, 30, 66, 0.07);
    border-radius: 8px;
  }
  .pb-5 {
    padding-bottom: 5px;
  }
  .title-content {
    /* margin: -10px; */
    margin-bottom: 10px;
    background-color: #e6effe;
    padding: 5px 10px 10px 10px;
    font-size: 16px;
    font-weight: bold;
  }
  .content {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
    margin-bottom: 5px;
    & .tab-main {
      overflow: hidden;
    }
    .ant-tabs-content-holder {
      .ant-tabs-content {
        .ant-tabs-tabpane {
          padding: 0 !important;
          .content-tab-custom {
            overflow-y: auto;
            height: calc(100% - 75px);
          }
        }
      }
    }
  }
  h1 {
    font-family: "Nunito Sans";
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
  }
  .ant-tabs-content {
    height: 100%;
    /* overflow-y: scroll; */
  }
  .ant-tabs-content-holder {
    border: 3px solid #cdddfe;
  }
  /* end style tabs */
  /* style content tab (right) */
  .action-bottom {
    display: flex;
    .button-left {
      display: flex;
    }
    .button-right {
      margin-left: auto;
      display: flex;

      .step-wrapper-in-options {
        margin-top: -15px;
        &.right {
          padding-left: 15px;
          .ant-space {
            gap: 0px !important;
          }
          &::after {
            top: 10px;
            left: 5px;
            content: "";
            position: absolute;
            width: 0;
            height: 0;
            border-bottom: 10px solid transparent;
            border-right: 10px solid white;
            border-top: 10px solid transparent;
            clear: both;
          }
          .ant-popover-arrow {
            display: none !important;
            .ant-popover-arrow-content {
            }
          }
          top: 10px !important;
          .ant-popover-inner-content {
            width: fit-content;
          }
        }
        .ant-popover-inner-content {
          padding: 0px;
          .ant-space-item {
            padding: 10px;
            margin: 0;
            &:hover {
              background: linear-gradient(
                  0deg,
                  rgba(255, 255, 255, 0.75),
                  rgba(255, 255, 255, 0.75)
                ),
                #0762f7;
            }
            white-space: nowrap;
          }
        }
      }
    }
  }
  .footer {
    display: flex;
    justify-content: end;
  }
  .ant-tabs > .ant-tabs-nav {
    .ant-tabs-extra-content {
      width: 100%;
      max-height: 30%;
      .content-tabs-extra {
        @media (max-width: 1369px) {
          width: 250px;
        }
        width: 100%;
        height: 100%;
        background-color: #e6effe;
        padding: 5px;
        .title-tabs-extra {
          font-weight: bold;
          padding-left: 10px;
          display: flex;
          justify-content: space-between;
          .icon-collapse-ds {
            font-size: 22px;
            transform: rotate(-90deg);
          }
        }
        .picker-range-date {
          max-width: 290px;
        }
        .wrapper-list-extra {
          padding: 3px 5px 8px 5px;
          height: calc(100% - 57px);
          overflow-y: scroll;

          .item-tabs-extra {
            border-radius: 8px;
            padding: 2px 8px;
            margin-top: 7px;
            background-color: white;
            font-weight: 500;
            box-shadow: 1px 1px 2px #999;
            max-width: 274px;
            cursor: pointer;
            .top-child {
              display: flex;
              justify-content: space-between;
              span:first-child {
                cursor: pointer;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                max-width: calc(100% - 25px);
              }
            }

            &.active-tabs-extra {
              background-color: #81c8a9;
              border: 1px solid;
            }
          }
        }
      }
    }
    .ant-tabs-nav-list {
      width: 300px;
      @media (max-width: 1369px) {
        width: 250px;
      }
      .ant-tabs-tab {
        height: auto;
        min-height: 40px;
      }
      .ant-tabs-tab-btn {
        white-space: pre-wrap;
        text-align: left;
        div {
          svg {
            margin-right: 8px;
          }
        }
      }
    }
  }
  .ant-tabs {
    &.tab-main {
      &.show-more {
        .ant-tabs-extra-content {
          height: 80%;
          max-height: 80%;
          .icon-collapse-ds {
            transform: rotate(90deg);
          }
        }
      }
    }
  }
  svg {
    &.ic-print {
      path {
        fill: #0762f7;
      }
    }
  }
`;

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
    .page-body {
      padding: 16px 2px;
      margin-top: -20px;
    }
  }
`;
