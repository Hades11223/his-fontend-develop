import { Row } from "antd";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
 from { opacity: 0; }
 to {opacity: 1;}
`;

export const Main = styled.div`
  animation: ${fadeIn} 5s;
  display: flex;
  width: 7px;
  height: ${(props) =>
    `${props.height || 0}` + (props.direction != "up" ? "px" : "")};
  position: absolute;
  z-index: 1;
  flex-direction: column;
  top: ${(props) =>
    props.direction == "top"
      ? -(props.height || 0) + "px"
      : props.direction == "up"
      ? "25px"
      : "100%"};
  left: 50%;

  & svg {
    width: 7px;
    height: 7px;
    transform: rotate(90deg);
  }
  & div {
    height: 1px !important;
    margin-left: 3px;
    flex: 1;
    border-left: 1px dashed blue;
  }
  &.result {
    /* height: auto; */
    top: 25px;
    /* bottom: -17px; */
    margin-left: -10px;
  }
`;
