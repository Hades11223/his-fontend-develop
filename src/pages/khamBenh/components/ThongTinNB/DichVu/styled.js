import { Row } from "antd";
import styled from "styled-components";

export const Main = styled.div`
  &.status1 {
    background: #fecece;
    color: #bd2c2b;
  }
  &.status2 {
    background: #ffe583;
    color: #7f6604;
  }
  &.status3 {
    background: #c1f0db;
    color: #049254;
  }
  white-space: nowrap;
  min-width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  & > svg {
    margin-right: 5px;
  }
  height: ${(props) => (props.isMainService ? "25px" : "auto")};
  align-items: center;
  padding: 0px 4px;
  border-radius: 3px;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  & .tooltip-item {
    display: flex;
  }
`;
