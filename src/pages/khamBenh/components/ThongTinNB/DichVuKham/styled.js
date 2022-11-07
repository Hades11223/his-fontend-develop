import { Row } from "antd";
import styled from "styled-components";

export const Li = styled.li`
  & > .item {
    z-index: ${(props) => props.level};
    height: 25px;
    margin-top: ${(props) => 30 + (props.level - 1) * 8}px;
    margin-bottom: ${(props) => (props.totalLevel - props.level) * 8}px;
  }
`;
