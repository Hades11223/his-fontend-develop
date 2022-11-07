import styled from "styled-components";
import { Button } from "antd";

export const ButtonMain = styled(Button)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 5px 8px 3px;
  border: 1px solid #7a869a;
  border-radius: 8px;
  height: ${(props) => props.height}px;
  margin: 2px;
  mix-blend-mode: normal;
  border-radius: 8px;
  box-shadow: 0px 3px 0px #7a869a;
  min-width: ${(props) =>
    (props.minwidth + "" || "").indexOf("%") >= 0
      ? props.minwidth
      : `${props.minwidth}px`};
  ${(props) => props.fitcontent && `width: 100%;`}
  cursor: pointer;
  transition: all 0.1s;
  transition: background 0s;
  transform: translateY(0);
  &:hover {
    background: linear-gradient(
        0deg,
        rgba(255, 255, 255, 0.9),
        rgba(255, 255, 255, 0.9)
      ),
      #0762f7;
  }
  &:active {
    background: #ffffff;
  }
  &:disabled {
    background: linear-gradient(
        0deg,
        rgba(23, 43, 77, 0.25),
        rgba(23, 43, 77, 0.25)
      ),
      #ffffff;
  }
  & svg {
    height: ${(props) =>
      props.iconheight ? props.iconheight + "px" : "20px"} !important;
    width: ${(props) =>
      props.iconheight ? props.iconheight + "px" : "20px"} !important;
    & path {
      fill: #7a869a;
    }
  }
  & .button-content {
    flex: 1;
    margin: 0 5px;
    color: #172b4d;
    font-family: Nunito Sans;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
  }
  &.primary {
    background: ${(props) => props.backgroundcolor || "#0762f7"};
    border: 1px solid ${(props) => props.backgroundcolor || "#0762f7"};
    box-shadow: 0px 3px 0px ${(props) => props.bordercolor || "#03317c"};
    & .button-content {
      color: #fff;
    }
    &:hover {
      background: linear-gradient(
          0deg,
          rgba(0, 0, 0, 0.25),
          rgba(0, 0, 0, 0.25)
        ),
        #0762f7;
    }
    &:active {
      background: ${(props) => props.backgroundcolor || "#0762f7"};
    }
    & svg {
      & path {
        fill: #fff;
      }
    }
    &.button-text {
      background: transparent !important;
      border: none !important;
      box-shadow: none !important;
      & .button-content {
        color: ${(props) => props.color || "#0762f7"};
      }
      & svg {
        & path {
          fill: ${(props) => props.color || "#0762f7"};
        }
      }
    }
  }
  &.success {
    background: ${(props) => props.backgroundcolor || "#049254"};
    border: 1px solid ${(props) => props.backgroundcolor || "#049254"};
    box-shadow: 0px 3px 0px ${(props) => props.bordercolor || "#026138"};

    &:hover {
      background: #026138;
    }
    &:active {
      background: ${(props) => props.backgroundcolor || "#049254"};
    }
    & .button-content {
      color: #fff;
    }
    & svg {
      & path {
        fill: #fff;
      }
    }
    &.button-text {
      background: transparent !important;
      border: none !important;
      box-shadow: none !important;
      & .button-content {
        color: ${(props) => props.color || "#049254"};
      }
      & svg {
        & path {
          fill: ${(props) => props.color || "#049254"};
        }
      }
    }
  }
  &.error {
    background: ${(props) => props.backgroundcolor || "#fc3b3a"} !important;
    border: 1px solid ${(props) => props.backgroundcolor || "#fc3b3a"} !important;
    box-shadow: 0px 3px 0px ${(props) => props.bordercolor || "#7e1d1d"};
    & .button-content {
      color: #fff;
    }
    & svg {
      & path {
        fill: #fff;
      }
    }
    &.button-text {
      background: transparent !important;
      border: none !important;
      box-shadow: none !important;
      & .button-content {
        color: ${(props) => props.color || "#fc3b3a"};
      }
      & svg {
        & path {
          fill: ${(props) => props.color || "#fc3b3a"};
        }
      }
    }
  }
  &.info {
    background: ${(props) =>
      props.backgroundcolor ||
      "linear-gradient( 0deg, rgba(255,255,255,0.9), rgba(255,255,255,0.9) ), #0762f7;"} !important;
    border: 1px solid
      ${(props) =>
        props.backgroundcolor ||
        "linear-gradient( 0deg, rgba(255,255,255,0.9), rgba(255,255,255,0.9) ), #0762f7;"};
    box-shadow: 0px 3px 0px ${(props) => props.bordercolor || "#03317c"};
    & .button-content {
      color: #172b4d;
    }
    & svg {
      & path {
        fill: #172b4d;
      }
    }
    &.button-text {
      background: transparent !important;
      border: none !important;
      box-shadow: none !important;
      & .button-content {
        color: ${(props) =>
          props.color ||
          "linear-gradient( 0deg, rgba(255,255,255,0.9), rgba(255,255,255,0.9) ), #0762f7;"};
      }

      & svg {
        & path {
          fill: ${(props) =>
            props.color ||
            "linear-gradient( 0deg, rgba(255,255,255,0.9), rgba(255,255,255,0.9) ), #0762f7;"};
        }
      }
    }
  }

  & img {
    max-height: ${(props) =>
      props.iconheight ? props.iconheight + "px" : "10px"};
  }
  &[disabled] {
    background-color: #7a869a;
  }

  &:active {
    transform: translateY(3px);
  }
`;
