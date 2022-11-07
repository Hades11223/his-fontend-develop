import styled, { createGlobalStyle } from "styled-components";
import { Popover } from "antd";

export const GlobalStyles = createGlobalStyle`
  .wide {
    width: 650px;
    & .ant-popover-arrow{
    display: none;
    }
    & .ant-popover-inner{
      border-radius: 10px;
    }
  }
`;
export const PopoverWrapper = styled(Popover)``;
export const Main = styled.div`
  .dd-flex {
    display: flex;
  }
  .fd-col {
    flex-direction: column;
  }
  .fd-row {
    flex-direction: row;
  }
  .text {
    color: #172b4d;
    font-size: 1rem;
  }
  .text-bold {
    font-weight: bold;
    font-size: 1.1rem;
  }
  .space-between {
    justify-content: space-between;
  }
  ._col {
    flex: 1;
  }
  ._row {
    margin-bottom: 5px;
    > span {
      font-weight: 600;
    }
  }
`;
