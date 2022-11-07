import styled from "styled-components";
import { Card } from "components";

export const Main = styled(Card)`
  display: flex;
  flex-direction: column;
  & .header {
    align-items: center;
    height: 44px;
    border-bottom: 1px solid #d9dbe9 !important;
    display: flex;
    .title {
      width: 50%;
      font-size: 16px;
      line-height: 24px;
      font-weight: 700;
      color: #172b4d;
    }
    .mode {
      width: 50%;
      display: flex;
      align-items: center;
      height: 100%;
      justify-content: flex-end;
      .ant-select {
        width: 50%;
        color: #0762f7;
        .ant-select-selector {
          border: none;
          &:hover,
          &:active,
          &:focus {
            border: none;
          }
        }
        .ant-select-arrow {
          color: #0762f7;
        }
      }
      .ant-select-focused {
        border: none;
      }
    }
  }
  & .container {
    flex: 1;
    overflow: hidden;
  }
`;
