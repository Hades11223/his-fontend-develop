import styled from "styled-components";
import { Input, Popover, InputNumber } from "antd";
import { Card } from "components";
export const Main = styled(Card)`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  position: relative;
  width: 100%;
  .header {
    padding: 0 30px 0 30px;
    display: flex;
    align-items: center;
    width: 100%;
    height: 40px;
    padding-left: 16px;
    &-row {
      width: 100%;
      height: 100%;
      align-items: center;
      justify-content: space-between;
    }
    .content {
      font-style: normal;
      font-weight: bold;
      font-size: 18px;
      &-note {
        font-size: 14px;
        margin-left: 14px;
        height: 30px;
        color: white;
        span {
          font-weight: 900;
        }
      }
    }
  }
`;

export const PopoverCustom = styled(Popover)`
  .ant-popover-inner-content {
    width: 484px;
  }
`;
