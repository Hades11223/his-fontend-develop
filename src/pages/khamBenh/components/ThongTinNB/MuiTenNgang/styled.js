import { Row } from "antd";
import styled from "styled-components";

export const Main = styled.div`
  display: flex;
  height: 7px;
  width: ${(props) => props.width || 0}px;
  position: absolute;
  z-index: 1;
  top: 10px;
  &.arrow-left {
    transform: rotate(180deg);
    left: ${(props) => -(props.width || 0)}px;
  }
  &.arrow-right {
    left: ${(props) => props.elementWidth || 0}px;
  }
  &.arrow-up {
    transform: rotate(90deg);
    left: 50%;
  }
  &.arrow-down {
    transform: rotate(270deg);
    left: 50%;
  }

  & svg {
    width: 7px;
    height: 7px;
  }
  & div {
    height: 1px !important;
    margin-top: 3px;
    flex: 1;
    border-top: 1px dashed blue;
  }
`;
