import { Popover } from "antd";
import styled from "styled-components";
export const Main = styled.div`
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
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
