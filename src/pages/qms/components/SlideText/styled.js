import styled from "styled-components";

export const Wrapper = styled.div`
  white-space: nowrap;
  overflow: hidden;

  .animation {
    animation: ${(props) => props.nameAnimation} ${(props) => props.duration}s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-timing-function: linear;
  }

  @keyframes ${(props) => props.nameAnimation} {
    from {
      margin-left: 0px;
    }
    to {
      margin-left: -${(props) => props.spanWidth - props.wrapWidth}px;
    }
  }
`;
