import React from "react";
import { message } from "antd";
import Ic from "assets/images/utils/x-white.png";
import styled, { createGlobalStyle } from "styled-components";
export const GlobalMessageStyle = createGlobalStyle`
 & .ant-message-custom-content{
    display: flex;
    align-items: center;
    position: relative;
    padding-left: 10px !important;
    width: calc(100% + 20px);
    margin-right: 20px;
    & > span 
    {
        display: flex;
        &.anticon
        {
            display: block;
        }
        & .close-message{
            position: absolute;
            top: 5px;
            right: 10px;
            & img{
                width: 10px;
                height: 10px;
            }
        }
    }
 }
`;
export const Main = styled("span")``;
export const configMessage = () => {
  if (!message.successbk) message.successbk = message.success;

  if (message.successbk) {
    message.success = (text, key, duration = 3, icon) => {
      let keyCustom = key || text;
      message.successbk({
        content: (
          <Main>
            {text}
            <span
              className="close-message"
              onClick={() => message.destroy(keyCustom)}
            >
              <img src={Ic} alt="" />
            </span>
          </Main>
        ),
        key: keyCustom,
        duration,
        icon,
      });
    };
  }

  if (!message.errorbk) message.errorbk = message.error;

  if (message.errorbk) {
    message.error = (text, key, duration = 3, icon) => {
      let keyCustom = key || text;
      message.errorbk({
        content: (
          <Main>
            {text}
            <span
              className="close-message"
              onClick={() => message.destroy(keyCustom)}
            >
              <img src={Ic} alt="" />
            </span>
          </Main>
        ),
        key: keyCustom,
        duration,
        icon,
      });
    };
  }

  if (!message.warningbk) message.warningbk = message.warning;

  if (message.warningbk) {
    message.warning = (text, key, duration = 3, icon) => {
      let keyCustom = key || text;
      message.warningbk({
        content: (
          <Main>
            {text}
            <span
              className="close-message"
              onClick={() => message.destroy(keyCustom)}
            >
              <img src={Ic} alt="" />
            </span>
          </Main>
        ),
        key: keyCustom,
        duration,
        icon,
      });
    };
  }
  if (!message.infobk) message.infobk = message.info;

  if (message.infobk) {
    message.info = (text, key, duration = 3, icon) => {
      let keyCustom = key || text;
      message.infobk({
        content: (
          <Main>
            {text}
            <span
              className="close-message"
              onClick={() => message.destroy(keyCustom)}
            >
              <img src={Ic} alt="" />
            </span>
          </Main>
        ),
        key: keyCustom,
        duration,
        icon,
      });
    };
  }
};
