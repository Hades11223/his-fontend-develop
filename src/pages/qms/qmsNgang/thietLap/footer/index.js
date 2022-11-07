import React, { memo, useRef } from "react";
import { Wrapper } from "./styled";
import { Button, Input } from "antd";
import IcTimer from "assets/images/qms/IcTimer.png";
import LogoIsofh from "assets/images/qms/logoIsofh.png";



const Footer = (props) => {
  return (
    <Wrapper>
      <div className="content">
        <div className="left"><img src={IcTimer} alt="..." />
          <span>
            08:00 - Thứ ba ngày 20/12/2021
          </span></div>

        <div className="right">
        <img src={LogoIsofh} alt="..." />
        </div>
      </div>
    </Wrapper>
  );
}

export default Footer;