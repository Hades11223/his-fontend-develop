import styled, { createGlobalStyle } from "styled-components";
import { Popover } from "antd";

export const GlobalStyle = createGlobalStyle`
.wide {
    width: 650px;
    & .ant-popover-arrow{
    display: none;
    }
    & .ant-popover-inner{
      border-radius: 10px;
    }
  }

  .ant-popover-inner {
    border-radius: 20px;
    color: #172b4d;
    width: 550px;
    font-weight: 510;
  }
`;
export const PopoverWrapper = styled(Popover)``;

export const Main = styled.div``;
