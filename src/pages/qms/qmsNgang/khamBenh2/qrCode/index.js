import React, { memo, useRef } from "react";
import { Wrapper } from "./styled";
import { Button, Input } from "antd";
import { HOST } from "client/request";
import { useSelector } from "react-redux";

let intervalIput = null;

function QRCode(props) {
  const application = useSelector((state) => state.application);

  const { onChangeQr, inputValue } = props;
  const { qrRef } = props;
  const elementForcusActiveKeybroad = useRef(null);

  const sendMessage = (value) => {
    let count = 1;
    return intervalIput = setInterval(() => {
      if (count > value) {
        return clearInterval(intervalIput)
      } else {
        elementForcusActiveKeybroad.current && elementForcusActiveKeybroad.current.focus();
        count++
      }
    }, 650)
  };

  const autoFocusInput = () => {
    return intervalIput && clearInterval(intervalIput);
  }

  return (
    <Wrapper>
      <div className="qr-box__content">
        <span>
        Bản quyền thuộc về
        </span>
        <img src={`${HOST}/api/his/v1/files/${application.logoThuongHieu}`} alt="..."/>
      </div>
    </Wrapper>
  );
}

export default memo(QRCode);