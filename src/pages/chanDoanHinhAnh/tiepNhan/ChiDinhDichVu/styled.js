import styled from "styled-components";
import { Collapse } from "antd";

export const CollapseWrapper = styled(Collapse)`
  min-height: calc(100vh - 210px);
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
      flex: 1;
      span {
        font-weight: bold;
      }
    }
    &__right {
      flex: 1;
      span {
        font-weight: bold;
      }
    }
  }
  
  .select-box {
    padding-left : 10px;
    display : flex;
    align-items : center;
    &_select {
      width: 196px !important;
    }
    .addition-box {
      display: flex;
      align-items: center;
      padding: 0 5px;
      margin: 3px 0;
      min-height: 33px;
      .input-box {
        width: 170px;
        border: 1px solid #d9d9d9;
        border-radius: 17px;
        position: relative;
        height: 34px;
          > img {
            position: absolute;
            top: 29%;
            left: 0;
            z-index: 1;
            padding: 0 8px;
          }
          input {
            border: none;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border-radius: 17px;
            padding-left: 24px;
            /* font-weight: 600; */
            color: #172b4d;
            font-size: 14px;
            &::placeholder {
              color: #d9d9d9;
            }
            &:placeholder-shown {
              /* font-weight: 600;
              font-size: 14px; */
              color: #7a869a;
            }
          }
          @media (max-width: 1400px) {
            width: unset;
          }
        }
      }
    }
`;
