import styled from "styled-components";
import { Collapse } from "antd";

export const CollapseWrapper = styled(Collapse)`
  width: 100%;
  .ant-collapse-content {
    border: none;
  }
  .ant-collapse-arrow {
    display: none !important;
  }
  > .ant-collapse-item {
    background: #ffffff;
  }
`;

export const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  .info {
    display: flex;
    align-items: center;
    justify-content: center;
    .collapse-arrow {
      transform: ${(props) => (props.isCollapsed ? "rotate(90deg)" : "unset")};
      transition: 0.3s;
    }
    &__name {
      text-transform: uppercase;
      font-weight: bold;
      font-size: 24px;
      line-height: 33px;
      margin: 0 2px 0 6px;
    }
    img {
      margin: 0 6px;
    }
  }
  .form-info {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    margin: 0 15px;
    .text {
      position: absolute;
      background: #ffffff;
      z-index: 1;
      left: 0;
      text-indent: initial;
    }
    &__left {
      width: 33.33%;
      position: relative;
    }
    &__center {
      width: 33.33%;
      text-align: center;
      position: relative;
      .form-id {
        color: #0762f7;
        font-size: 14px;
        line-height: 25px;
      }
    }
    &__right {
      position: relative;
      width: 33.33%;
    }
  }
  & svg.icon {
    width: 22px;
    height: 22px;
  }
`;
export const StickyWrapper = styled.div`
  position: sticky;
  background-color: #fff;
  z-index: 2;
  top: 0;
  width: 100%;
  .info {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    font-size: 14px;
    line-height: 19px;
    &__left {
      span {
        font-weight: bold;
      }
    }
    &__right {
      span {
        font-weight: bold;
      }
    }
  }
`;
